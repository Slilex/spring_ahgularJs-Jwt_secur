package com.examplesec.demo.security;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

@Getter
public class JwtAuthenticationEception extends AuthenticationException {
    private HttpStatus httpStatus;

    public JwtAuthenticationEception(String msg) {
        super(msg);
    }

    public JwtAuthenticationEception(String msg, HttpStatus httpStatus) {
        super(msg);
        this.httpStatus = httpStatus;
    }
}
