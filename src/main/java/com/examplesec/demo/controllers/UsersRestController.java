package com.examplesec.demo.controllers;

import com.examplesec.demo.model.User;
import com.examplesec.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UsersRestController {
    private static final Logger logger = LoggerFactory.getLogger(UsersRestController.class);

    @Value("${open.exchage.chartes.app.id}")
    private String app_id;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public UserRequestDto getById(@PathVariable Long id){
        return  userService.findById(id);
    }

    @GetMapping("/app/token/id")
    public ResponseEntity getAppId(){
        Map map = new HashMap();
        map.put("app_id", app_id);
        return ResponseEntity.ok(map);
    }

    @PutMapping
    public User update(@RequestBody User user) {
       return userService.update(user);
    }

}
