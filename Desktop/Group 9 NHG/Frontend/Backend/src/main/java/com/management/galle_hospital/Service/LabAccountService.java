package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.LabUpdateRequest;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LabAccountService {
    private final UserRepository userRepository;

    public List<User> getAllLabs() {
        return userRepository.findByRole(Role.LAB);
    }

    public ResponseEntity<?> getLabById(Long id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.LAB)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Lab account not found"));
    }

    public ResponseEntity<?> updateLab(Long id, LabUpdateRequest request) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.LAB)
                .<ResponseEntity<?>>map(lab -> {
                    ResponseEntity<Map<String, String>> emailError = validateEmailChange(lab, request.getEmail());
                    if (emailError != null) {
                        return emailError;
                    }

                    applyUpdates(lab, request);
                    return ResponseEntity.ok(userRepository.save(lab));
                })
                .orElseGet(() -> notFound("Lab account not found"));
    }

    public ResponseEntity<Map<String, String>> deleteLab(Long id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.LAB)
                .map(lab -> {
                    userRepository.delete(lab);
                    return ResponseEntity.ok(Map.of("message", "Lab account deleted successfully"));
                })
                .orElseGet(() -> notFound("Lab account not found"));
    }

    private void applyUpdates(User lab, LabUpdateRequest request) {
        if (request.getFirstName() != null) lab.setFirstName(request.getFirstName());
        if (request.getLastName() != null) lab.setLastName(request.getLastName());
        if (request.getNic() != null) lab.setNic(request.getNic());
        if (request.getDob() != null) lab.setDob(request.getDob());
        if (request.getMobile() != null) lab.setMobile(request.getMobile());
        if (request.getAddress() != null) lab.setAddress(request.getAddress());
        if (request.getEmail() != null) lab.setEmail(request.getEmail());
    }

    private ResponseEntity<Map<String, String>> validateEmailChange(User lab, String email) {
        if (email == null || email.equals(lab.getEmail())) {
            return null;
        }
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Email already exists")))
                .orElse(null);
    }

    private ResponseEntity<Map<String, String>> notFound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", message));
    }
}
