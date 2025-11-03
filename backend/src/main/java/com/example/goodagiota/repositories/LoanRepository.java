package com.example.goodagiota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.goodagiota.entities.Loan;

@Repository
public interface LoanRepository extends JpaRepository<Loan, String> {

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.paid = true")
    Long countPaidLoans();

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.paid = false")
    Long countUnpaidLoans();
}
