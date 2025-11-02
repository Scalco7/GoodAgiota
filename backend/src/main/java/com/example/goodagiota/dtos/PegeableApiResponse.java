package com.example.goodagiota.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PegeableApiResponse<T> extends ApiResponse<T> {
    private int page;
    private int totalPages;

    public PegeableApiResponse(T resultData, int page, int totalPages) {
        super(resultData);
        this.page = page;
        this.totalPages = totalPages;
    }

    public PegeableApiResponse(Integer errorCode, String errorName, String errorMessage, int page, int totalPages) {
        super(errorCode, errorName, errorMessage);
        this.page = page;
        this.totalPages = totalPages;
    }
}
