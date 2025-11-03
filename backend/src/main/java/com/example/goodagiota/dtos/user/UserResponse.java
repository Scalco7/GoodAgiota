package com.example.goodagiota.dtos.user;

import com.example.goodagiota.enums.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private String id;
    private String name;
    private String phone;
    private UserStatus status;

    public UserResponse(String id, String name, String phone, String statusString) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.status = UserStatus.fromValue(statusString);
    }
}
