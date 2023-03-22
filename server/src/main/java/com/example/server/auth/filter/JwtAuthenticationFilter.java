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
import org.springframework.http.ResponseCookie;
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

  // (3) 메서드 내부에서 인증을 시도하는 로직
  @SneakyThrows
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
      HttpServletResponse response) {

    ObjectMapper objectMapper = new ObjectMapper();    // (3-1)
    LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // (3-2)

    // (3-3)
    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

    return authenticationManager.authenticate(authenticationToken);  // (3-4)
  }

  // 클라이언트의 인증 정보를 이용해 인증에 성공할 경우 호출
  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain, Authentication authResult) throws IOException, ServletException {
    User user = (User) authResult.getPrincipal(); // (4-1)

    String accessToken = delegateAccessToken(user);
    String refreshToken = delegateRefreshToken(user);

    //쿠키에 토큰 실어서 보내기
    ResponseCookie accessCookie =
        ResponseCookie.from("Authorization", accessToken)
            .path("/")
            .sameSite("None")
            .httpOnly(false)
            .build();
    response.addHeader("Set-Cookie", accessCookie.toString());

    ResponseCookie refreshCookie =
        ResponseCookie.from("Refresh", refreshToken)
            .path("/")
            .sameSite("None")
            .httpOnly(false)
            .build();
    response.addHeader("Set-Cookie", refreshCookie.toString());

//    Cookie refreshCookie = new Cookie("Refresh", refreshToken);
//    refreshCookie.setPath("/");
//    refreshCookie.setMaxAge(30 * 60);
//    response.addCookie(refreshCookie);

    //헤더에 토큰 실어서 보내기
//    response.setHeader("Authorization", "Bearer " + accessToken);
//    response.setHeader("Refresh", refreshToken);

    this.getSuccessHandler()
        .onAuthenticationSuccess(request, response, authResult); // 핸들러 불러옴 (실패 핸들러는 자동호출됨)
  }

  // (5)
  private String delegateAccessToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    PrincipalDto principal = PrincipalDto.builder().id(user.getId()).email(user.getEmail())
        .name(user.getName()).build();
    claims.put("username", user.getEmail());
    claims.put("roles", user.getRoles());
    claims.put("principal", principal);
    log.info("###### principal = {} ", principal);

    String subject = user.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getAccessTokenExpirationMinutes());

    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration,
        base64EncodedSecretKey);

    return accessToken;
  }

  // (6)
  private String delegateRefreshToken(User user) {
    String subject = user.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getRefreshTokenExpirationMinutes());
    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,
        base64EncodedSecretKey);

    return refreshToken;
  }

}
