package org.barboza_martinez.administration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Configuración de seguridad para la aplicación.
 */
@Configuration
public class WebSecurityConfig {

    // Clave secreta para firmar y verificar tokens JWT
    private static final String SECRET_KEY = "Bos45UiaYF2S";

    /**
     * Configura las reglas de seguridad HTTP para la aplicación.
     * @param http Objeto HttpSecurity utilizado para configurar las reglas de seguridad.
     * @param authManager Gestor de autenticación utilizado para la autenticación de usuarios.
     * @return SecurityFilterChain con las configuraciones de seguridad aplicadas.
     * @throws Exception Si ocurre algún error al configurar la seguridad.
     */
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        return http
                .csrf().disable()
                .addFilterBefore(corsFilter(), UsernamePasswordAuthenticationFilter.class) // Agregar CorsFilter antes de UsernamePasswordAuthenticationFilter
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .build();
    }

    /**
     * Crea un objeto UserDetailsService con usuarios en memoria para la autenticación.
     * @return UserDetailsService con los usuarios en memoria.
     */
    @Bean
    UserDetailsService userDetailsService() {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(User.withUsername("admin")
                .password(passwordEncoder().encode("admin"))
                .roles()
                .build());
        return manager;
    }

    /**
     * Configura el AuthenticationManager para la autenticación de usuarios.
     * @param http Objeto HttpSecurity utilizado para configurar la autenticación.
     * @return AuthenticationManager configurado para la autenticación.
     * @throws Exception Si ocurre algún error al configurar la autenticación.
     */
    @Bean
    AuthenticationManager authManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService())
                .passwordEncoder(passwordEncoder())
                .and()
                .build();

    }

    /**
     * Crea un filtro CorsFilter para permitir solicitudes desde http://localhost:3000.
     * @return CorsFilter configurado para permitir solicitudes desde http://localhost:3000.
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000"); // Permitir solicitudes desde http://localhost:3000
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    /**
     * Crea un PasswordEncoder para encriptar contraseñas.
     * @return PasswordEncoder para encriptar contraseñas.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Obtiene la clave secreta utilizada para firmar y verificar tokens JWT.
     * @return Clave secreta utilizada para tokens JWT.
     */
    @Bean
    public String secretKey() {
        return SECRET_KEY;
    }

}
