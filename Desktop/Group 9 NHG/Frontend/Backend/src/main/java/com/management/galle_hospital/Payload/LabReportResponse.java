package com.management.galle_hospital.Payload;

import com.management.galle_hospital.Model.LabReport;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LabReportResponse {
    private final Long id;
    private final String patientPhoneNumber;
    private final String description;
    private final String fileName;
    private final String reportSource;
    private final LocalDateTime submittedAt;
    private final Long patientId;

    public LabReportResponse(LabReport report) {
        this.id = report.getId();
        this.patientPhoneNumber = report.getPatientPhoneNumber();
        this.description = report.getDescription();
        this.fileName = report.getFileName();
        this.reportSource = report.getReportSource();
        this.submittedAt = report.getSubmittedAt();
        this.patientId = report.getPatient() == null ? null : report.getPatient().getId();
    }
}
