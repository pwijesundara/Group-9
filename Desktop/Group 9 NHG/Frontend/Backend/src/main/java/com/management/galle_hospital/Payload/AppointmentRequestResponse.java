package com.management.galle_hospital.Payload;

import com.management.galle_hospital.Model.AppointmentRequest;
import com.management.galle_hospital.Model.AppointmentStatus;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
public class AppointmentRequestResponse {
    private final Long id;
    private final AppointmentStatus status;
    private final String description;
    private final String reason;
    private final LocalDateTime requestedAt;
    private final LocalDateTime acceptedAt;
    private final LocalDateTime removedAt;
    private final Long patientId;
    private final String patientName;
    private final String patientEmail;
    private final Long nurseId;
    private final String nurseName;
    private final Long clinicId;
    private final String clinicName;
    private final Long clinicSessionId;
    private final LocalDate clinicDate;
    private final LocalTime startTime;
    private final LocalTime endTime;
    private final String location;
    private final String sessionDescription;

    public AppointmentRequestResponse(AppointmentRequest request) {
        this.id = request.getId();
        this.status = request.getStatus();
        this.description = request.getDescription();
        this.reason = request.getReason();
        this.requestedAt = request.getRequestedAt();
        this.acceptedAt = request.getAcceptedAt();
        this.removedAt = request.getRemovedAt();
        this.patientId = request.getPatient().getId();
        this.patientName = fullName(request.getPatient().getFirstName(), request.getPatient().getLastName());
        this.patientEmail = request.getPatient().getEmail();
        this.clinicSessionId = request.getClinicSession().getId();
        this.clinicDate = request.getClinicSession().getClinicDate();
        this.startTime = request.getClinicSession().getStartTime();
        this.endTime = request.getClinicSession().getEndTime();
        this.location = request.getClinicSession().getLocation();
        this.sessionDescription = request.getClinicSession().getDescription();
        this.clinicId = request.getClinicSession().getClinic().getId();
        this.clinicName = request.getClinicSession().getClinic().getClinicName();
        this.nurseId = request.getClinicSession().getClinic().getNurse().getId();
        this.nurseName = fullName(
                request.getClinicSession().getClinic().getNurse().getFirstName(),
                request.getClinicSession().getClinic().getNurse().getLastName()
        );
    }

    private String fullName(String firstName, String lastName) {
        String first = firstName == null ? "" : firstName.trim();
        String last = lastName == null ? "" : lastName.trim();
        return (first + " " + last).trim();
    }
}
