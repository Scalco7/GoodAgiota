package com.example.goodagiota.exceptions;

public class InvalidRequestException extends AbstractRequestException {
    private String name = "Requisição inválida";
    private Integer code = 2;

    public InvalidRequestException(String message) {
        super(message);
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public Integer getCode(){
        return code;
    }

    public void setCode(Integer code){
        this.code = code;
    }
}