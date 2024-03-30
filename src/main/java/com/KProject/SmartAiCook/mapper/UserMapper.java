package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.SignUpDTO;
import com.KProject.SmartAiCook.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // 새로운 사용자 추가
    public void insertUser(SignUpDTO signUpDTO);
//    // 새로운 사용자 추가
//    public void insertUser(UserDTO userDTO);

    // ID로 사용자 조회
    public UserDTO getUserById(String id);

    public void updateUser(UserDTO userDTO);

    // ID로 사용자 삭제
    public void deleteUser(String id);

    public boolean getUserSelectById(String email);
}
