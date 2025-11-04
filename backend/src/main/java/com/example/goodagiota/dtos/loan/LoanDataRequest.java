package com.example.goodagiota.dtos.loan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class LoanDataRequest {
    private String userId;
    private Double loanValue;
    private Integer loanDurationInMonths;
    private String coinCode;
    private Double loanRate;
}
