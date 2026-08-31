package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Doctor;
import com.management.galle_hospital.Model.Patient;
import com.management.galle_hospital.Model.PasswordResetToken;
import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.DoctorRegistrationRequest;
import com.management.galle_hospital.Payload.ForgotPasswordRequest;
import com.management.galle_hospital.Payload.LabRegistrationRequest;
import com.management.galle_hospital.Payload.NurseRegistrationRequest;
import com.management.galle_hospital.Payload.PatientRegistrationRequest;
import com.management.galle_hospital.Payload.ResetPasswordRequest;
import com.management.galle_hospital.Payload.UserLoginRequest;
import com.management.galle_hospital.Payload.UserRegisterRequest;
import com.management.galle_hospital.Repository.DoctorRepository;
import com.management.galle_hospital.Repository.PatientRepository;
import com.management.galle_hospital.Repository.PasswordResetTokenRepository;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Map;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final int MIN_PASSWORD_LENGTH = 8;
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern MOBILE_PATTERN = Pattern.compile("^(0\\d{9}|94\\d{9}|\\+94\\d{9})$");
    private static final Pattern NIC_PATTERN = Pattern.compile("^(\\d{12}|\\d{9}[VvXx])$");

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.password-reset.token-expiration-minutes:15}")
    private long passwordResetExpirationMinutes;

    @Value("${app.frontend.reset-password-url:http://localhost:3000/reset-password}")
    private String resetPasswordUrl;

    public ResponseEntity<Map<String, String>> register(UserRegisterRequest request) {
        if (request == null) {
            return error("Registration details are required", HttpStatus.BAD_REQUEST);
        }
        String validationError = validateBasicRegistration(request.getName(), request.getEmail(), request.getPassword());
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        PatientRegistrationRequest patientRequest = new PatientRegistrationRequest();
        patientRequest.setFirstName(normalizeText(request.getName()));
        patientRequest.setEmail(normalizeEmail(request.getEmail()));
        patientRequest.setPassword(request.getPassword());
        patientRequest.setConfirmPassword(request.getPassword());
        patientRequest.setMobile("N/A");

        Patient patient = new Patient();
        patient.setFirstName(patientRequest.getFirstName());
        patient.setEmail(patientRequest.getEmail());
        patient.setPassword(passwordEncoder.encode(patientRequest.getPassword()));
        patient.setMobile(patientRequest.getMobile());
        patient.setRole(Role.PATIENT);

        Patient savedPatient = patientRepository.save(patient);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Patient registered successfully", "id", savedPatient.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> registerPatient(PatientRegistrationRequest request) {
        if (request == null) {
            return error("Patient registration details are required", HttpStatus.BAD_REQUEST);
        }
        String validationError = validateRegistration(
                request.getFirstName(),
                request.getEmail(),
                request.getPassword(),
                request.getConfirmPassword(),
                request.getMobile(),
                request.getNic(),
                request.getDob()
        );
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        Patient patient = new Patient();
        patient.setFirstName(normalizeText(request.getFirstName()));
        patient.setLastName(normalizeText(request.getLastName()));
        patient.setNic(normalizeNic(request.getNic()));
        patient.setDob(request.getDob());
        patient.setMobile(normalizeMobile(request.getMobile()));
        patient.setAddress(normalizeText(request.getAddress()));
        patient.setEmail(normalizeEmail(request.getEmail()));
        patient.setPassword(passwordEncoder.encode(request.getPassword()));
        patient.setRole(Role.PATIENT);

        Patient savedPatient = patientRepository.save(patient);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Patient registered successfully", "id", savedPatient.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> registerDoctor(DoctorRegistrationRequest request) {
        if (request == null) {
            return error("Doctor registration details are required", HttpStatus.BAD_REQUEST);
        }
        String validationError = validateRegistration(
                request.getFirstName(),
                request.getEmail(),
                request.getPassword(),
                request.getConfirmPassword(),
                request.getMobile(),
                request.getNic(),
                request.getDob()
        );
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        Doctor doctor = new Doctor();
        doctor.setFirstName(normalizeText(request.getFirstName()));
        doctor.setLastName(normalizeText(request.getLastName()));
        doctor.setNic(normalizeNic(request.getNic()));
        doctor.setDob(request.getDob());
        doctor.setMobile(normalizeMobile(request.getMobile()));
        doctor.setAddress(normalizeText(request.getAddress()));
        doctor.setEmail(normalizeEmail(request.getEmail()));
        doctor.setPassword(passwordEncoder.encode(request.getPassword()));
        doctor.setRole(Role.DOCTOR);
        doctor.setTitle(request.getTitle());
        doctor.setProfilePhoto(request.getProfilePhoto());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setDepartment(request.getDepartment());
        doctor.setQualification(request.getQualification());

        Doctor savedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Doctor registered successfully", "id", savedDoctor.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> registerLab(LabRegistrationRequest request) {
        if (request == null) {
            return error("Lab registration details are required", HttpStatus.BAD_REQUEST);
        }
        String validationError = validateRegistration(
                request.getFirstName(),
                request.getEmail(),
                request.getPassword(),
                request.getConfirmPassword(),
                request.getMobile(),
                request.getNic(),
                request.getDob()
        );
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        User lab = buildStaffUser(request.getFirstName(), request.getLastName(), request.getNic(), request.getDob(),
                request.getMobile(), request.getAddress(), request.getEmail(), request.getPassword(), Role.LAB);

        User savedLab = userRepository.save(lab);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Lab registered successfully", "id", savedLab.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> registerNurse(NurseRegistrationRequest request) {
        if (request == null) {
            return error("Nurse registration details are required", HttpStatus.BAD_REQUEST);
        }
        String validationError = validateRegistration(
                request.getFirstName(),
                request.getEmail(),
                request.getPassword(),
                request.getConfirmPassword(),
                request.getMobile(),
                request.getNic(),
                request.getDob()
        );
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        User nurse = buildStaffUser(request.getFirstName(), request.getLastName(), request.getNic(), request.getDob(),
                request.getMobile(), request.getAddress(), request.getEmail(), request.getPassword(), Role.NURSE);

        User savedNurse = userRepository.save(nurse);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Nurse registered successfully", "id", savedNurse.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> login(UserLoginRequest request) {
        if (isBlank(request.getEmail()) || isBlank(request.getPassword())) {
            return error("Email and password are required", HttpStatus.BAD_REQUEST);
        }

        return userRepository.findByEmail(request.getEmail())
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "id", user.getId().toString(),
                        "role", user.getRole().name()
                )))
                .orElseGet(() -> error("Invalid email or password", HttpStatus.UNAUTHORIZED));
    }

    public ResponseEntity<Map<String, String>> forgotPassword(ForgotPasswordRequest request) {
        if (request == null || isBlank(request.getEmail())) {
            return error("Email is required", HttpStatus.BAD_REQUEST);
        }

        userRepository.findByEmail(request.getEmail().trim()).ifPresent(user -> {
            String token = generateResetToken();

            PasswordResetToken passwordResetToken = new PasswordResetToken();
            passwordResetToken.setToken(token);
            passwordResetToken.setUser(user);
            passwordResetToken.setExpiresAt(LocalDateTime.now().plusMinutes(passwordResetExpirationMinutes));
            passwordResetTokenRepository.save(passwordResetToken);

            String resetLink = resetPasswordUrl + "?token=" + token;
            emailService.sendPasswordResetEmail(user.getEmail(), resetLink, token);
        });

        return ResponseEntity.ok(Map.of("message", "If the email exists, a password reset email has been sent"));
    }

    @Transactional
    public ResponseEntity<Map<String, String>> resetPassword(ResetPasswordRequest request) {
        if (request == null || isBlank(request.getToken()) || isBlank(request.getNewPassword()) || isBlank(request.getConfirmPassword())) {
            return error("Token, newPassword and confirmPassword are required", HttpStatus.BAD_REQUEST);
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return error("Password and confirmPassword do not match", HttpStatus.BAD_REQUEST);
        }

        return passwordResetTokenRepository.findByToken(request.getToken().trim())
                .map(passwordResetToken -> {
                    if (passwordResetToken.getUsedAt() != null) {
                        return error("Password reset token has already been used", HttpStatus.BAD_REQUEST);
                    }
                    if (passwordResetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
                        return error("Password reset token has expired", HttpStatus.BAD_REQUEST);
                    }

                    User user = passwordResetToken.getUser();
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    userRepository.save(user);

                    passwordResetToken.setUsedAt(LocalDateTime.now());
                    passwordResetTokenRepository.save(passwordResetToken);

                    return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
                })
                .orElseGet(() -> error("Invalid password reset token", HttpStatus.BAD_REQUEST));
    }

    private String validateBasicRegistration(String name, String email, String password) {
        if (isBlank(name)) {
            return "Name is required";
        }
        String credentialError = validateCredentials(email, password, password);
        if (credentialError != null) {
            return credentialError;
        }
        return null;
    }

    private String validateRegistration(String firstName, String email, String password, String confirmPassword,
                                        String mobile, String nic, LocalDate dob) {
        if (isBlank(firstName)) {
            return "First name is required";
        }
        if (isBlank(mobile)) {
            return "Mobile number is required";
        }
        if (!MOBILE_PATTERN.matcher(normalizeMobile(mobile)).matches()) {
            return "Mobile number must be 10 digits or start with +94 followed by 9 digits";
        }
        if (!isBlank(nic)) {
            String normalizedNic = normalizeNic(nic);
            if (!NIC_PATTERN.matcher(normalizedNic).matches()) {
                return "NIC must be 12 digits or 9 digits followed by V or X";
            }
            if (userRepository.findByNic(normalizedNic).isPresent()) {
                return "NIC already exists";
            }
        }
        if (dob != null && dob.isAfter(LocalDate.now())) {
            return "Date of birth cannot be in the future";
        }

        return validateCredentials(email, password, confirmPassword);
    }

    private String validateCredentials(String email, String password, String confirmPassword) {
        if (isBlank(email)) {
            return "Email is required";
        }
        String normalizedEmail = normalizeEmail(email);
        if (!EMAIL_PATTERN.matcher(normalizedEmail).matches()) {
            return "Enter a valid email address";
        }
        if (userRepository.findByEmailIgnoreCase(normalizedEmail).isPresent()) {
            return "Email already exists";
        }
        if (isBlank(password)) {
            return "Password is required";
        }
        if (password.length() < MIN_PASSWORD_LENGTH) {
            return "Password must be at least 8 characters";
        }
        if (!containsLetter(password) || !containsDigit(password)) {
            return "Password must contain at least one letter and one number";
        }
        if (isBlank(confirmPassword)) {
            return "Confirm password is required";
        }
        if (!password.equals(confirmPassword)) {
            return "Password and confirm password do not match";
        }
        return null;
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private User buildStaffUser(String firstName, String lastName, String nic, java.time.LocalDate dob, String mobile,
                                String address, String email, String password, Role role) {
        User user = new User();
        user.setFirstName(normalizeText(firstName));
        user.setLastName(normalizeText(lastName));
        user.setNic(normalizeNic(nic));
        user.setDob(dob);
        user.setMobile(normalizeMobile(mobile));
        user.setAddress(normalizeText(address));
        user.setEmail(normalizeEmail(email));
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return user;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    private String normalizeText(String value) {
        return value == null ? null : value.trim();
    }

    private String normalizeNic(String nic) {
        return isBlank(nic) ? null : nic.trim().toUpperCase();
    }

    private String normalizeMobile(String mobile) {
        return mobile == null ? "" : mobile.trim().replaceAll("[\\s-]", "");
    }

    private boolean containsLetter(String value) {
        return value.chars().anyMatch(Character::isLetter);
    }

    private boolean containsDigit(String value) {
        return value.chars().anyMatch(Character::isDigit);
    }

    private String generateResetToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
