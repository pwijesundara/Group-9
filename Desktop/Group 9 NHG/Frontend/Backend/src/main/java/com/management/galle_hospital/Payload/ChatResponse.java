package com.management.galle_hospital.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatResponse {
    private String reply;
    private String model;
}
