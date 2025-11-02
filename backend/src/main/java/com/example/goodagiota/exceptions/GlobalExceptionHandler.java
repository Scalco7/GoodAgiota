package com.example.goodagiota.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.example.goodagiota.dtos.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMediaTypeNotAcceptableException.class)
    public ResponseEntity<ApiResponse<String>> handleMediaTypeNotAcceptable(HttpMediaTypeNotAcceptableException ex) {
        ex.printStackTrace();
        ApiResponse<String> response = new ApiResponse<>(9, "Mídia não aceitável.", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(response);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Object> handleNotFoundError(NoResourceFoundException ex) {
        ex.printStackTrace();
        ApiResponse<Object> response = new ApiResponse<>(78, "Rota inexistente.", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(AbstractRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleCustomExceptions(AbstractRequestException ex) {
        ex.printStackTrace();
        ApiResponse<Object> response = new ApiResponse<>(ex.getCode(), ex.getName(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex) {
        ex.printStackTrace();
        ApiResponse<Object> response = new ApiResponse<>(555, "Erro interno.", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
