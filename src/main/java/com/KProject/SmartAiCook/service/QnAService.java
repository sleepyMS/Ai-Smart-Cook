package com.KProject.SmartAiCook.service;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.mapper.QnAMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QnAService {

    private QnAMapper qnaMapper;
    @Autowired
    public QnAService(QnAMapper qnaMapper) {
        this.qnaMapper= qnaMapper;
    }

    public ResponseDTO<?> insertQnA(QnADTO dto) {
        QnADTO qnADTO = new QnADTO();

        /// 유저 정보 가져오기 필요
        try {
            qnADTO.setTitle(dto.getTitle());
            qnADTO.setQue(dto.getQue());
            qnADTO.setEmail(dto.getEmail()); // 임시로 입력받게 해놓음
            qnADTO.setPass(dto.getPass());

            qnaMapper.insertQnA(qnADTO);

        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: qnADTO 삽입 err");
        }

        return ResponseDTO.setSuccessData("insertQnA 성공", qnADTO);
    }

    public ResponseDTO<?> getQnAByEmail(QnADTO dto) {
        String email = dto.getEmail();
        QnADTO qnADTO = null;
        try {
            // 값이 존재하는 경우 사용자 정보 불러옴 (기준 email)
            qnADTO = qnaMapper.getUserByEmail(email);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }


        //LoginResponseDTO loginResponseDTO = new LoginResponseDTO(token, exprTime, userDTO);

        return ResponseDTO.setSuccessData("getQnAByEmail 성공하였습니다.", qnADTO);
    }
}
