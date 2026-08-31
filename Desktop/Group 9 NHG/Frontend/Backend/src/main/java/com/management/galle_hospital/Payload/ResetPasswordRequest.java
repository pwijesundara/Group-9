package com.management.galle_hospital.Payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
    private String token;
    private String newPassword;
    private String confirmPassword;
}
