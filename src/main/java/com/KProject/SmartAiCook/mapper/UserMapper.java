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

    public void updateUser(UserDTO userDTO);

    // ID로 사용자 삭제
    public void deleteUser(String id);

    // 이미 존재하는 아이디인지 체크
    public boolean getIdCheckById(String email);

    // id, password 조회 ( 로그인 성공 여부 )
    public UserDTO getExistedByEmail(String email);
}
