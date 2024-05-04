package com.KProject.SmartAiCook.service;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.mapper.QnAMapper;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QnAService {

    private QnAMapper qnaMapper;
    @Autowired
    public QnAService(QnAMapper qnaMapper) {
        this.qnaMapper= qnaMapper;
    }

    public ResponseDTO<?> insertQnA(InsertQnARequest req) {
        QnADTO qnADTO = new QnADTO();

        try {
            qnADTO.setTitle(req.getTitle());
            qnADTO.setQue(req.getQue());
            qnADTO.setEmail(req.getEmail());
            qnADTO.setPass(req.getPass());

            qnaMapper.insertQnA(qnADTO);

        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: qnADTO 삽입 err");
        }

        return ResponseDTO.setSuccessData("insertQnA 성공", qnADTO);
    }
    public ResponseDTO<?> getQnAByEmail(String email) {
        List<QnADTO> qnADTOList = null;
        try {
            qnADTOList = qnaMapper.getQnAByEmail(email);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("getQnAByEmail 성공하였습니다.", qnADTOList);
    }
    public ResponseDTO<?> getQnAByNum(int num) {
        QnADTO qnADTO = null;
        try {
            qnADTO = qnaMapper.getQnAByNum(num);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("getQnAByNum 성공하였습니다.", qnADTO);
    }

    public ResponseDTO<?> getQnA(GetQnARequest req) {
        List<QnADTO> qnADTOList = null;
        try {
            qnADTOList = qnaMapper.getQnA(req);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("getQnA 성공하였습니다.", qnADTOList);
    }

    public ResponseDTO<?> alterIn(QnADTO dto) {
        try {
            qnaMapper.updateQnA(dto);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("qna 수정에 성공하였습니다.", dto);
    }

}
