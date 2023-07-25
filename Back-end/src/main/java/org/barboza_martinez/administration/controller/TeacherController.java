package org.barboza_martinez.administration.controller;

import org.barboza_martinez.administration.model.TeacherModel;

import org.barboza_martinez.administration.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

/**
 * Controlador para las operaciones relacionadas con los docentes (teachers).
 * Los endpoints en este controlador se utilizan para obtener, crear, actualizar y eliminar docentes.
 */
@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    TeacherService teacherService; // Inyección de dependencia del servicio de docentes

    /**
     * Obtiene todos los docentes existentes en la base de datos.
     * @return ArrayList de objetos TeacherModel que representan a los docentes.
     */
    @GetMapping
    public ArrayList<TeacherModel> getTeachers () {
        return teacherService.getTeachers();
    }

    /**
     * Obtiene un docente específico según el ID proporcionado.
     * @param id ID del docente que se desea obtener.
     * @return Un objeto TeacherModel si se encontró el docente, de lo contrario un Optional vacío.
     */
    @GetMapping("/{id}")
    public Optional<TeacherModel> getUniqueTeacher (@PathVariable("id") Long id) {
        return teacherService.getUniqueTeacher(id);
    }

    /**
     * Guarda un nuevo docente en la base de datos.
     * @param teacherModel Objeto TeacherModel que contiene la información del nuevo docente.
     * @return El docente guardado en la base de datos.
     */
    @PostMapping()
    public TeacherModel saveTeacher (@RequestBody TeacherModel teacherModel) {
        return teacherService.saveTeacher(teacherModel);
    }

    /**
     * Actualiza la información de un docente existente en la base de datos.
     * @param id ID del docente que se desea actualizar.
     * @param teacherModel Objeto TeacherModel que contiene la información actualizada del docente.
     * @return El docente actualizado en la base de datos.
     */
    @PatchMapping("/{id}")
    public TeacherModel updateTeacher(@PathVariable("id") Long id, @RequestBody TeacherModel teacherModel) {
        return teacherService.updateTeacher(id, teacherModel);
    }

    /**
     * Elimina un docente existente de la base de datos.
     * @param id ID del docente que se desea eliminar.
     * @return ResponseEntity que indica si la eliminación fue exitosa o si ocurrió un error interno del servidor.
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable("id") Long id) {
        boolean delete = teacherService.deleteTeacher(id);
        if (delete) {
            return ResponseEntity.ok().build(); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Error interno del servidor
        }
    }
}
