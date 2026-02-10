package com.dogood.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    // Auth-related fields
    private String password;
    private String resetToken;
    private LocalDateTime resetTokenExpiry;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Keeping these explicit as they were in the original code
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public enum Role {
        DONOR, VOLUNTEER, BENEFICIARY
    }
}
