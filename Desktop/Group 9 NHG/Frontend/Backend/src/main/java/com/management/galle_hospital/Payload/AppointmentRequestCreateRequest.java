package com.management.galle_hospital.Payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequestCreateRequest {
    private Long patientId;
    private Long clinicSessionId;
    private String description;
    private String reason;
}
