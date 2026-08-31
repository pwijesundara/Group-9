package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.LabReport;
import com.management.galle_hospital.Model.Patient;
import com.management.galle_hospital.Payload.LabReportResponse;
import com.management.galle_hospital.Repository.LabReportRepository;
import com.management.galle_hospital.Repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LabReportService {
    private final LabReportRepository labReportRepository;
    private final PatientRepository patientRepository;

    public ResponseEntity<?> submitReport(String patientPhoneNumber, String description, MultipartFile report) {
        if (isBlank(patientPhoneNumber) || isBlank(description) || report == null || report.isEmpty()) {
            return error("Patient phone number, description and report PDF are required", HttpStatus.BAD_REQUEST);
        }
        if (!isPdf(report)) {
            return error("Report must be a PDF file", HttpStatus.BAD_REQUEST);
        }

        Patient patient = patientRepository.findByMobile(patientPhoneNumber.trim()).orElse(null);
        if (patient == null) {
            return error("Patient not found", HttpStatus.NOT_FOUND);
        }

        try {
            LabReport savedReport = labReportRepository.save(buildReport(patient, description, report, "LAB"));
            return ResponseEntity.status(HttpStatus.CREATED).body(new LabReportResponse(savedReport));
        } catch (IOException exception) {
            return error("Could not read report PDF", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> submitReportForPatient(Long patientId, String description, MultipartFile report) {
        if (patientId == null || isBlank(description) || report == null || report.isEmpty()) {
            return error("Patient id, description and report PDF are required", HttpStatus.BAD_REQUEST);
        }
        if (!isPdf(report)) {
            return error("Report must be a PDF file", HttpStatus.BAD_REQUEST);
        }

        return patientRepository.findById(patientId)
                .<ResponseEntity<?>>map(patient -> {
                    try {
                        LabReport savedReport = labReportRepository.save(buildReport(patient, description, report, "PATIENT"));
                        return ResponseEntity.status(HttpStatus.CREATED).body(new LabReportResponse(savedReport));
                    } catch (IOException exception) {
                        return error("Could not read report PDF", HttpStatus.BAD_REQUEST);
                    }
                })
                .orElseGet(() -> error("Patient not found", HttpStatus.NOT_FOUND));
    }

    public List<LabReportResponse> getReportsByPatientPhoneNumber(String patientPhoneNumber) {
        return labReportRepository.findByPatientPhoneNumberOrderBySubmittedAtDesc(patientPhoneNumber)
                .stream()
                .map(LabReportResponse::new)
                .toList();
    }

    public List<LabReportResponse> getAllReports() {
        return labReportRepository.findAllByOrderBySubmittedAtDesc()
                .stream()
                .map(LabReportResponse::new)
                .toList();
    }

    public ResponseEntity<?> getReportsByPatientId(Long patientId) {
        return patientRepository.findById(patientId)
                .<ResponseEntity<?>>map(patient -> ResponseEntity.ok(labReportRepository.findByPatientIdOrderBySubmittedAtDesc(patient.getId())
                        .stream()
                        .map(LabReportResponse::new)
                        .toList()))
                .orElseGet(() -> error("Patient not found", HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> downloadReport(Long reportId) {
        return labReportRepository.findById(reportId)
                .<ResponseEntity<?>>map(report -> {
                    ByteArrayResource resource = new ByteArrayResource(report.getReportPdf());
                    String fileName = isBlank(report.getFileName()) ? "lab-report-" + report.getId() + ".pdf" : report.getFileName();

                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_PDF)
                            .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.inline().filename(fileName).build().toString())
                            .contentLength(report.getReportPdf().length)
                            .body(resource);
                })
                .orElseGet(() -> error("Lab report not found", HttpStatus.NOT_FOUND));
    }

    private LabReport buildReport(Patient patient, String description, MultipartFile report, String reportSource) throws IOException {
        LabReport labReport = new LabReport();
        labReport.setPatientPhoneNumber(patient.getMobile());
        labReport.setDescription(description.trim());
        labReport.setFileName(report.getOriginalFilename());
        labReport.setContentType(MediaType.APPLICATION_PDF_VALUE);
        labReport.setReportSource(reportSource);
        labReport.setSubmittedAt(LocalDateTime.now());
        labReport.setReportPdf(report.getBytes());
        labReport.setPatient(patient);
        return labReport;
    }

    private boolean isPdf(MultipartFile report) {
        String contentType = report.getContentType();
        String fileName = report.getOriginalFilename();
        return MediaType.APPLICATION_PDF_VALUE.equalsIgnoreCase(contentType)
                || (fileName != null && fileName.toLowerCase().endsWith(".pdf"));
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
