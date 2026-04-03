package com.dogood.controller;

import com.dogood.dto.ForgotPasswordRequest;
import com.dogood.dto.LoginRequest;
import com.dogood.dto.ResetPasswordRequest;
import com.dogood.model.Users;
import com.dogood.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    private static final int SESSION_TIMEOUT_SECONDS = 300; // 5 minutes

    @Autowired
    private UserService userService;

    @GetMapping("/message")
    public String message() {
        return "Hello there! We are here to contribute for doGood.";
    }

    @PostMapping("/register")
    public Users register(@RequestBody Users users) {
        return userService.registerUser(users);
    }

    @PostMapping("/login")
    public Users login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Users user = userService.loginUser(loginRequest);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        HttpSession session = request.getSession(true);
        session.setAttribute("loggedInUserId", user.getId());
        session.setMaxInactiveInterval(SESSION_TIMEOUT_SECONDS);
        return user;
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
            return "Logged out successfully";
        }
        return "No active session";
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String token = userService.forgotPassword(request);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        return userService.resetPassword(request);
    }
}
