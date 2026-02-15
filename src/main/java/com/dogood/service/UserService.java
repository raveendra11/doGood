package com.dogood.service;

import com.dogood.dto.ForgotPasswordRequest;
import com.dogood.dto.LoginRequest;
import com.dogood.dto.ResetPasswordRequest;
import com.dogood.exception.UserNotFoundException;
import com.dogood.model.Users;
import com.dogood.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Users registerUser(Users users) {
        System.out.println("Registering users: " + users);
        return userRepository.save(users);
    }

    public Users loginUser(LoginRequest loginRequest) {
        Users users = userRepository.findByEmail(loginRequest.getEmail());

        if (users == null) {
            throw new RuntimeException("User not found");
        }

        if (!users.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return users;
    }

    @Transactional
    public String forgotPassword(ForgotPasswordRequest request) {
        Users user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new UserNotFoundException("User with this email does not exist");
        }

        String token = java.util.UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(java.time.LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        // In a real scenario, email would be sent here
        System.out.println("Reset token for " + user.getEmail() + ": " + token);
        return "Reset token generated successfully";
    }

    @Transactional
    public String resetPassword(ResetPasswordRequest request) {
        Users user = userRepository.findByResetToken(request.getToken());

        if (user == null) {
            throw new RuntimeException("Invalid token: User not found");
        }

        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        user.setPassword(request.getNewPassword());
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return "Password reset successful";
    }
}
