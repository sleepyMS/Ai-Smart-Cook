package com.KProject.SmartAiCook.service;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.mapper.UserMapper;
import com.KProject.SmartAiCook.security.TokenProvider;
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
            if (userMapper.getIdCheckById(email)) {
                return ResponseDTO.setFailed("중복된 Email 입니다.");
            }
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패");
        }

        if (!password.equals(confirmPassword)) {
            return ResponseDTO.setFailed("비밀번호가 일치하지 않습니다.");
        }

        UserDTO userDTO = new UserDTO();
        try {
            userDTO.setId(dto.getId());
            userDTO.setPassword(dto.getPassword());
            userDTO.setNick(dto.getNick());
            userDTO.setEmail(dto.getEmail());
            userDTO.setName(dto.getName());
            userDTO.setPhone(dto.getPhone());
            userDTO.setBirth(dto.getBirth());
            userDTO.setToken(dto.getToken());
            userDTO.setCreatedAt(dto.getCreatedAt());
            userDTO.setEditedAt(dto.getEditedAt());
            userDTO.setLastLoginAt(dto.getLastLoginAt());

            userMapper.insertUser(userDTO);
//            userMapper.insertUser(dto);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패");
        }

        return ResponseDTO.setSuccess("회원가입 성공");
    }


    public ResponseDTO<LoginResponseDTO> login(LoginDTO dto) {
        String email = dto.getEmail();
//        String password = dto.getPassword();

        try {
            // DB에 회원정보가 존재하는지 체크
            boolean existed = userMapper.getExistedByEmail(dto);
            if (!existed) {
                return ResponseDTO.setFailed("존재하지 않는 회원정보입니다.");
            }
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패");
        }

        UserDTO userDTO = null;

        try {
            // 값이 존재하는 경우 사용자 정보 불러옴 (기준 email)
            userDTO = userMapper.getUserByEmail(email);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패");
        }

        userDTO.setPassword("");

        TokenProvider tokenProvider = new TokenProvider();
        String token = "";
        int exprTime = 3600;    // 1h
//        String token = tokenProvider.createJwt(email, exprTime);

//        if(token == null) {
//            return ResponseDTO.setFailed("토큰 생성에 실패하였습니다.");
//        }

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(token, exprTime, userDTO);

        return ResponseDTO.setSuccessData("로그인에 성공하였습니다.", loginResponseDTO);
    }

}
