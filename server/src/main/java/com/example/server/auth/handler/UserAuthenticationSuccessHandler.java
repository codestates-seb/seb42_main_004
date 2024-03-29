package com.example.server.auth.handler;

import com.example.server.user.entity.User;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

// 로그인 인증 성공 시 추가작업 구현
@Slf4j
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    Gson gson = new Gson();

    log.info("# Authenticated successfully!");

    String authorities = gson.toJson(authentication.getAuthorities());
    String principal = gson.toJson((User) authentication.getPrincipal());
    sendUserInfoResponse(response, authorities, principal);

  }

  private void sendUserInfoResponse(HttpServletResponse response, String authorities, String principal) throws IOException {

    response.setContentType(MediaType.APPLICATION_JSON_VALUE);    // (2-3)
    response.setStatus(HttpStatus.OK.value());

    response.getWriter().write(principal);   // (2-5)
  }


}
