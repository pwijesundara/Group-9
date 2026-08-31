package com.management.galle_hospital.Payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequest {
    private String name;
    private String email;
    private String password;
}
