package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.AppointmentRequest;
import com.management.galle_hospital.Model.AppointmentStatus;
import com.management.galle_hospital.Model.Clinic;
import com.management.galle_hospital.Model.ClinicSession;
import com.management.galle_hospital.Model.Patient;
import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Payload.AppointmentRequestCreateRequest;
import com.management.galle_hospital.Payload.AppointmentRequestResponse;
import com.management.galle_hospital.Repository.AppointmentRequestRepository;
import com.management.galle_hospital.Repository.ClinicSessionRepository;
import com.management.galle_hospital.Repository.PatientRepository;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AppointmentRequestService {
    private final AppointmentRequestRepository appointmentRequestRepository;
    private final PatientRepository patientRepository;
    private final ClinicSessionRepository clinicSessionRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public ResponseEntity<?> createAppointmentRequest(AppointmentRequestCreateRequest request) {
        if (request.getPatientId() == null || request.getClinicSessionId() == null) {
            return error("patientId and clinicSessionId are required", HttpStatus.BAD_REQUEST);
        }

        Patient patient = patientRepository.findById(request.getPatientId()).orElse(null);
        if (patient == null) {
            return error("Patient not found", HttpStatus.NOT_FOUND);
        }

        ClinicSession clinicSession = clinicSessionRepository.findById(request.getClinicSessionId()).orElse(null);
        if (clinicSession == null) {
            return error("Clinic session not found", HttpStatus.NOT_FOUND);
        }

        Clinic clinic = clinicSession.getClinic();
        if (clinic == null || clinic.getNurse() == null) {
            return error("Clinic session does not have an assigned nurse", HttpStatus.BAD_REQUEST);
        }

        if (appointmentRequestRepository.existsByPatientIdAndClinicSessionIdAndStatus(
                patient.getId(), clinicSession.getId(), AppointmentStatus.PENDING)) {
            return error("Patient already has a pending request for this clinic session", HttpStatus.BAD_REQUEST);
        }
        if (appointmentRequestRepository.existsByPatientIdAndClinicSessionIdAndStatus(
                patient.getId(), clinicSession.getId(), AppointmentStatus.ACCEPTED)) {
            return error("Patient already has an accepted appointment for this clinic session", HttpStatus.BAD_REQUEST);
        }

        AppointmentRequest appointmentRequest = new AppointmentRequest();
        appointmentRequest.setPatient(patient);
        appointmentRequest.setClinicSession(clinicSession);
        appointmentRequest.setDescription(blankToNull(request.getDescription()) != null
                ? blankToNull(request.getDescription())
                : blankToNull(request.getReason()));
        appointmentRequest.setReason(blankToNull(request.getReason()));
        appointmentRequest.setStatus(AppointmentStatus.PENDING);
        appointmentRequest.setRequestedAt(LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AppointmentRequestResponse(appointmentRequestRepository.save(appointmentRequest)));
    }

    public List<AppointmentRequestResponse> getRequestsByPatient(Long patientId) {
        return appointmentRequestRepository.findByPatientIdOrderByRequestedAtDesc(patientId)
                .stream()
                .map(AppointmentRequestResponse::new)
                .toList();
    }

    public List<AppointmentRequestResponse> getAllRequests() {
        return appointmentRequestRepository.findAllByOrderByRequestedAtDesc()
                .stream()
                .map(AppointmentRequestResponse::new)
                .toList();
    }

    public ResponseEntity<?> getRequestsByNurse(Long nurseId, AppointmentStatus status) {
        ResponseEntity<Map<String, String>> nurseError = validateNurse(nurseId);
        if (nurseError != null) {
            return nurseError;
        }

        List<AppointmentRequest> requests = status == null
                ? appointmentRequestRepository.findByClinicSessionClinicNurseIdOrderByRequestedAtDesc(nurseId)
                : appointmentRequestRepository.findByClinicSessionClinicNurseIdAndStatusOrderByRequestedAtDesc(nurseId, status);

        return ResponseEntity.ok(requests.stream().map(AppointmentRequestResponse::new).toList());
    }

    public ResponseEntity<?> getAcceptedRequestsByDoctor(Long doctorId) {
        ResponseEntity<Map<String, String>> doctorError = validateDoctor(doctorId);
        if (doctorError != null) {
            return doctorError;
        }

        List<AppointmentRequest> requests =
                appointmentRequestRepository.findByClinicSessionClinicDoctorsIdAndStatusOrderByAcceptedAtDesc(
                        doctorId,
                        AppointmentStatus.ACCEPTED
                );

        return ResponseEntity.ok(requests.stream().map(AppointmentRequestResponse::new).toList());
    }

    public ResponseEntity<?> acceptRequest(Long requestId, Long nurseId) {
        ResponseEntity<Map<String, String>> nurseError = validateNurse(nurseId);
        if (nurseError != null) {
            return nurseError;
        }

        return appointmentRequestRepository.findById(requestId)
                .<ResponseEntity<?>>map(request -> {
                    if (!isAssignedNurse(request, nurseId)) {
                        return error("Appointment request does not belong to this nurse", HttpStatus.FORBIDDEN);
                    }
                    if (request.getStatus() != AppointmentStatus.PENDING) {
                        return error("Only pending appointment requests can be accepted", HttpStatus.BAD_REQUEST);
                    }
                    ResponseEntity<Map<String, String>> capacityError = validateCapacity(request.getClinicSession());
                    if (capacityError != null) {
                        return capacityError;
                    }

                    request.setStatus(AppointmentStatus.ACCEPTED);
                    request.setAcceptedAt(LocalDateTime.now());
                    AppointmentRequest savedRequest = appointmentRequestRepository.save(request);
                    sendAppointmentAcceptedEmail(savedRequest);
                    return ResponseEntity.ok(new AppointmentRequestResponse(savedRequest));
                })
                .orElseGet(() -> error("Appointment request not found", HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> removeRequest(Long requestId, Long nurseId) {
        ResponseEntity<Map<String, String>> nurseError = validateNurse(nurseId);
        if (nurseError != null) {
            return nurseError;
        }

        return appointmentRequestRepository.findById(requestId)
                .<ResponseEntity<?>>map(request -> {
                    if (!isAssignedNurse(request, nurseId)) {
                        return error("Appointment request does not belong to this nurse", HttpStatus.FORBIDDEN);
                    }
                    if (request.getStatus() == AppointmentStatus.REMOVED) {
                        return error("Appointment request is already removed", HttpStatus.BAD_REQUEST);
                    }

                    request.setStatus(AppointmentStatus.REMOVED);
                    request.setRemovedAt(LocalDateTime.now());
                    return ResponseEntity.ok(new AppointmentRequestResponse(appointmentRequestRepository.save(request)));
                })
                .orElseGet(() -> error("Appointment request not found", HttpStatus.NOT_FOUND));
    }

    private ResponseEntity<Map<String, String>> validateNurse(Long nurseId) {
        if (nurseId == null) {
            return error("nurseId is required", HttpStatus.BAD_REQUEST);
        }
        var nurse = userRepository.findById(nurseId);
        if (nurse.isEmpty()) {
            return error("Nurse not found", HttpStatus.NOT_FOUND);
        }
        if (nurse.get().getRole() != Role.NURSE) {
            return error("nurseId must belong to a NURSE user", HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    private ResponseEntity<Map<String, String>> validateDoctor(Long doctorId) {
        if (doctorId == null) {
            return error("doctorId is required", HttpStatus.BAD_REQUEST);
        }
        var doctor = userRepository.findById(doctorId);
        if (doctor.isEmpty()) {
            return error("Doctor not found", HttpStatus.NOT_FOUND);
        }
        if (doctor.get().getRole() != Role.DOCTOR) {
            return error("doctorId must belong to a DOCTOR user", HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    private boolean isAssignedNurse(AppointmentRequest request, Long nurseId) {
        Clinic clinic = request.getClinicSession().getClinic();
        return clinic != null && clinic.getNurse() != null && clinic.getNurse().getId().equals(nurseId);
    }

    private ResponseEntity<Map<String, String>> validateCapacity(ClinicSession clinicSession) {
        Integer maximumPatients = clinicSession.getMaximumPatients();
        if (maximumPatients == null) {
            return null;
        }

        long acceptedCount = appointmentRequestRepository.countByClinicSessionIdAndStatus(
                clinicSession.getId(), AppointmentStatus.ACCEPTED);
        if (acceptedCount >= maximumPatients) {
            return error("Clinic session is full", HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    private void sendAppointmentAcceptedEmail(AppointmentRequest request) {
        Patient patient = request.getPatient();
        ClinicSession session = request.getClinicSession();
        Clinic clinic = session.getClinic();
        emailService.sendAppointmentAcceptedEmail(
                patient.getEmail(),
                fullName(patient.getFirstName(), patient.getLastName()),
                clinic.getClinicName(),
                String.valueOf(session.getClinicDate()),
                String.valueOf(session.getStartTime()),
                String.valueOf(session.getEndTime()),
                session.getLocation(),
                fullName(clinic.getNurse().getFirstName(), clinic.getNurse().getLastName()),
                request.getId()
        );
    }

    private String fullName(String firstName, String lastName) {
        String first = firstName == null ? "" : firstName.trim();
        String last = lastName == null ? "" : lastName.trim();
        return (first + " " + last).trim();
    }

    private String blankToNull(String value) {
        return value == null || value.trim().isEmpty() ? null : value.trim();
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }
}
