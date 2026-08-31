package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Doctor;
import com.management.galle_hospital.Payload.DoctorUpdateRequest;
import com.management.galle_hospital.Repository.DoctorRepository;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public ResponseEntity<?> getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Doctor not found"));
    }

    public ResponseEntity<?> updateDoctor(Long id, DoctorUpdateRequest request) {
        return doctorRepository.findById(id)
                .<ResponseEntity<?>>map(doctor -> {
                    ResponseEntity<Map<String, String>> emailError = validateEmailChange(doctor, request.getEmail());
                    if (emailError != null) {
                        return emailError;
                    }

                    applyUpdates(doctor, request);
                    return ResponseEntity.ok(doctorRepository.save(doctor));
                })
                .orElseGet(() -> notFound("Doctor not found"));
    }

    public ResponseEntity<Map<String, String>> deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            return notFound("Doctor not found");
        }
        doctorRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Doctor deleted successfully"));
    }

    private void applyUpdates(Doctor doctor, DoctorUpdateRequest request) {
        if (request.getFirstName() != null) doctor.setFirstName(request.getFirstName());
        if (request.getLastName() != null) doctor.setLastName(request.getLastName());
        if (request.getNic() != null) doctor.setNic(request.getNic());
        if (request.getDob() != null) doctor.setDob(request.getDob());
        if (request.getMobile() != null) doctor.setMobile(request.getMobile());
        if (request.getAddress() != null) doctor.setAddress(request.getAddress());
        if (request.getEmail() != null) doctor.setEmail(request.getEmail());
        if (request.getTitle() != null) doctor.setTitle(request.getTitle());
        if (request.getProfilePhoto() != null) doctor.setProfilePhoto(request.getProfilePhoto());
        if (request.getSpecialization() != null) doctor.setSpecialization(request.getSpecialization());
        if (request.getLicenseNumber() != null) doctor.setLicenseNumber(request.getLicenseNumber());
        if (request.getDepartment() != null) doctor.setDepartment(request.getDepartment());
        if (request.getQualification() != null) doctor.setQualification(request.getQualification());
    }

    private ResponseEntity<Map<String, String>> validateEmailChange(Doctor doctor, String email) {
        if (email == null || email.equals(doctor.getEmail())) {
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
