package org.barboza_martinez.administration.model;

import jakarta.persistence.*;

/**
 * Modelo que representa a un docente en el sistema.
 * <p>
 * Esta clase define los campos necesarios para almacenar la información de un docente,
 * incluyendo su nombre, apellido, correo electrónico, curso asignado, fecha de inicio
 * de curso y estado del docente.
 * El ID del profesor es generado automáticamente en la base de datos.
 */
@Entity
@Table(name = "teacher")
public class TeacherModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private int id; // Campo para almacenar el ID del docente, generado automáticamente en la base de datos
    private String name; // Campo para almacenar el nombre del docente
    private String surname; // Campo para almacenar el apellido del docente
    private String email; // Campo para almacenar el correo electrónico del docente
    private String course; // Campo para almacenar el curso asignado del docente
    private String dateInitial; // Campo para almacenar la fecha de inicio del docente
    private String state; // Campo para almacenar el estado del docente

    // Métodos getter y setter para el campo 'id'
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Métodos getter y setter para el campo 'name'
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Métodos getter y setter para el campo 'surname'
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    // Métodos getter y setter para el campo 'email'
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Métodos getter y setter para el campo 'course'
    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    // Métodos getter y setter para el campo 'dateInitial'
    public String getDateInitial() {
        return dateInitial;
    }

    public void setDateInitial(String dateInitial) {
        this.dateInitial = dateInitial;
    }

    // Métodos getter y setter para el campo 'state'
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
