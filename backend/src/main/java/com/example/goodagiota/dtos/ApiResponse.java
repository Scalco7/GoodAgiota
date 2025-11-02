package com.example.goodagiota.dtos;

public class ApiResponse<T> {
    private T resultData;
    private Integer errorCode;
    private String errorName;
    private String errorMessage;

    public ApiResponse() {
        super();
    }

    public ApiResponse(T resultData) {
        this.resultData = resultData;
    }

    public ApiResponse(Integer errorCode, String errorName, String errorMessage) {
        super();
        this.errorCode = errorCode;
        this.errorName = errorName;
        this.errorMessage = errorMessage;
    }

    public ApiResponse(T resultData, Integer errorCode, String errorName, String errorMessage) {
        super();
        this.resultData = resultData;
        this.errorCode = errorCode;
        this.errorName = errorName;
        this.errorMessage = errorMessage;
    }

    public T getResultData() {
        return resultData;
    }

    public void setResultData(T resultData) {
        this.resultData = resultData;
    }

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorName() {
        return errorName;
    }

    public void setErrorName(String errorName) {
        this.errorName = errorName;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public static <T> ApiResponseBuilder<T> builder() {
        return new ApiResponseBuilder<>();
    }

    public static class ApiResponseBuilder<T> {
        private T resultData;
        private Integer errorCode;
        private String errorName;
        private String errorMessage;

        public ApiResponseBuilder<T> resultData(T resultData) {
            this.resultData = resultData;
            return this;
        }

        public ApiResponseBuilder<T> errorCode(Integer errorCode) {
            this.errorCode = errorCode;
            return this;
        }

        public ApiResponseBuilder<T> errorName(String errorName) {
            this.errorName = errorName;
            return this;
        }

        public ApiResponseBuilder<T> errorMessage(String errorMessage) {
            this.errorMessage = errorMessage;
            return this;
        }

        public ApiResponse<T> build() {
            return new ApiResponse<>(resultData, errorCode, errorName, errorMessage);
        }
    }

}
