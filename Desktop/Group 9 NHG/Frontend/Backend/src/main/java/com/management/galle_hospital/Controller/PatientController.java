package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.Patient;
import com.management.galle_hospital.Payload.PatientUpdateRequest;
import com.management.galle_hospital.Service.LabReportService;
import com.management.galle_hospital.Service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;
    private final LabReportService labReportService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable Long id, @RequestBody PatientUpdateRequest request) {
        return patientService.updatePatient(id, request);
    }

    @PutMapping("/{id}/details")
    public ResponseEntity<?> updatePatientDetails(@PathVariable Long id, @RequestBody PatientUpdateRequest request) {
        return patientService.updatePatient(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePatient(@PathVariable Long id) {
        return patientService.deletePatient(id);
    }

    @GetMapping("/{id}/lab-reports")
    public ResponseEntity<?> getLabReports(@PathVariable Long id) {
        return labReportService.getReportsByPatientId(id);
    }

    @GetMapping("/me/lab-reports")
    public ResponseEntity<?> getMyLabReports(@RequestParam Long patientId) {
        return labReportService.getReportsByPatientId(patientId);
    }

    @GetMapping("/lab-reports/{reportId}/pdf")
    public ResponseEntity<?> downloadLabReport(@PathVariable Long reportId) {
        return labReportService.downloadReport(reportId);
    }
}
