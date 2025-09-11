package com.dogood.controller;

import com.dogood.dto.LoginRequest;
import com.dogood.model.Users;
import com.dogood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/message")
    public String message() {
    	return "Hello, We are there to contribute for doGood!";
    }
    
    @PostMapping("/register")
    public Users register(@RequestBody Users users) {
        return userService.registerUser(users);
    }
    
    @PostMapping("/login")
    public Users login(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }
}
