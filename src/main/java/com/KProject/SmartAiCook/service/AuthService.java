package com.KProject.SmartAiCook.service;

import com.KProject.SmartAiCook.dto.ResponseDTO;
import com.KProject.SmartAiCook.dto.SignUpDTO;
import com.KProject.SmartAiCook.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
//    @Autowired UserMapper userMapper;
    private UserMapper userMapper;

    @Autowired
    public AuthService(UserMapper userMapper) {
        this.userMapper= userMapper;
    }

    public ResponseDTO<?> signUp(SignUpDTO dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        String confirmPassword = dto.getConfirmPassword();

        try {
            if (userMapper.getUserSelectById(email)) {
                return ResponseDTO.setFailed("중복된 Email 입니다.");
            }
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패");
        }

        if (!password.equals(confirmPassword)) {
            return ResponseDTO.setFailed("비밀번호가 일치하지 않습니다.");
        }

//        UserEntity userEntity = new UserEntity(dto);
        try {
//            userMapper.insertUser(userEntity);
            userMapper.insertUser(dto);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패");
        }

        return ResponseDTO.setSuccess("회원가입 성공");
    }
}
