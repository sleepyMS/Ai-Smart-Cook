package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.QnADTO;
import com.KProject.SmartAiCook.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QnAMapper {
    public QnADTO getUserByEmail(String email);
}
