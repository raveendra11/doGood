package com.dogood.service;
import com.dogood.dto.LoginRequest;
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
}
