package com.example.goodagiota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.goodagiota.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT COUNT(DISTINCT u) " +
            "FROM User u JOIN u.loans l " +
            "WHERE l.paid = false")
    Long countUsersWithUnpaidLoans();
}
