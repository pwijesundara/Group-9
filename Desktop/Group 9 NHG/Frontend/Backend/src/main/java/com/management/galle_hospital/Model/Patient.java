package com.management.galle_hospital.Model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Patient extends User {

    private String bloodGroup;

    private Double height;

    private Double weight;

    private String emergencyContact;

    private String allergies;

    private String medicalHistory;
}