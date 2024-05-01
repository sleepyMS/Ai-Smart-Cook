package com.KProject.SmartAiCook.controller;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.service.AuthService;
import com.KProject.SmartAiCook.service.QnAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/qna")
public class QnAController {
    @Autowired QnAService qnAService;

    @PostMapping("/insert")
    public ResponseDTO<?> insertQnA(@RequestBody QnADTO requestBody) {
        ResponseDTO<?> result = qnAService.insertQnA(requestBody);

        return result;
    }


}