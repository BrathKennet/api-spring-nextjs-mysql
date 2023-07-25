package org.barboza_martinez.administration.repository;

import org.barboza_martinez.administration.model.UserModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio de datos para la entidad UserModel.
 * <p>
 * Esta interfaz proporciona métodos para realizar operaciones de acceso a datos
 * relacionadas con la entidad UserModel en la base de datos.
 */
@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {

    /**
     * Busca un UserModel en la base de datos por su dirección de correo electrónico.
     *
     * @param email Dirección de correo electrónico del UserModel a buscar.
     * @return Un objeto Optional que contiene el UserModel encontrado (si existe).
     */
    Optional<UserModel> findByEmail(String email);

    /**
     * Busca un UserModel en la base de datos por su token.
     *
     * @param token Token del UserModel a buscar.
     * @return Un objeto Optional que contiene el UserModel encontrado (si existe).
     */
    Optional<UserModel> findByToken(String token);

    // No es necesario definir métodos adicionales aquí, ya que CrudRepository
    // proporciona métodos para realizar operaciones básicas de acceso a datos.
}
