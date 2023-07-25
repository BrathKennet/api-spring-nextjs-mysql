package org.barboza_martinez.administration.repository;

import org.barboza_martinez.administration.model.TeacherModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de datos para la entidad TeacherModel.
 * <p>
 * Esta interfaz proporciona métodos para realizar operaciones de acceso a datos
 * relacionadas con la entidad TeacherModel en la base de datos.
 */
@Repository
public interface TeacherRepository extends CrudRepository<TeacherModel, Long> {
    // No es necesario definir métodos adicionales aquí, ya que CrudRepository
    // proporciona métodos para realizar operaciones básicas de acceso a datos.
}
