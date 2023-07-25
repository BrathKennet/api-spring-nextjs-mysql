package org.barboza_martinez.administration.controller;

import org.barboza_martinez.administration.model.UserModel;
import org.barboza_martinez.administration.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

/**
 * Controlador para las operaciones relacionadas con usuarios.
 * Los endpoints en este controlador se utilizan para autenticar, registrar, refrescar y cerrar sesión de usuarios.
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService; // Inyección de dependencia del servicio de usuarios

    /**
     * Endpoint para el inicio de sesión de un usuario.
     *
     * @param userModel Objeto UserModel que contiene el email y la contraseña del usuario a autenticar.
     * @return El accessToken generado si el inicio de sesión es exitoso, o null si no se encuentra el usuario o las credenciales son incorrectas.
     */
    @PostMapping("/login")
    public String loginUser(@RequestBody UserModel userModel) {
        String email = userModel.getEmail();
        String password = userModel.getPassword();

        // Llama al método de login del UserService
        Optional<UserModel> userOptional = userService.loginUser(email, password);

        // Si se encontró el usuario, genera y devuelve el accessToken
        // Si no se encontró el usuario devuelve null
        return userOptional.map(UserModel::getToken).orElse(null);
    }

    /**
     * Endpoint para el registro de un nuevo usuario.
     *
     * @param userModel Objeto UserModel que contiene los datos del nuevo usuario a registrar.
     * @return El accessToken generado si el registro es exitoso, o null si ya existe un usuario con el mismo email.
     */
    @PostMapping("/sign_in")
    public String signInUser (@RequestBody UserModel userModel){
        UserModel userOptional = userService.signInUser(userModel);

        if (userOptional != null){
            return userOptional.getToken();
        } else {
            return null;
        }
    }

    /**
     * Endpoint para el cierre de sesión de un usuario.
     *
     * @return Mensaje de éxito de cierre de sesión.
     */
    @PostMapping("/logout")
    public String logoutUser() {
        return "Usuario desconectado exitosamente.";
    }

    /**
     * Endpoint para validar un accessToken.
     *
     * @param requestBody Map que contiene el campo "token" con el accessToken a validar.
     * @return True si el accessToken es válido, False si no es válido.
     */
    @PostMapping("/refresh")
    public boolean refresh (@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        return userService.validateToken(token);
    }
}
