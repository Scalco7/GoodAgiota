package com.example.goodagiota.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.goodagiota.clients.CurrencyClient;
import com.example.goodagiota.dtos.loan.LoanDataRequest;
import com.example.goodagiota.dtos.loan.LoanResponse;
import com.example.goodagiota.entities.Loan;
import com.example.goodagiota.entities.User;
import com.example.goodagiota.exceptions.IncompleteRequestException;
import com.example.goodagiota.exceptions.InvalidRequestException;
import com.example.goodagiota.repositories.LoanRepository;
import com.example.goodagiota.repositories.UserRepository;
import com.example.goodagiota.utils.FeesUtils;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CurrencyClient currencyClient;

    public List<LoanResponse> findAll() {
        return loanRepository.findAll().stream()
                .map(loan -> {
                    LocalDate loanDate = loan.getLoanDate().toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();

                    LocalDate dueDate = loan.getDueDate().toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    long monthsBetween = ChronoUnit.MONTHS.between(loanDate, dueDate);
                    Double finalLoanAmount = FeesUtils.calcCompoundFee(
                            loan.getLoanValue().doubleValue(),
                            loan.getLoanRate(),
                            monthsBetween);

                    LoanResponse response = new LoanResponse(loan, finalLoanAmount);
                    return response;
                })
                .toList();
    }

    public Loan create(LoanDataRequest loanRequest) {
        if (loanRequest.getUserId() == null || loanRequest.getUserId().isEmpty()) {
            throw new IncompleteRequestException("Id do usuário não deve ser nulo.");
        }
        if (loanRequest.getCoinCode() == null || loanRequest.getCoinCode().isEmpty()) {
            throw new IncompleteRequestException("Código da moeda não deve ser nulo.");
        }
        if (loanRequest.getLoanRate() == null) {
            throw new IncompleteRequestException("Taxa de empréstimo não deve ser nulo.");
        }
        if (loanRequest.getLoanRate() <= 0) {
            throw new InvalidRequestException("Taxa de empréstimo deve ser maior que zero.");
        }
        if (loanRequest.getLoanDurationInMonths() == null) {
            throw new IncompleteRequestException("Duração do empréstimo não deve ser nula.");
        }
        if (loanRequest.getLoanDurationInMonths() < 1) {
            throw new InvalidRequestException("Duração do empréstimo deve ser de pelo menos 1 mês.");
        }
        if (loanRequest.getLoanDurationInMonths() > 240) {
            throw new InvalidRequestException("Duração do empréstimo não deve passar de 240 meses.");
        }
        if (loanRequest.getLoanValue() == null) {
            throw new IncompleteRequestException("Valor do empréstimo não deve ser nulo.");
        }
        if (loanRequest.getLoanValue() < 1000) {
            throw new InvalidRequestException("Valor do empréstimo deve ser maior que mil.");
        }

        User user = userRepository.findById(loanRequest.getUserId()).orElseThrow(() -> new InvalidRequestException(
                "Id do usuário informado inexistente."));

        LocalDateTime dueDate = LocalDateTime.now().plusMonths(loanRequest.getLoanDurationInMonths());
        Loan newLoan = new Loan();

        Double currencyConversionRate = currencyClient.getCurrencyConversion(loanRequest.getCoinCode()).get(0)
                .getCotacaoVenda();

        newLoan.setCurrencyConversionRate(currencyConversionRate);

        newLoan.setLoanValue(loanRequest.getLoanValue());
        newLoan.setDueDate(Date.from(dueDate.atZone(ZoneId.systemDefault()).toInstant()));
        newLoan.setCoinCode(loanRequest.getCoinCode());
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
            loan.setLoanRate(random.nextDouble(1, 5));

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
