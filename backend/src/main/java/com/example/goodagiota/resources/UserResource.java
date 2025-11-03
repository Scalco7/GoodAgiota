package com.example.goodagiota.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.goodagiota.dtos.ApiResponse;
import com.example.goodagiota.dtos.user.UserDataRequest;
import com.example.goodagiota.entities.User;
import com.example.goodagiota.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/users")
@Tag(name = "Usuários", description = "Endpoints relacionados à gestão de usuários.")
public class UserResource {
    @Autowired
    private UserService service;

    @Operation(summary = "Lista todos os usuários")
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> findAll() {
        List<User> list = service.findAll();
        ApiResponse<List<User>> response = new ApiResponse<>(list);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Cria um usuário")
    @PostMapping()
    public ResponseEntity<ApiResponse<User>> create(@RequestBody UserDataRequest userRequest) {
        User user = service.create(userRequest);
        ApiResponse<User> response = new ApiResponse<>(user);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Atualiza os dados de um usuário")
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> update(@PathVariable String userId,
            @RequestBody UserDataRequest userRequest) {
        User user = service.update(userId, userRequest);
        ApiResponse<User> response = new ApiResponse<>(user);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Apaga um usuário")
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable String userId) {
        service.delete(userId);
        ApiResponse<String> response = new ApiResponse<>(null);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Mocka dados de usuários")
    @PostMapping("/mock")
    public ResponseEntity<ApiResponse<String>> mockData() {
        service.mockData();
        ApiResponse<String> response = new ApiResponse<>(null);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Retorna a quantidade de usuários com empréstimos não pagos")
    @GetMapping("/users-quantity/unpaid-loans")
    public ResponseEntity<ApiResponse<Long>> getQuantityOfUsersWithUnpaidLoans() {
        Long quantity = service.getQuantityOfUsersWithUnpaidLoans();
        ApiResponse<Long> response = new ApiResponse<>(quantity);
        return ResponseEntity.ok().body(response);
    }
}
