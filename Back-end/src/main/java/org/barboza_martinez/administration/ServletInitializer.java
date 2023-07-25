package org.barboza_martinez.administration;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Clase que extiende SpringBootServletInitializer y permite la configuración del Servlet de inicialización.
 */
public class ServletInitializer extends SpringBootServletInitializer {

	/**
	 * Método para configurar la aplicación Spring Boot cuando se despliega como un servlet en un contenedor web externo.
	 * @param application El SpringApplicationBuilder que se utilizará para configurar la aplicación.
	 * @return El SpringApplicationBuilder configurado con la clase principal de la aplicación (AdministrationApplication).
	 */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AdministrationApplication.class);
	}

}
