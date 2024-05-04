package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.GetQnARequest;
import com.KProject.SmartAiCook.dto.InsertQnARequest;
import com.KProject.SmartAiCook.dto.QnADTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QnAMapper {
    // 새로운 사용자 추가
    public void insertQnA(QnADTO qnADTO);
    public List<QnADTO> getQnAByEmail(String email);
    public QnADTO getQnAByNum(int num);
    public List<QnADTO> getQnA(GetQnARequest getQnARequest);
    public void updateQnA(QnADTO qnADTO);
    public void deleteQnA(int num);
}
