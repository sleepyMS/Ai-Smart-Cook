package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.LoginDTO;
import com.KProject.SmartAiCook.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // 새로운 사용자 추가
    public void insertUser(UserDTO userDTO);

    // ID로 사용자 조회
    public UserDTO getUserByEmail(String email);

    // 사용자 정보 수정
    public void updateUser(UserDTO userDTO);

    // Email로 사용자 삭제
    public void deleteUser(String email);

    // 이미 존재하는 아이디인지 체크
    public boolean getIdCheckById(String email);

}
