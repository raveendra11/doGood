package com.dogood.controller;

import com.dogood.dto.LoginRequest;
import com.dogood.model.User;
import com.dogood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/message")
    public String message() {
    	return "We are there to contribute for doGood!";
    }
    
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }
    
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }
}
