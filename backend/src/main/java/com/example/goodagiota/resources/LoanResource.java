package com.example.goodagiota.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.goodagiota.dtos.ApiResponse;
import com.example.goodagiota.dtos.loan.LoanDataRequest;
import com.example.goodagiota.dtos.loan.LoanResponse;
import com.example.goodagiota.entities.Loan;
import com.example.goodagiota.services.LoanService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/loans")
@Tag(name = "Empréstimos", description = "Endpoints relacionados à gestão de empréstimos.")
public class LoanResource {
    @Autowired
    private LoanService service;

    @Operation(summary = "Lista todos os empréstimos")
    @GetMapping
    public ResponseEntity<ApiResponse<List<LoanResponse>>> findAll() {
        List<LoanResponse> list = service.findAll();
        ApiResponse<List<LoanResponse>> response = new ApiResponse<>(list);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Cria um empréstimo")
    @PostMapping()
    public ResponseEntity<ApiResponse<Loan>> create(@RequestBody LoanDataRequest loanRequest) {
        Loan loan = service.create(loanRequest);
        ApiResponse<Loan> response = new ApiResponse<>(loan);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Paga o empréstimo")
    @PostMapping("/pay/{loanId}")
    public ResponseEntity<ApiResponse<Loan>> payLoan(@PathVariable String loanId) {
        Loan loan = service.payLoan(loanId);
        ApiResponse<Loan> response = new ApiResponse<>(loan);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Mocka dados de empréstimos")
    @PostMapping("/mock")
    public ResponseEntity<ApiResponse<String>> mockData() {
        service.mockData();
        ApiResponse<String> response = new ApiResponse<>(null);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Retorna a quantidade de empréstimos pagos")
    @GetMapping("/quantity/paid-loans")
    public ResponseEntity<ApiResponse<Long>> getQuantityOfPaidLoans() {
        Long quantity = service.getQuantityOfPaidLoans();
        ApiResponse<Long> response = new ApiResponse<>(quantity);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Retorna a quantidade de empréstimos não pagos")
    @GetMapping("/quantity/unpaid-loans")
    public ResponseEntity<ApiResponse<Long>> getQuantityOfUnpaidLoans() {
        Long quantity = service.getQuantityOfUnpaidLoans();
        ApiResponse<Long> response = new ApiResponse<>(quantity);
        return ResponseEntity.ok().body(response);
    }
}
