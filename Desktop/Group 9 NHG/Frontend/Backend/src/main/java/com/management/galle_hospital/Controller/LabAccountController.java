package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.LabUpdateRequest;
import com.management.galle_hospital.Service.LabAccountService;
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
@RequestMapping("/api/labs")
@RequiredArgsConstructor
public class LabAccountController {
    private final LabAccountService labAccountService;

    @GetMapping
    public List<User> getAllLabs() {
        return labAccountService.getAllLabs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLabById(@PathVariable Long id) {
        return labAccountService.getLabById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLab(@PathVariable Long id, @RequestBody LabUpdateRequest request) {
        return labAccountService.updateLab(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLab(@PathVariable Long id) {
        return labAccountService.deleteLab(id);
    }
}
