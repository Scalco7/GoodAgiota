package com.example.goodagiota.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.goodagiota.dtos.ApiResponse;
import com.example.goodagiota.dtos.user.CreateUserRequest;
import com.example.goodagiota.entities.User;
import com.example.goodagiota.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(value = "/users")
@Tag(name = "Usuários", description = "Endpoints relacionados à gestão de usuários.")
public class UserResource {
    @Autowired
    private UserService service;

    @Operation(summary = "Listar todos os conteúdos", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Lista de usuários retornada com sucesso.", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json", schema = @Schema(implementation = User.class)))
    })

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> findAll() {
        List<User> list = service.findAll();
        ApiResponse<List<User>> response = new ApiResponse<>(list);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping()    
    public ResponseEntity<ApiResponse<User>> create(@RequestBody CreateUserRequest userRequest) {
        User user = service.create(userRequest);
        ApiResponse<User> response = new ApiResponse<>(user);
        return ResponseEntity.ok().body(response);
    }
}
