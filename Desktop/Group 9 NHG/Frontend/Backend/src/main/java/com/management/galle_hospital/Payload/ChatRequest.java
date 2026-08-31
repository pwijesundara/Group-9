package com.management.galle_hospital.Payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequest {
    private String message;
    private String instructions;
}
