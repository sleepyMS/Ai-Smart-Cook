package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // 새로운 사용자 추가
    public void insertUser(UserDTO userDTO);

    // ID로 사용자 조회
    public UserDTO getUserById(String id);

    // 사용자 정보 업데이트
    public void updateUser(UserDTO userDTO);

    // ID로 사용자 삭제
    public void deleteUser(String id);

}
