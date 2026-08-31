package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.Clinic;
import com.management.galle_hospital.Payload.ClinicRequest;
import com.management.galle_hospital.Service.ClinicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clinics")
@RequiredArgsConstructor
public class ClinicController {
    private final ClinicService clinicService;

    @GetMapping
    public List<Clinic> getAllClinics() {
        return clinicService.getAllClinics();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClinicById(@PathVariable Long id) {
        return clinicService.getClinicById(id);
    }

    @PostMapping
    public ResponseEntity<?> createClinic(@RequestBody ClinicRequest request) {
        return clinicService.createClinic(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClinic(@PathVariable Long id, @RequestBody ClinicRequest request) {
        return clinicService.updateClinic(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteClinic(@PathVariable Long id) {
        return clinicService.deleteClinic(id);
    }
}
