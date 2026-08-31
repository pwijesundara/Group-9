package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.NurseUpdateRequest;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NurseService {
    private final UserRepository userRepository;

    public List<User> getAllNurses() {
        return userRepository.findByRole(Role.NURSE);
    }

    public ResponseEntity<?> getNurseById(Long id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.NURSE)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Nurse not found"));
    }

    public ResponseEntity<?> updateNurse(Long id, NurseUpdateRequest request) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.NURSE)
                .<ResponseEntity<?>>map(nurse -> {
                    ResponseEntity<Map<String, String>> emailError = validateEmailChange(nurse, request.getEmail());
                    if (emailError != null) {
                        return emailError;
                    }

                    applyUpdates(nurse, request);
                    return ResponseEntity.ok(userRepository.save(nurse));
                })
                .orElseGet(() -> notFound("Nurse not found"));
    }

    public ResponseEntity<Map<String, String>> deleteNurse(Long id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.NURSE)
                .map(nurse -> {
                    userRepository.delete(nurse);
                    return ResponseEntity.ok(Map.of("message", "Nurse deleted successfully"));
                })
                .orElseGet(() -> notFound("Nurse not found"));
    }

    private void applyUpdates(User nurse, NurseUpdateRequest request) {
        if (request.getFirstName() != null) nurse.setFirstName(request.getFirstName());
        if (request.getLastName() != null) nurse.setLastName(request.getLastName());
        if (request.getNic() != null) nurse.setNic(request.getNic());
        if (request.getDob() != null) nurse.setDob(request.getDob());
        if (request.getMobile() != null) nurse.setMobile(request.getMobile());
        if (request.getAddress() != null) nurse.setAddress(request.getAddress());
        if (request.getEmail() != null) nurse.setEmail(request.getEmail());
    }

    private ResponseEntity<Map<String, String>> validateEmailChange(User nurse, String email) {
        if (email == null || email.equals(nurse.getEmail())) {
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
