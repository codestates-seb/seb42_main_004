package com.example.server.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.example.server.auth.filter.JwtAuthenticationFilter;
import com.example.server.auth.jwt.JwtTokenizer;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {
  private final JwtTokenizer jwtTokenizer;

  public SecurityConfiguration(JwtTokenizer jwtTokenizer) {
    this.jwtTokenizer = jwtTokenizer;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.headers().frameOptions().sameOrigin() // 동일출처만 랜더링
        .and()
        .csrf().disable()
        .cors(withDefaults())
        .formLogin().disable() //폼로그인 비활성화
        .httpBasic().disable() //request 전송때마다 헤더에 name pw 실어서 인증하는 방식 비활성화
        .apply(new CustomFilterConfigurer())
        .and()
        .authorizeHttpRequests(authorize -> authorize
            .anyRequest().permitAll()
        );
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }// 패스워드 인코더 빈 객체 생성

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
  public class CustomFilterConfigurer extends
      AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
    @Override
    public void configure(HttpSecurity builder) throws Exception {  // (2-2)
      AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

      JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);  // (2-4)
//      jwtAuthenticationFilter.setFilterProcessesUrl("/v11/auth/login");          // (2-5)
//TODO default login request URL 변경?
      builder.addFilter(jwtAuthenticationFilter);  // (2-6)
    }
  }

}
