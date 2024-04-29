package com.KProject.SmartAiCook.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QnADTO {
    private String num;
    private String title;
    private String email;
    private String que;
    private String pass;
    private LocalDateTime time;
}
/*
* Q&A

email
num(그 고유넘버)
title(제목)
que(내용)
--ans(댓글)--
pass(글 비밀번호)
time
date


Recipe

email
num(그 고유넘버)
ingredient(재료)
title(제목)
recipe(내용)
tag(음식 종류)
time

Likes

recipeNum : num(그 고유넘버)
email
*
* */