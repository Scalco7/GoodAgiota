package com.example.goodagiota.enums;

public enum UserStatus {
    NO_DEBT("no_debt"),
    PAYING("paying"),
    OWING("owing");

    private final String value;

    UserStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static UserStatus fromValue(String value) {
        for (UserStatus status : UserStatus.values()) {
            if (status.value.equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status desconhecido: " + value);
    }
}
