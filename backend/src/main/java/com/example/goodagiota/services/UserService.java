package com.example.goodagiota.services;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.goodagiota.dtos.user.UserDataRequest;
import com.example.goodagiota.entities.User;
import com.example.goodagiota.exceptions.IncompleteRequestException;
import com.example.goodagiota.exceptions.InvalidRequestException;
import com.example.goodagiota.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User create(UserDataRequest userRequest) {
        if (userRequest.getName() == null || userRequest.getName().isEmpty()) {
            throw new IncompleteRequestException("Nome do usuário não deve ser nulo.");
        }
        if (userRequest.getPhone() == null || userRequest.getPhone().isEmpty()) {
            throw new IncompleteRequestException("Telefone do usuário não deve ser nulo.");
        }
        if (userRequest.getPhone().length() != 11) {
            throw new InvalidRequestException("Telefone do usuário deve conter 11 dígitos.");
        }
        if (StringUtils.isNumeric(userRequest.getPhone()) == false) {
            throw new InvalidRequestException("Telefone do usuário deve conter apenas dígitos.");
        }

        User newUser = new User(userRequest.getName(), userRequest.getPhone());
        return userRepository.save(newUser);
    }

    public User update(String userId, UserDataRequest userRequest) {
        String newPhone = null;
        if (userRequest.getPhone() != null && !userRequest.getPhone().isEmpty()) {
            if (userRequest.getPhone().length() != 11) {
                throw new InvalidRequestException("Telefone do usuário deve conter 11 dígitos.");
            }
            if (StringUtils.isNumeric(userRequest.getPhone()) == false) {
                throw new InvalidRequestException("Telefone do usuário deve conter apenas dígitos.");
            }

            newPhone = userRequest.getPhone();
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidRequestException("Id do usuário informado inexistente."));

        if (newPhone != null)
            user.setPhone(newPhone);

        if (userRequest.getName() != null && !userRequest.getName().isEmpty())
            user.setName(userRequest.getName());

        user.setUpdatedDate(new Date());
        return userRepository.save(user);
    }

    public void delete(String userId) {
        userRepository.deleteById(userId);
    }
}
