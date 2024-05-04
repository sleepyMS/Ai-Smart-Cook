package com.KProject.SmartAiCook.controller;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.service.AuthService;
import com.KProject.SmartAiCook.service.QnAService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/qna")
public class QnAController {
    @Autowired QnAService qnAService;

    @Operation(summary = "QnA 추가", description = "파라미터로 받은 Title, Que, Email, Pass로 QnA를 생성합니다.")
    @PostMapping("/insert")
    public ResponseDTO<?> insertQnA(@RequestBody InsertQnARequest requestBody) {
        ResponseDTO<?> result = qnAService.insertQnA(requestBody);

        return result;
    }

    @Operation(summary = "유저의 QnA 요청", description = "파라미터로 받은 Email로 QnA(List)를 반환합니다.")
    @PostMapping("/getByEmail")
    public ResponseDTO<?> getQnAByEmail(@RequestBody String requestBody) {
        ResponseDTO<?> result = qnAService.getQnAByEmail(requestBody);

        return result;
    }
    @Operation(summary = "num의 QnA 요청", description = "파라미터로 받은 num으로 QnA를 반환합니다.")
    @PostMapping("/getByNum")
    public ResponseDTO<?> getQnAByNum(@RequestBody int requestBody) {
        ResponseDTO<?> result = qnAService.getQnAByNum(requestBody);

        return result;
    }
    @Operation(summary = "QnA 요청", description = "파라미터로 from, to를 받아 QnA(List)를 반환합니다.")
    @PostMapping("/get")
    public ResponseDTO<?> getQnA(@RequestBody GetQnARequest requestBody) {
        ResponseDTO<?> result = qnAService.getQnA(requestBody);

        return result;
    }
    @Operation(summary = "QnA 수정", description = "파라미터로 변경할 QnA정보를 받아 변경된 QnA를 반환합니다.")
    @PostMapping("/alterIn")
    public ResponseDTO<?> alterIn(@RequestBody QnADTO requestBody) {
        ResponseDTO<?> result = qnAService.alterIn(requestBody);

        return result;
    }
}