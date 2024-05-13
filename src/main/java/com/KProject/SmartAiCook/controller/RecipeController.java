package com.KProject.SmartAiCook.controller;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.service.QnAService;
import com.KProject.SmartAiCook.service.RecipeService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    @Autowired
    RecipeService recipeService;

    @Operation(summary = "recipe 추가", description = "파라미터로 받은 Title, Que, Email, Pass로 QnA를 생성합니다.")
    @PostMapping("/insert")
    public ResponseDTO<?> insertQnA(@RequestBody InsertRecipeRequest requestBody) {
        ResponseDTO<?> result = recipeService.insertRecipe(requestBody);

        return result;
    }

    @Operation(summary = "유저의 recipe 요청", description = "파라미터로 받은 Email로 recipe(List)를 반환합니다.")
    @PostMapping("/getByEmail")
    public ResponseDTO<?> getRecipeByEmail(@RequestBody String requestBody) {
        ResponseDTO<?> result = recipeService.getRecipeByEmail(requestBody);

        return result;
    }
    @Operation(summary = "num의 recipe 요청", description = "파라미터로 받은 num으로 recipe를 반환합니다.")
    @PostMapping("/getByNum")
    public ResponseDTO<?> getQnAByNum(@RequestBody int requestBody) {
        ResponseDTO<?> result = recipeService.getRecipeByNum(requestBody);

        return result;
    }
    @Operation(summary = "recipe 요청", description = "파라미터로 from, to를 받아 recipe(List)를 반환합니다.")
    @PostMapping("/get")
    public ResponseDTO<?> getRecipe(@RequestBody GetRecipeRequest requestBody) {
        ResponseDTO<?> result = recipeService.getRecipe(requestBody);

        return result;
    }
    @Operation(summary = "recipe 수정", description = "파라미터로 변경할 recipe정보를 받아 변경된 recipe를 반환합니다.")
    @PostMapping("/alterIn")
    public ResponseDTO<?> alterIn(@RequestBody RecipeDTO requestBody) {
        ResponseDTO<?> result = recipeService.alterIn(requestBody);

        return result;
    }
}