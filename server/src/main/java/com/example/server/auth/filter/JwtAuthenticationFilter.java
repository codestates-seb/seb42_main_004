package com.example.server.auth.filter;

import com.example.server.auth.dto.LoginDto;
import com.example.server.auth.dto.PrincipalDto;
import com.example.server.auth.jwt.JwtTokenizer;
import com.example.server.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenizer jwtTokenizer;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
      JwtTokenizer jwtTokenizer) {
    this.authenticationManager = authenticationManager;
    this.jwtTokenizer = jwtTokenizer;
  }
  // (3)
  @SneakyThrows
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

    ObjectMapper objectMapper = new ObjectMapper();    // (3-1)
    LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // (3-2)

    // (3-3)
    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

    return authenticationManager.authenticate(authenticationToken);  // (3-4)
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain, Authentication authResult) throws IOException, ServletException {
    User user = (User) authResult.getPrincipal();

    String accessToken = delegateAccessToken(user);
    String refreshToken = delegateRefreshToken(user);

    response.setHeader("Authorization", "Bearer " + accessToken);
    response.setHeader("Refresh", refreshToken);
  }

  // (5)
  private String delegateAccessToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    PrincipalDto principal = PrincipalDto.builder().id(user.getId()).email(user.getEmail()).name(user.getName()).build();
    claims.put("username", user.getEmail());
    claims.put("roles", user.getRoles());
    claims.put("principal", principal);
    log.info("principal = {} ", principal);
    log.info("###### principal = {}", claims.get("principal").getClass());

    String subject = user.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

    return accessToken;
  }

  // (6)
  private String delegateRefreshToken(User user) {
    String subject = user.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

    return refreshToken;
  }
  
}