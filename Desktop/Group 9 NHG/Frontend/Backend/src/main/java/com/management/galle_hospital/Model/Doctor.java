package com.management.galle_hospital.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Doctor extends User {

    @Enumerated(EnumType.STRING)
    private TITLE title;

    private String profilePhoto;

    private String specialization;

    private String licenseNumber;

    private String department;

    private String qualification;

}
