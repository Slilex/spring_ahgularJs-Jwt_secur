package com.examplesec.demo.controllers;

import com.examplesec.demo.model.User;
import com.examplesec.demo.repository.UserRepository;
import com.examplesec.demo.security.JwtTokenProvider;
import com.examplesec.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("")
public class AuthenticationRestController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationRestController.class);

    private final AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private UserService userService;

    public AuthenticationRestController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDto request) {
        if (logger.isDebugEnabled()){
            logger.debug("user with email {} trying to login" , request.getEmail());
        }
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = userService.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User doesn't exists"));
            String token = jwtTokenProvider.createToken(request.getEmail(), user.getRole().name());
            Map<Object, Object> response = new HashMap<>();
            response.put("user_id", user.getId());
            response.put("token", token);

            if (logger.isDebugEnabled()){
                logger.debug("user with email {} logged in successfully" , user.getEmail());
            }

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            logger.warn("Authorisation Error. user email : {} . error {}" , request.getEmail(), e.getMessage(), e);
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            userService.save(user);
            if (logger.isDebugEnabled()){
                logger.debug("new user registered. user email : {}" , user.getEmail());
            }
            return ResponseEntity.ok().build();

        } catch (AuthenticationException e) {
            logger.warn("An error occurred during registration new user" , e.getMessage(), e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    public void authenticate(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }

}
