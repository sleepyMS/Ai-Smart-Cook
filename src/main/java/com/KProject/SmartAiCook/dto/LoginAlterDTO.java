package com.KProject.SmartAiCook.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginAlterDTO {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String newPassword;
    @NotBlank
    private String confirmNewPassword;
}