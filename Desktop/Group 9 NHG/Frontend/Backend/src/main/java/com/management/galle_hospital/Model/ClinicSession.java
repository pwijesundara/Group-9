package com.management.galle_hospital.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
public class ClinicSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    private LocalDate clinicDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String location;

    private String description;

    private Integer maximumPatients;

}
