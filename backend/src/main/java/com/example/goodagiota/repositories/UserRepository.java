package com.example.goodagiota.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.goodagiota.dtos.user.UserResponse;
import com.example.goodagiota.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT COUNT(DISTINCT u) " +
            "FROM User u JOIN u.loans l " +
            "WHERE l.paid = false")
    Long countUsersWithUnpaidLoans();

    @Query(value = """
            SELECT
                u.id,
                u.name,
                u.phone,
                CASE
                    WHEN SUM(CASE WHEN l.paid = false AND l.due_date < CURRENT_DATE THEN 1 ELSE 0 END) > 0
                        THEN 'owing'
                    WHEN SUM(CASE WHEN l.paid = false AND l.due_date >= CURRENT_DATE THEN 1 ELSE 0 END) > 0
                        THEN 'paying'
                    ELSE 'no_debt'
                END AS status
            FROM users u
            LEFT JOIN loans l ON l.user_id = u.id
            GROUP BY u.id, u.name, u.phone
            """, nativeQuery = true)
    List<UserResponse> findAllUsersWithStatus();
}
