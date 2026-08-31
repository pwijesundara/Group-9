package com.management.galle_hospital.Payload;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LabUpdateRequest {
    private String firstName;
    private String lastName;
    private String nic;
    private LocalDate dob;
    private String mobile;
    private String address;
    private String email;
}
