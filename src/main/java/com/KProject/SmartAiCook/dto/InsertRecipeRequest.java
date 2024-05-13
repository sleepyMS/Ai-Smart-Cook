package com.KProject.SmartAiCook.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsertRecipeRequest {
    private String email;
    private String ingredient;
    private String title;
    private String recipe;
    private String tag;
}