package com.examplesec.demo.controllers;

import lombok.Data;

@Data
public class AuthenticationRequestDto {
    private String email;
    private String password;
}
