package org.barboza_martinez.administration.model;

import jakarta.persistence.*;

/**
 * Modelo que representa a un usuario en el sistema.
 * <p>
 * Esta clase define los campos necesarios para almacenar la información de un usuario,
 * incluyendo su correo electrónico, contraseña y token utilizado para la autenticación.
 * El ID del usuario es generado automáticamente en la base de datos.
 */
@Entity
@Table(name = "user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true,nullable = false)
    private int id; // Campo para almacenar el ID del usuario, generado automáticamente en la base de datos

    private String email; // Campo para almacenar el correo electrónico del usuario
    private String password; // Campo para almacenar la contraseña del usuario
    private String token; // Campo para almacenar el token del usuario, utilizado para la autenticación

    // Métodos getter y setter para el campo 'id'
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Métodos getter y setter para el campo 'email'
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Métodos getter y setter para el campo 'password'
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Métodos getter y setter para el campo 'token'
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
