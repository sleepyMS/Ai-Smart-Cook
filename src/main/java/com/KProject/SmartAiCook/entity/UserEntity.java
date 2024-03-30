package com.KProject.SmartAiCook.entity;


import com.KProject.SmartAiCook.dto.SignUpDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEntity {

    private String id;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
    private LocalDateTime lastLoginAt;

    public UserEntity(SignUpDTO dto) {
        this.id = dto.getEmail();
        this.password = dto.getPassword();
        this.email = dto.getEmail();
        this.name = dto.getName();
        this.phone = dto.getPhone();
        this.token = "";
        this.editedAt = dto.getEditedAt();
        this.createdAt = dto.getCreatedAt();
        this.lastLoginAt = dto.getLastLoginAt();
    }
}