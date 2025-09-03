package com.recipevault.config;

import java.util.Collection;

import javax.security.sasl.AuthorizeCallback;

import org.aspectj.weaver.patterns.HasThisTypePatternTriedToSneakInSomeGenericOrParameterizedTypePatternMatchingStuffAnywhereVisitor;
import java.util.Collections;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties.Management;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfAuthenticationStrategy;
import org.springframework.web.cors.CorsConfiguration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
    	http.sessionManagement(management -> management.sessionCreationPolicy(
    			SessionCreationPolicy.STATELESS) )
    			.authorizeHttpRequests(
    					AuthorizeCallback -> AuthorizeCallback.requestMatchers("/api/**").authenticated()
    					.anyRequest().permitAll())
    			.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
    			.csrf(csrf -> csrf.disable())
    			.cors(cors -> cors.configurationSource(CorsConfigurationSource()))
    			.formLogin(withDefaults());
    	
    	return http.build();
    }
    
    private CorsConfigurationSource CorsConfigurationSource() {
		
		return new CorsConfigurationSource() {
			
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				
				CorsConfiguration cfg=new CorsConfiguration();
				cfg.setAllowedOrigins(Collections.singletonList("*"));
				cfg.setAllowedMethods(Collections.singletonList("*"));
				cfg.setAllowedHeaders(Collections.singletonList("*"));
				cfg.setAllowedHeaders(Collections.singletonList("*"));
				cfg.setMaxAge(3600L);
				return cfg;
			}
		};
	}

    @Bean
    public PasswordEncoder passwordEncoder() {
    	return new BCryptPasswordEncoder();
    }
	
}
