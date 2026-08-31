package com.management.galle_hospital.Controller;


import com.management.galle_hospital.Payload.DoctorRegistrationRequest;
import com.management.galle_hospital.Payload.ForgotPasswordRequest;
import com.management.galle_hospital.Payload.LabRegistrationRequest;
import com.management.galle_hospital.Payload.NurseRegistrationRequest;
import com.management.galle_hospital.Payload.PatientRegistrationRequest;
import com.management.galle_hospital.Payload.ResetPasswordRequest;
import com.management.galle_hospital.Payload.UserLoginRequest;
import com.management.galle_hospital.Payload.UserRegisterRequest;
import com.management.galle_hospital.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserRegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/patient/register")
    public ResponseEntity<Map<String, String>> registerPatient(@RequestBody PatientRegistrationRequest request) {
        return userService.registerPatient(request);
    }

    @PostMapping("/doctor/register")
    public ResponseEntity<Map<String, String>> registerDoctor(@RequestBody DoctorRegistrationRequest request) {
        return userService.registerDoctor(request);
    }

    @PostMapping("/lab/register")
    public ResponseEntity<Map<String, String>> registerLab(@RequestBody LabRegistrationRequest request) {
        return userService.registerLab(request);
    }

    @PostMapping("/nurse/register")
    public ResponseEntity<Map<String, String>> registerNurse(@RequestBody NurseRegistrationRequest request) {
        return userService.registerNurse(request);
    }

    @PostMapping({"/login", "/signin"})
    public ResponseEntity<Map<String, String>> login(@RequestBody UserLoginRequest request) {
        return userService.login(request);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return userService.forgotPassword(request);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody ResetPasswordRequest request) {
        return userService.resetPassword(request);
    }
}
