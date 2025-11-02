package com.example.goodagiota.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserDataRequest {
    private String name;
    private String phone;
}
