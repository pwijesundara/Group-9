package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.NurseUpdateRequest;
import com.management.galle_hospital.Service.NurseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nurses")
@RequiredArgsConstructor
public class NurseController {
    private final NurseService nurseService;

    @GetMapping
    public List<User> getAllNurses() {
        return nurseService.getAllNurses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNurseById(@PathVariable Long id) {
        return nurseService.getNurseById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNurse(@PathVariable Long id, @RequestBody NurseUpdateRequest request) {
        return nurseService.updateNurse(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNurse(@PathVariable Long id) {
        return nurseService.deleteNurse(id);
    }
}
