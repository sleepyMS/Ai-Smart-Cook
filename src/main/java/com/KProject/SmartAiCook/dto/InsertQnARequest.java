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
public class InsertQnARequest {
    private String title;
    private String email;
    private String que;
    private String pass;
}