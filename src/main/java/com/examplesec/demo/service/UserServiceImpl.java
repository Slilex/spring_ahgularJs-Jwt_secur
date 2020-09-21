package com.examplesec.demo.service;

import com.examplesec.demo.model.Role;
import com.examplesec.demo.model.Status;
import com.examplesec.demo.model.User;
import com.examplesec.demo.repository.UserRepository;
import com.examplesec.demo.controllers.UserRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setStatus(Status.ACTIVE);
        repository.save(user);
    }

    @Override
    public User update(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public UserRequestDto findById(Long id) {
        Optional<User> byId = repository.findById(id);
        User user = byId.orElseGet(null);
        UserRequestDto requestDto = null;
        if (user != null) {
            requestDto = new UserRequestDto();
            requestDto.setId(user.getId());
            requestDto.setEmail(user.getEmail());
            requestDto.setFirstName(user.getFirstName());
            requestDto.setLastName(user.getLastName());
            requestDto.setRole(user.getRole());
            requestDto.setStatus(user.getStatus());
        }
        return requestDto;
    }

}
