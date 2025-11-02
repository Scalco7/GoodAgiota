package com.example.goodagiota.dtos.loan;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class LoanDataRequest {
    private String userId;
    private Double loanValue;
    private Date dueDate;
    private String coinCode;
    private Double currencyConversionRate;
    private Double loanRate;
}
