package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Patient;
import com.management.galle_hospital.Payload.PatientUpdateRequest;
import com.management.galle_hospital.Repository.PatientRepository;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public ResponseEntity<?> getPatientById(Long id) {
        return patientRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Patient not found"));
    }

    public ResponseEntity<?> updatePatient(Long id, PatientUpdateRequest request) {
        return patientRepository.findById(id)
                .<ResponseEntity<?>>map(patient -> {
                    ResponseEntity<Map<String, String>> emailError = validateEmailChange(patient, request.getEmail());
                    if (emailError != null) {
                        return emailError;
                    }

                    applyUpdates(patient, request);
                    return ResponseEntity.ok(patientRepository.save(patient));
                })
                .orElseGet(() -> notFound("Patient not found"));
    }

    public ResponseEntity<Map<String, String>> deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            return notFound("Patient not found");
        }
        patientRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Patient deleted successfully"));
    }

    private void applyUpdates(Patient patient, PatientUpdateRequest request) {
        if (request.getFirstName() != null) patient.setFirstName(request.getFirstName());
        if (request.getLastName() != null) patient.setLastName(request.getLastName());
        if (request.getNic() != null) patient.setNic(request.getNic());
        if (request.getDob() != null) patient.setDob(request.getDob());
        if (request.getMobile() != null) patient.setMobile(request.getMobile());
        if (request.getAddress() != null) patient.setAddress(request.getAddress());
        if (request.getEmail() != null) patient.setEmail(request.getEmail());
        if (request.getBloodGroup() != null) patient.setBloodGroup(request.getBloodGroup());
        if (request.getHeight() != null) patient.setHeight(request.getHeight());
        if (request.getWeight() != null) patient.setWeight(request.getWeight());
        if (request.getEmergencyContact() != null) patient.setEmergencyContact(request.getEmergencyContact());
        if (request.getAllergies() != null) patient.setAllergies(request.getAllergies());
        if (request.getMedicalHistory() != null) patient.setMedicalHistory(request.getMedicalHistory());
    }

    private ResponseEntity<Map<String, String>> validateEmailChange(Patient patient, String email) {
        if (email == null || email.equals(patient.getEmail())) {
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
