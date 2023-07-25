package org.barboza_martinez.administration.service;

import org.barboza_martinez.administration.model.UserModel;
import org.barboza_martinez.administration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Servicio que maneja la lógica relacionada con los usuarios.
 */
@Service
public class UserService {
    @Autowired
    UserRepository userRepository; // Inyección de dependencia del repositorio de usuarios

    @Autowired
    PasswordEncoder passwordEncoder; // Inyección de dependencia del codificador de contraseñas

    /**
     * Verifica si las credenciales de inicio de sesión son válidas y retorna el usuario si es correcto.
     *
     * @param email    El email del usuario que quiere iniciar sesión.
     * @param password La contraseña proporcionada por el usuario.
     * @return Un Optional que contiene el UserModel del usuario si las credenciales son válidas,
     *         o un Optional vacío si las credenciales son inválidas.
     */
    public Optional<UserModel> loginUser(String email, String password) {

        Optional<UserModel> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            return userOptional; // Retorna el usuario encontrado
        } else {
            return Optional.empty(); // Retorna un Optional vacío si no se encontró el usuario o las contraseñas no coinciden
        }
    }

    /**
     * Registra un nuevo usuario en la base de datos si el email no está registrado previamente.
     *
     * @param userModel El UserModel del nuevo usuario a registrar.
     * @return El UserModel del usuario registrado, o null si el email ya está registrado.
     */
    public UserModel signInUser(UserModel userModel) {

        Optional<UserModel> userOptional = userRepository.findByEmail(userModel.getEmail());

        if (userOptional.isPresent()) {
            return null;
        } else {
            String encryptedPassword = passwordEncoder.encode(userModel.getPassword());
            userModel.setPassword(encryptedPassword);
            userModel.setToken(generateAccessToken());
            return userRepository.save(userModel);
        }
    }

    /**
     * Valida un token de acceso generado previamente para un usuario.
     *
     * @param token El token de acceso a validar.
     * @return true si el token es válido y corresponde a un usuario registrado, false en caso contrario.
     */
    public boolean validateToken(String token) {
        Optional<UserModel> userOptional = userRepository.findByToken(token);

        return userOptional.isPresent();
    }

    /**
     * Genera un nuevo token de acceso aleatorio utilizando el estándar UUID.
     *
     * @return Un String que representa el token de acceso generado.
     */
    public String generateAccessToken() {
        return UUID.randomUUID().toString();
    }
}
