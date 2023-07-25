package org.barboza_martinez.administration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal que inicia la aplicación de administración.
 */
@SpringBootApplication
public class AdministrationApplication {

	/**
	 * Método main que inicia la aplicación.
	 * @param args Argumentos de línea de comandos (no se utilizan en esta aplicación).
	 */
	public static void main(String[] args) {
		SpringApplication.run(AdministrationApplication.class, args);
	}

}
