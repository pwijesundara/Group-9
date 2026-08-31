package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Payload.LabReportResponse;
import com.management.galle_hospital.Service.LabReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/lab")
@RequiredArgsConstructor
public class LabController {
    private final LabReportService labReportService;

    @PostMapping("/reports")
    public ResponseEntity<?> submitReport(
            @RequestParam String patientPhoneNumber,
            @RequestParam String description,
            @RequestParam("report") MultipartFile report
    ) {
        return labReportService.submitReport(patientPhoneNumber, description, report);
    }

    @GetMapping("/reports")
    public List<LabReportResponse> getAllReports() {
        return labReportService.getAllReports();
    }

    @PostMapping("/patients/{patientId}/reports")
    public ResponseEntity<?> submitReportForPatient(
            @PathVariable Long patientId,
            @RequestParam String description,
            @RequestParam("report") MultipartFile report
    ) {
        return labReportService.submitReportForPatient(patientId, description, report);
    }

    @GetMapping("/patients/{patientId}/reports")
    public ResponseEntity<?> getReportsByPatientId(@PathVariable Long patientId) {
        return labReportService.getReportsByPatientId(patientId);
    }

    @GetMapping("/patients/phone/{phoneNumber}/reports")
    public List<LabReportResponse> getReportsByPatientPhoneNumber(@PathVariable String phoneNumber) {
        return labReportService.getReportsByPatientPhoneNumber(phoneNumber);
    }

    @GetMapping("/reports/{reportId}/pdf")
    public ResponseEntity<?> downloadReport(@PathVariable Long reportId) {
        return labReportService.downloadReport(reportId);
    }
}
