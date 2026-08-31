package com.management.galle_hospital.Payload;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClinicRequest {
    private String clinicName;
    private String description;
    @JsonAlias("consultantId")
    private Long nurseId;
    private List<Long> doctorIds;
}
