package com.example.goodagiota.exceptions;

public abstract class AbstractRequestException extends RuntimeException implements CustomException {
    public AbstractRequestException(String message) {
        super(message);
    }
}