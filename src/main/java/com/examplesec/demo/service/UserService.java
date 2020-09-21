package com.examplesec.demo.service;

import com.examplesec.demo.model.User;
import com.examplesec.demo.controllers.UserRequestDto;

import java.util.Optional;

public interface UserService {

    void save(User user);
    User update(User user);

    Optional<User> findByEmail(String email);
    UserRequestDto findById(Long id);


}
