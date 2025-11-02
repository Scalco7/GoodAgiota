package com.example.goodagiota.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.goodagiota.dtos.ApiResponse;
import com.example.goodagiota.dtos.loan.LoanDataRequest;
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
    public ResponseEntity<ApiResponse<List<Loan>>> findAll() {
        List<Loan> list = service.findAll();
        ApiResponse<List<Loan>> response = new ApiResponse<>(list);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Cria um empréstimo")
    @PostMapping()
    public ResponseEntity<ApiResponse<Loan>> create(@RequestBody LoanDataRequest loanRequest) {
        Loan user = service.create(loanRequest);
        ApiResponse<Loan> response = new ApiResponse<>(user);
        return ResponseEntity.ok().body(response);
    }
}
