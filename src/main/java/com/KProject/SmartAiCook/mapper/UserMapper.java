package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    public void insertUser(UserDTO userDTO);
}
