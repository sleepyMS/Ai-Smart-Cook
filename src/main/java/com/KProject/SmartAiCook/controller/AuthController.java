package com.KProject.SmartAiCook.controller;

import com.KProject.SmartAiCook.dto.LoginDTO;
import com.KProject.SmartAiCook.dto.ResponseDTO;
import com.KProject.SmartAiCook.dto.SignUpDTO;
import com.KProject.SmartAiCook.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/auth")
public class AuthController {
    @Autowired AuthService authService;

    @PostMapping("/signUp")
    public ResponseDTO<?> signUp(@RequestBody SignUpDTO requestBody) {
        ResponseDTO<?> result = authService.signUp(requestBody);

        return result;
    }

    @PostMapping("/signIn")
    public ResponseDTO<?> login(@RequestBody LoginDTO requestBody) {
        ResponseDTO<?> result = authService.signIn(requestBody);

        return result;
    }

}