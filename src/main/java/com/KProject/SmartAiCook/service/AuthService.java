package com.KProject.SmartAiCook.service;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.mapper.UserMapper;
import com.KProject.SmartAiCook.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
            return ResponseDTO.setFailed("데이터베이스 연결 실패: Email 체크 err");
        }

        if (!password.equals(confirmPassword)) {
            return ResponseDTO.setFailed("비밀번호가 일치하지 않습니다.");
        }

        UserDTO userDTO = new UserDTO();

        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        boolean isPasswordMatch = passwordEncoder.matches(password, hashedPassword);
        if(!isPasswordMatch) { return ResponseDTO.setFailed("암호화에 실패하였습니다."); }

        try {
            userDTO.setId(dto.getId());
            userDTO.setPassword(hashedPassword);
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
            return ResponseDTO.setFailed("데이터베이스 연결 실패: userDTO 삽입 err");
        }

        return ResponseDTO.setSuccessData("회원가입 성공", userDTO);
    }


    public ResponseDTO<LoginResponseDTO> signIn(LoginDTO dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        UserDTO userDTO = null;

        try {
            // DB에 회원정보가 존재하는지 체크
            userDTO = userMapper.getUserByEmail(email);
            if (userDTO == null) {
                return ResponseDTO.setFailed("존재하지 않는 회원정보입니다.");
            }

            // 사용자가 입력한 비밀번호를 BCryptPasswordEncoder를 사용하여 암호화
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = userDTO.getPassword();

            // 저장된 암호화된 비밀번호와 입력된 암호화된 비밀번호 비교
            if(!passwordEncoder.matches(password, encodedPassword)) {
                return ResponseDTO.setFailed("비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 로그인 정보 err");
        }

        try {
            // 값이 존재하는 경우 사용자 정보 불러옴 (기준 email)
            userDTO = userMapper.getUserByEmail(email);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
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


    public ResponseDTO<LoginResponseDTO> alterIn(LoginAlterDTO dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        String newPassword = dto.getNewPassword();
        String confirmNewPassword = dto.getConfirmNewPassword();
        UserDTO userDTO = null;

        try {
            // DB에 회원정보가 존재하는지 체크
            userDTO = userMapper.getUserByEmail(email);
            if (userDTO == null) {
                return ResponseDTO.setFailed("존재하지 않는 회원정보입니다.");
            }

            // 사용자가 입력한 비밀번호를 BCryptPasswordEncoder를 사용하여 암호화
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = userDTO.getPassword();

            // 저장된 암호화된 비밀번호와 입력된 암호화된 비밀번호 비교
            if(!passwordEncoder.matches(password, encodedPassword)) {
                return ResponseDTO.setFailed("기존 비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 정보 err");
        }

        if (!newPassword.equals(confirmNewPassword)) {
            return ResponseDTO.setFailed("새로운 비밀번호가 일치하지 않습니다.");
        }

        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(newPassword);
        boolean isPasswordMatch = passwordEncoder.matches(newPassword, hashedPassword);
        if(!isPasswordMatch) { return ResponseDTO.setFailed("암호화에 실패하였습니다."); }

//        userDTO.setPassword(hashedPassword);

        try {
            userDTO.setPassword(hashedPassword);
            userMapper.updateUser(userDTO);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: userDTO Password 업데이트 err");
        }

        userDTO.setPassword("");

        TokenProvider tokenProvider = new TokenProvider();
        String token = "";
        int exprTime = 3600;    // 1h
//        String token = tokenProvider.createJwt(email, exprTime);

//        if(token == null) {
//            return ResponseDTO.setFailed("토큰 생성에 실패하였습니다.");
//        }

        // 해킹 방지를 위한 새로운 토큰 발급
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(token, exprTime, userDTO);

        return ResponseDTO.setSuccessData("비밀번호 변경에 성공하였습니다.", loginResponseDTO);
    }

    public ResponseDTO<?> insertLike(LikeDTO req) {
        LikeDTO likeDto = new LikeDTO();

        try {
            likeDto.setEmail(req.getEmail());
            likeDto.setRecipeNum(req.getRecipeNum());

            userMapper.insertLike(likeDto);

        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: insertLike 삽입 err");
        }

        return ResponseDTO.setSuccessData("insertLike 성공", likeDto);
    }
    public ResponseDTO<?> deleteLike(LikeDTO req) {
        LikeDTO likeDto = null;

        try {
            userMapper.deleteLike(req);

        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: LikeDTO 삭제 err");
        }

        return ResponseDTO.setSuccessData("deleteLike 성공", null);
    }
}
