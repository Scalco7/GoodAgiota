package com.example.goodagiota.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.goodagiota.dtos.loan.LoanDataRequest;
import com.example.goodagiota.entities.Loan;
import com.example.goodagiota.entities.User;
import com.example.goodagiota.exceptions.IncompleteRequestException;
import com.example.goodagiota.exceptions.InvalidRequestException;
import com.example.goodagiota.repositories.LoanRepository;
import com.example.goodagiota.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    public Loan create(LoanDataRequest loanRequest) {
        if (loanRequest.getUserId() == null || loanRequest.getUserId().isEmpty()) {
            throw new IncompleteRequestException("Id do usuário não deve ser nulo.");
        }
        if (loanRequest.getCoinCode() == null || loanRequest.getCoinCode().isEmpty()) {
            throw new IncompleteRequestException("Código da moeda não deve ser nulo.");
        }
        if (loanRequest.getCurrencyConversionRate() == null) {
            throw new IncompleteRequestException("Taxa de conversão não deve ser nulo.");
        }
        if (loanRequest.getLoanRate() == null) {
            throw new IncompleteRequestException("Taxa de empréstimo não deve ser nulo.");
        }
        if (loanRequest.getLoanRate() <= 0) {
            throw new InvalidRequestException("Taxa de empréstimo deve ser maior que zero.");
        }
        if (loanRequest.getDueDate() == null) {
            throw new IncompleteRequestException("Data de vencimento não deve ser nula.");
        }
        if (loanRequest.getDueDate().before(new Date())) {
            throw new InvalidRequestException("Data de vencimento deve ser maior que a data atual.");
        }
        if (loanRequest.getLoanValue() == null) {
            throw new IncompleteRequestException("Valor do empréstimo não deve ser nulo.");
        }
        if (loanRequest.getLoanValue() <= 0) {
            throw new InvalidRequestException("Valor do empréstimo deve ser maior que zero.");
        }

        User user = userRepository.findById(loanRequest.getUserId()).orElseThrow(() -> new InvalidRequestException(
                "Id do usuário informado inexistente."));

        Loan newLoan = new Loan();
        newLoan.setLoanValue(loanRequest.getLoanValue());
        newLoan.setDueDate(loanRequest.getDueDate());
        newLoan.setCoinCode(loanRequest.getCoinCode());
        newLoan.setCurrencyConversionRate(loanRequest.getCurrencyConversionRate());
        newLoan.setLoanRate(loanRequest.getLoanRate());
        newLoan.setUser(user);

        return loanRepository.save(newLoan);
    }

    public Loan payLoan(String loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new InvalidRequestException(
                "Id do empréstimo informado inexistente."));

        loan.setPaid(true);
        loan.setPaidDate(new Date());
        loan.setUpdatedDate(new Date());
        return loanRepository.save(loan);
    }
}
