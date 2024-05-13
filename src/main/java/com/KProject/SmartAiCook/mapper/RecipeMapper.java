package com.KProject.SmartAiCook.mapper;

import com.KProject.SmartAiCook.dto.GetQnARequest;
import com.KProject.SmartAiCook.dto.GetRecipeRequest;
import com.KProject.SmartAiCook.dto.QnADTO;
import com.KProject.SmartAiCook.dto.RecipeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecipeMapper {
    // 새로운 사용자 추가
    public void insertRecipe(RecipeDTO recipeDTO);
    public List<RecipeDTO> getRecipeByEmail(String email);
    public RecipeDTO getRecipeByNum(int num);
    public List<RecipeDTO> getRecipe(GetRecipeRequest getRecipeRequest);
    public void updateRecipe(RecipeDTO recipeDTO);
    public void deleteRecipe(int num);
}
