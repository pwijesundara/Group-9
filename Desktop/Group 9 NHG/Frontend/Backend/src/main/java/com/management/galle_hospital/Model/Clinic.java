package com.management.galle_hospital.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clinicName;

    private String description;

    @ManyToOne
    @JoinColumn(name = "nurse_id", nullable = false)
    private User nurse;

    @ManyToMany
    @JoinTable(
            name = "clinic_doctors",
            joinColumns = @JoinColumn(name = "clinic_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    private List<Doctor> doctors;
}
