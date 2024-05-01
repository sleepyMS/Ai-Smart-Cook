package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.QnADTO;
import com.KProject.SmartAiCook.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QnAMapper {
    // 새로운 사용자 추가
    public void insertQnA(QnADTO qnADTO);
    public QnADTO getUserByEmail(String email);
}
