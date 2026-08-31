package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.ClinicSession;
import com.management.galle_hospital.Payload.ClinicSessionRequest;
import com.management.galle_hospital.Service.ClinicSessionService;
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
@RequestMapping("/api/clinic-sessions")
@RequiredArgsConstructor
public class ClinicSessionController {
    private final ClinicSessionService clinicSessionService;

    @GetMapping
    public List<ClinicSession> getAllClinicSessions() {
        return clinicSessionService.getAllClinicSessions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClinicSessionById(@PathVariable Long id) {
        return clinicSessionService.getClinicSessionById(id);
    }

    @PostMapping
    public ResponseEntity<?> createClinicSession(@RequestBody ClinicSessionRequest request) {
        return clinicSessionService.createClinicSession(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClinicSession(@PathVariable Long id, @RequestBody ClinicSessionRequest request) {
        return clinicSessionService.updateClinicSession(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteClinicSession(@PathVariable Long id) {
        return clinicSessionService.deleteClinicSession(id);
    }
}
