package com.management.galle_hospital.Payload;

import com.management.galle_hospital.Model.TITLE;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DoctorRegistrationRequest {
    private String firstName;
    private String lastName;
    private String nic;
    private LocalDate dob;
    private String mobile;
    private String address;
    private String email;
    private String password;
    private String confirmPassword;
    private TITLE title;
    private String profilePhoto;
    private String specialization;
    private String licenseNumber;
    private String department;
    private String qualification;
}
