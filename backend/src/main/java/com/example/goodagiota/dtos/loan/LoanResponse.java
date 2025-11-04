package com.example.goodagiota.dtos.loan;

import com.example.goodagiota.entities.Loan;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoanResponse extends Loan {
    private Double finalLoanAmount;

    public LoanResponse(Loan loan, Double finalLoanAmount) {
        super(loan);
        this.setFinalLoanAmount(finalLoanAmount);
    }
}
