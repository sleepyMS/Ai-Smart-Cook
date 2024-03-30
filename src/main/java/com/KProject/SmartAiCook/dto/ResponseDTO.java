package com.KProject.SmartAiCook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDTO<D> {

    private boolean result;
    private String message;
    private D data;

    public static <D> ResponseDTO<D> setSuccess(String message) {
        return ResponseDTO.set(true, message, null);
    }

    public static <D> ResponseDTO<D> setFailed(String message) {
        return ResponseDTO.set(false, message, null);
    }

//    [접근 제어자] <제네릭타입> [반환타입] [메소드명]([제네릭타입] [파라미터]) {}
    public static <D> ResponseDTO<D> setSuccessData(String message, D data) {
        return ResponseDTO.set(true, message, data);
    }

    public static <D> ResponseDTO<D> setFailedData(String message, D data) {
        return ResponseDTO.set(false, message, data);
    }

}
