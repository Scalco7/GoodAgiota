package com.example.goodagiota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.goodagiota.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
}
