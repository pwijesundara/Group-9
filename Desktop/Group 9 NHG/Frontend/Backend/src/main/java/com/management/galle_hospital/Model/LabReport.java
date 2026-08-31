package com.management.galle_hospital.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class LabReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String patientPhoneNumber;

    @Column(nullable = false, length = 1000)
    private String description;

    private String fileName;

    private String contentType;

    private String reportSource;

    private LocalDateTime submittedAt;

    @JsonIgnore
    @Lob
    @Column(nullable = false, columnDefinition = "LONGBLOB")
    private byte[] reportPdf;

    @ManyToOne(fetch = FetchType.LAZY)
    private Patient patient;
}
