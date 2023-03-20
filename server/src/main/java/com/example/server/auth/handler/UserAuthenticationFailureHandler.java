package com.example.server.auth.handler;

import com.example.server.dto.ErrorResponseDto;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException, ServletException {

    log.error("# Authentication failed: {}", exception.getMessage());



    sendErrorResponse(response);
  }

  private void sendErrorResponse(HttpServletResponse response) throws IOException {
    Gson gson = new Gson();
    ErrorResponseDto errorResponseDto = ErrorResponseDto.of(HttpStatus.UNAUTHORIZED);
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);    // (2-3)
    response.setStatus(HttpStatus.UNAUTHORIZED.value());          // (2-4)

    response.getWriter().write(gson.toJson(errorResponseDto, ErrorResponseDto.class));   // (2-5)
  }
}
