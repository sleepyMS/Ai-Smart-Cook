package com.KProject.SmartAiCook.controller;

import com.KProject.SmartAiCook.dto.*;
import com.KProject.SmartAiCook.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/auth")
public class AuthController {
    @Autowired AuthService authService;

    @Operation(summary = "새로운 사용자 추가", description = "새로운 사용자 추가합니다.")
    @PostMapping("/signUp")
    public ResponseDTO<?> signUp(@RequestBody SignUpDTO requestBody) {
        ResponseDTO<?> result = authService.signUp(requestBody);

        return result;
    }

    @Operation(summary = "ID로 사용자 조회", description = "받은 ID로 사용자 조회합니다.")
    @PostMapping("/signIn")
    public ResponseDTO<?> login(@RequestBody LoginDTO requestBody) {
        ResponseDTO<?> result = authService.signIn(requestBody);

        return result;
    }

    @Operation(summary = "사용자 정보 수정", description = "사용자 정보 수정합니다.")
    @PostMapping("/alterIn")
    public ResponseDTO<?> alterIn(@RequestBody LoginAlterDTO requestBody) {
        ResponseDTO<?> result = authService.alterIn(requestBody);

        return result;
    }
// ----Like Controller----
    @Operation(summary = "like 생성", description = "받은 recipeNum, email로 like를 생성합니다.")
    @PostMapping("/like/insert")
    public ResponseDTO<?> insertLike(@RequestBody LikeDTO requestBody) {
        ResponseDTO<?> result = authService.insertLike(requestBody);

        return result;
    }

    @Operation(summary = "like 삭제", description = "받은 recipeNum, email로 like를 삭제합니다.")
    @PostMapping("/like/delete")
    public ResponseDTO<?> deleteLike(@RequestBody LikeDTO requestBody) {
        ResponseDTO<?> result = authService.deleteLike(requestBody);

        return result;
    }

    @Operation(summary = "email로 like 요청", description = "파라미터로 받은 Email로 like(List)를 반환합니다.")
    @PostMapping("/like/getByEmail")
    public ResponseDTO<?> getLikeByEmail(@RequestBody String requestBody) {
        ResponseDTO<?> result = authService.getLikeByEmail(requestBody);

        return result;
    }
    @Operation(summary = "recipeNum로 like 요청", description = "파라미터로 받은 recipeNum로 like(List) 반환합니다.")
    @PostMapping("/like/getByNum")
    public ResponseDTO<?> getLikeByRecipeNum(@RequestBody int requestBody) {
        ResponseDTO<?> result = authService.getLikeByRecipeNum(requestBody);

        return result;
    }
}