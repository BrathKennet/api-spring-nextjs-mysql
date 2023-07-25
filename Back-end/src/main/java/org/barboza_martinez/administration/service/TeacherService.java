package org.barboza_martinez.administration.service;

import org.barboza_martinez.administration.model.TeacherModel;
import org.barboza_martinez.administration.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

/**
 * Servicio que maneja la lógica de negocio relacionada con los docentes.
 */
@Service
public class TeacherService {

    @Autowired
    TeacherRepository teacherRepository; // Inyección de dependencia del repositorio de docentes

    /**
     * Obtiene todos los docentes de la base de datos.
     *
     * @return Lista de docentes encontrados.
     */
    public ArrayList<TeacherModel> getTeachers() {
        return (ArrayList<TeacherModel>) teacherRepository.findAll();
    }

    /**
     * Obtiene un docente único por su ID.
     *
     * @param id ID del docente a buscar.
     * @return Objeto Optional que contiene el docente si se encuentra, o un Optional vacío si no.
     */
    public Optional<TeacherModel> getUniqueTeacher(Long id) {
        return teacherRepository.findById(id);
    }

    /**
     * Guarda un docente en la base de datos.
     *
     * @param teacherModel docente a guardar.
     * @return El docente guardado.
     */
    public TeacherModel saveTeacher(TeacherModel teacherModel) {
        return teacherRepository.save(teacherModel);
    }

    /**
     * Actualiza un docente existente por su ID, aplicando los cambios de los campos modificados.
     *
     * @param id ID del docente a actualizar.
     * @param updatedTeacher Docente con los campos actualizados.
     * @return El docente actualizado.
     * @throws IllegalArgumentException Si no se encuentra el docente con el ID proporcionado.
     */
    public TeacherModel updateTeacher(Long id, TeacherModel updatedTeacher) {
        Optional<TeacherModel> existingTeacherOptional = teacherRepository.findById(id);

        if (existingTeacherOptional.isPresent()) {
            TeacherModel existingTeacher = existingTeacherOptional.get();

            // Aplica los cambios de los campos modificados
            if (updatedTeacher.getName() != null) {
                existingTeacher.setName(updatedTeacher.getName());
            }
            if (updatedTeacher.getSurname() != null) {
                existingTeacher.setSurname(updatedTeacher.getSurname());
            }
            if (updatedTeacher.getEmail() != null) {
                existingTeacher.setEmail(updatedTeacher.getEmail());
            }
            if (updatedTeacher.getCourse() != null) {
                existingTeacher.setCourse(updatedTeacher.getCourse());
            }
            if (updatedTeacher.getDateInitial() != null) {
                existingTeacher.setDateInitial(updatedTeacher.getDateInitial());
            }
            if (updatedTeacher.getState() != null) {
                existingTeacher.setState(updatedTeacher.getState());
            }
            return teacherRepository.save(existingTeacher);
        } else {
            throw new IllegalArgumentException("No se encontró el maestro con el ID proporcionado: " + id);
        }
    }

    /**
     * Elimina un docente de la base de datos por su ID.
     *
     * @param id ID del docente a eliminar.
     * @return True si se elimina correctamente, False si ocurre algún error.
     */
    public boolean deleteTeacher(Long id) {
        try {
            teacherRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }

}
