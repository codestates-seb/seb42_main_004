package com.example.server.config;

import com.example.server.auth.filter.JwtAuthenticationFilter;
import com.example.server.auth.filter.JwtVerificationFilter;
import com.example.server.auth.handler.UserAccessDeniedHandler;
import com.example.server.auth.handler.UserAuthenticationEntryPoint;
import com.example.server.auth.handler.UserAuthenticationFailureHandler;
import com.example.server.auth.handler.UserAuthenticationSuccessHandler;
import com.example.server.auth.jwt.JwtTokenizer;
import com.example.server.auth.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

  private final JwtTokenizer jwtTokenizer;
  private final CustomAuthorityUtils authorityUtils;

  public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
    this.jwtTokenizer = jwtTokenizer;
    this.authorityUtils = authorityUtils;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.headers().frameOptions().sameOrigin() // 동일출처만 랜더링
        .and()
        .csrf().disable()
        .cors()
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .formLogin().disable() //폼로그인 비활성화
        .httpBasic().disable() //request 전송때마다 헤더에 name pw 실어서 인증하는 방식 비활성화
        .exceptionHandling()
        .authenticationEntryPoint(new UserAuthenticationEntryPoint())
        .accessDeniedHandler(new UserAccessDeniedHandler())
        .and()
        .apply(new CustomFilterConfigurer())
        .and()
        .authorizeHttpRequests(authorize -> authorize
            // 준성
            .antMatchers(HttpMethod.POST,"/users").permitAll()
            .antMatchers(HttpMethod.PATCH,"/users/recovery").permitAll()
            .antMatchers(HttpMethod.POST,"/users/recovery_email_send").permitAll()
            .antMatchers(HttpMethod.PATCH, "/users/**").hasRole("USER")
            .antMatchers(HttpMethod.GET,"/users/**").hasRole("USER")
            .antMatchers(HttpMethod.POST,"/users/**").hasRole("USER")
            .antMatchers(HttpMethod.DELETE, "/users/**").hasRole("USER")
            // 상혁
            .antMatchers(HttpMethod.POST, "/admin/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.PATCH, "/admin/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.DELETE, "/admin/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.POST, "/users/cart/**").hasRole("USER")
            .antMatchers(HttpMethod.PATCH, "/users/cart/**").hasRole("USER")
            .antMatchers(HttpMethod.GET, "/users/cart/**").hasRole("USER")
            .antMatchers(HttpMethod.DELETE, "/users/cart/**").hasRole("USER")
            // 태양
            .antMatchers(HttpMethod.POST, "/orders").hasRole("USER")
            .antMatchers(HttpMethod.POST, "/payments/prepare").hasRole("USER")
            .antMatchers(HttpMethod.PATCH, "/orders/**").hasRole("USER")
            .antMatchers(HttpMethod.GET, "/orders/**").hasRole("USER")
            .antMatchers(HttpMethod.GET, "/payments/prepare/**").hasRole("USER")
            .antMatchers(HttpMethod.DELETE, "/orders/**").hasRole("USER")

            .anyRequest().permitAll()
        );
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }// 패스워드 인코더 빈 객체 생성

  //TODO 콜스에러 해결
//  @Bean
//  CorsConfigurationSource corsConfigurationSource() {
//    CorsConfiguration configuration = new CorsConfiguration();
//    configuration.setAllowedOrigins(Arrays.asList("*"));
//    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
//
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    source.registerCorsConfiguration("/**", configuration);
//    return source;
//  }
  public class CustomFilterConfigurer extends
      AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)

    @Override
    public void configure(HttpSecurity builder) throws Exception {  // (2-2)
      AuthenticationManager authenticationManager = builder.getSharedObject(
          AuthenticationManager.class);  // (2-3)

      JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(
          authenticationManager, jwtTokenizer);  // (2-4)
      jwtAuthenticationFilter.setAuthenticationFailureHandler(
          new UserAuthenticationFailureHandler()); // 실패 핸들러 적용
      jwtAuthenticationFilter.setAuthenticationSuccessHandler(
          new UserAuthenticationSuccessHandler()); // 성공 핸들러 적용

      JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);


      builder.addFilter(jwtAuthenticationFilter)  // (2-6)
          .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);

    }
  }

}
