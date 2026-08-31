package com.management.galle_hospital.Payload;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ClinicSessionRequest {
    private Long clinicId;
    @JsonAlias("consultantId")
    private Long nurseId;
    private LocalDate clinicDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String location;
    private String description;
    private Integer maximumPatients;
}
