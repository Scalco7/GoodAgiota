package com.example.goodagiota.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

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

    public void mockData() {
        Random random = new Random();

        List<String> userNames = List.of(
                "Ana", "Bruno", "Carla", "Daniel", "Eduardo",
                "Fernanda", "Gabriel", "Helena", "Igor", "Juliana",
                "Lucas", "Mariana", "Nathalia", "Otávio", "Paula",
                "Rafael", "Sabrina", "Tiago", "Vanessa", "William",
                "Yasmin", "Zeca", "Alice", "Breno", "Camila",
                "Diego", "Elisa", "Felipe", "Gustavo", "Heloísa",
                "Isabela", "João", "Karen", "Leonardo", "Márcia",
                "Natália", "Pedro", "Renata", "Samuel", "Tatiana",
                "Vitor", "Wellington", "Yara", "Zuleica", "Amanda",
                "Bruna", "Caio", "Débora", "Enzo", "Fabiana");

        List<String> userLastNames = List.of(
                "Silva", "Santos", "Oliveira", "Souza", "Lima",
                "Pereira", "Ferreira", "Almeida", "Costa", "Gomes",
                "Ribeiro", "Martins", "Carvalho", "Rocha", "Dias",
                "Nunes", "Araújo", "Barbosa", "Mendes", "Freitas");

        List<String> userPhones = List.of("41987654321", "41991234567", "41993456789", "41999887766", "41990123456",
                "41998765432", "41994561238", "41997654321", "41992345678", "41995432109");

        List<User> users = new ArrayList<>();

        for (int i = 0; i < 50; i++) {
            User user = new User();
            Boolean hasThreeNames = random.nextBoolean();

            List<String> name = new ArrayList<>();
            name.add(userNames.get(random.nextInt(userNames.size())));
            name.add(userLastNames.get(random.nextInt(userLastNames.size())));

            if (hasThreeNames)
                name.add(userLastNames.get(random.nextInt(userLastNames.size())));

            user.setName(String.join(" ", name));

            String phone = userPhones.get(random.nextInt(userPhones.size()));
            user.setPhone(phone);

            users.add(user);
        }

        userRepository.saveAll(users);
    }
}
