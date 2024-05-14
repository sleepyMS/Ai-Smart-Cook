package com.KProject.SmartAiCook.service;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.mapper.QnAMapper;
import com.KProject.SmartAiCook.mapper.RecipeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private RecipeMapper recipeMapper;
    @Autowired
    public RecipeService(RecipeMapper recipeMapper) {
        this.recipeMapper = recipeMapper;
    }

    public ResponseDTO<?> insertRecipe(InsertRecipeRequest req) {
        RecipeDTO recipeDTO = new RecipeDTO();

        try {
            recipeDTO.setEmail(req.getEmail());
            recipeDTO.setTitle(req.getTitle());
            recipeDTO.setIngredient(req.getIngredient());
            recipeDTO.setTag(req.getTag());
            recipeDTO.setRecipe(req.getRecipe());

            recipeMapper.insertRecipe(recipeDTO);

        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: recipeDTO 삽입 err");
        }

        return ResponseDTO.setSuccessData("insertRecipe 성공", recipeDTO);
    }
    public ResponseDTO<?> getRecipeByEmail(String email) {
        List<RecipeDTO> recipeDTOList = null;
        try {
            recipeDTOList = recipeMapper.getRecipeByEmail(email);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("getRecipeByEmail 성공하였습니다.", recipeDTOList);
    }
    public ResponseDTO<?> getRecipeByNum(int num) {
        RecipeDTO recipeDTO = null;
        try {
            recipeDTO = recipeMapper.getRecipeByNum(num);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("getRecipeByNum 성공하였습니다.", recipeDTO);
    }

    public ResponseDTO<?> getRecipe(GetRecipeRequest req) {
        List<RecipeDTO> recipeDTOList = null;
        try {
            recipeDTOList = recipeMapper.getRecipe(req);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("getRecipe 성공하였습니다.", recipeDTOList);
    }

    public ResponseDTO<?> alterIn(RecipeDTO dto) {
        try {
            recipeMapper.updateRecipe(dto);
        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: 사용자 호출 err");
        }
        return ResponseDTO.setSuccessData("Recipe 수정에 성공하였습니다.", dto);
    }
    public ResponseDTO<?> deleteRecipe(int num) {
        RecipeDTO recipeDTO = null;

        try {
            recipeMapper.deleteRecipe(num);

        } catch (Exception e) {
            return ResponseDTO.setFailed("데이터베이스 연결 실패: recipeDTO 삭제 err");
        }

        return ResponseDTO.setSuccessData("deleteRecipe 성공", null);
    }
}
