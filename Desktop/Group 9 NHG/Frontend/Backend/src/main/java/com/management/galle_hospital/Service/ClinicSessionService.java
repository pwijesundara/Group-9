package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Clinic;
import com.management.galle_hospital.Model.ClinicSession;
import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Payload.ClinicSessionRequest;
import com.management.galle_hospital.Repository.ClinicRepository;
import com.management.galle_hospital.Repository.ClinicSessionRepository;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClinicSessionService {
    private final ClinicSessionRepository clinicSessionRepository;
    private final ClinicRepository clinicRepository;
    private final UserRepository userRepository;

    public List<ClinicSession> getAllClinicSessions() {
        return clinicSessionRepository.findAll();
    }

    public ResponseEntity<?> getClinicSessionById(Long id) {
        return clinicSessionRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Clinic session not found"));
    }

    public ResponseEntity<?> createClinicSession(ClinicSessionRequest request) {
        if (request.getClinicId() == null) {
            return error("clinicId is required", HttpStatus.BAD_REQUEST);
        }
        if (request.getNurseId() == null) {
            return error("nurseId is required", HttpStatus.BAD_REQUEST);
        }

        ClinicSession clinicSession = new ClinicSession();
        ResponseEntity<?> nurseError = validateNurse(request.getNurseId());
        if (nurseError != null) {
            return nurseError;
        }

        ResponseEntity<?> clinicError = applyClinic(clinicSession, request.getClinicId(), request.getNurseId());
        if (clinicError != null) {
            return clinicError;
        }

        applyUpdates(clinicSession, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(clinicSessionRepository.save(clinicSession));
    }

    public ResponseEntity<?> updateClinicSession(Long id, ClinicSessionRequest request) {
        return clinicSessionRepository.findById(id)
                .<ResponseEntity<?>>map(clinicSession -> {
                    Long nurseId = request.getNurseId();
                    if (nurseId != null) {
                        ResponseEntity<?> nurseError = validateNurse(nurseId);
                        if (nurseError != null) {
                            return nurseError;
                        }
                    }

                    if (request.getClinicId() != null) {
                        if (nurseId == null) {
                            return error("nurseId is required when changing clinicId", HttpStatus.BAD_REQUEST);
                        }
                        ResponseEntity<?> clinicError = applyClinic(clinicSession, request.getClinicId(), nurseId);
                        if (clinicError != null) {
                            return clinicError;
                        }
                    } else if (nurseId != null) {
                        ResponseEntity<?> ownerError = validateClinicOwnership(clinicSession.getClinic(), nurseId);
                        if (ownerError != null) {
                            return ownerError;
                        }
                    }

                    applyUpdates(clinicSession, request);
                    return ResponseEntity.ok(clinicSessionRepository.save(clinicSession));
                })
                .orElseGet(() -> notFound("Clinic session not found"));
    }

    public ResponseEntity<Map<String, String>> deleteClinicSession(Long id) {
        if (!clinicSessionRepository.existsById(id)) {
            return notFound("Clinic session not found");
        }
        clinicSessionRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Clinic session deleted successfully"));
    }

    private ResponseEntity<?> applyClinic(ClinicSession clinicSession, Long clinicId, Long nurseId) {
        var clinic = clinicRepository.findById(clinicId);
        if (clinic.isEmpty()) {
            return error("Clinic not found", HttpStatus.BAD_REQUEST);
        }

        ResponseEntity<?> ownerError = validateClinicOwnership(clinic.get(), nurseId);
        if (ownerError != null) {
            return ownerError;
        }

        clinicSession.setClinic(clinic.get());
        return null;
    }

    private ResponseEntity<?> validateNurse(Long nurseId) {
        var nurse = userRepository.findById(nurseId);
        if (nurse.isEmpty()) {
            return error("Nurse not found", HttpStatus.BAD_REQUEST);
        }
        if (nurse.get().getRole() != Role.NURSE) {
            return error("nurseId must belong to a NURSE user", HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    private ResponseEntity<?> validateClinicOwnership(Clinic clinic, Long nurseId) {
        if (clinic == null || clinic.getNurse() == null) {
            return error("Clinic does not have an assigned nurse", HttpStatus.BAD_REQUEST);
        }
        if (!clinic.getNurse().getId().equals(nurseId)) {
            return error("Nurse can only manage sessions for assigned clinics", HttpStatus.FORBIDDEN);
        }
        return null;
    }

    private void applyUpdates(ClinicSession clinicSession, ClinicSessionRequest request) {
        if (request.getClinicDate() != null) clinicSession.setClinicDate(request.getClinicDate());
        if (request.getStartTime() != null) clinicSession.setStartTime(request.getStartTime());
        if (request.getEndTime() != null) clinicSession.setEndTime(request.getEndTime());
        if (request.getLocation() != null) clinicSession.setLocation(request.getLocation());
        if (request.getDescription() != null) clinicSession.setDescription(request.getDescription());
        if (request.getMaximumPatients() != null) clinicSession.setMaximumPatients(request.getMaximumPatients());
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private ResponseEntity<Map<String, String>> notFound(String message) {
        return error(message, HttpStatus.NOT_FOUND);
    }
}
