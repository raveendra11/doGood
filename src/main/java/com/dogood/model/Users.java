package com.dogood.model;

import jakarta.persistence.*;
import lombok.*;

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

    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String resetToken;
    private java.time.LocalDateTime resetTokenExpiry;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        DONOR, VOLUNTEER, BENEFICIARY
    }

}
