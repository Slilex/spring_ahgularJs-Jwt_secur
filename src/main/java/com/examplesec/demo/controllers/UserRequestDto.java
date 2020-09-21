package com.examplesec.demo.controllers;

import com.examplesec.demo.model.Role;
import com.examplesec.demo.model.Status;
import lombok.Data;

@Data
public class UserRequestDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private Status status;
}
