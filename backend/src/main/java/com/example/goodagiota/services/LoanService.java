package com.example.goodagiota.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

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

    public void mockData() {
        LocalDateTime now = LocalDateTime.now();
        Random random = new Random();
        List<User> users = userRepository.findAll();
        if (users.size() <= 0) {
            throw new InvalidRequestException("Nenhum usuário cadastrado.");
        }

        List<String> coinsCode = List.of("BRL", "USD", "EUR", "JPY", "GBP");

        List<Loan> loans = new ArrayList<>();

        for (int i = 0; i < 50; i++) {
            Loan loan = new Loan();

            String coinCode = coinsCode.get(random.nextInt(5));
            loan.setCoinCode(coinCode);
            loan.setLoanValue(random.nextDouble(1000, 50000));

            Date loanDate = Date
                    .from(now.minusMonths(random.nextInt(0, 48)).atZone(ZoneId.systemDefault()).toInstant());
            loan.setLoanDate(loanDate);

            Date dueDate = Date
                    .from(now.plusMonths(random.nextInt(5, 60)).atZone(ZoneId.systemDefault()).toInstant());
            loan.setDueDate(dueDate);

            loan.setPaid(false);
            loan.setCurrencyConversionRate(random.nextDouble(5));
            loan.setLoanRate(random.nextDouble(5, 20));

            User user = users.get(random.nextInt(users.size()));
            loan.setUser(user);

            loans.add(loan);
        }

        loanRepository.saveAll(loans);
    }

    public Long getQuantityOfPaidLoans() {
        return loanRepository.countPaidLoans();
    }

    public Long getQuantityOfUnpaidLoans() {
        return loanRepository.countUnpaidLoans();
    }
}
