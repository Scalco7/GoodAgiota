package com.example.goodagiota.exceptions;

public class IncompleteRequestException extends AbstractRequestException {
    private String name = "Requisição incompleta";
    private Integer code = 0;

    public IncompleteRequestException(String message) {
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