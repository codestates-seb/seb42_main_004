package com.example.server.auth.handler;

import com.example.server.auth.utils.ErrorResponder;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

  //AuthenticationEntryPoint 클래스는 인증 과정에서 AuthenticationException 이 발생할 경우 호출되며, 처리하고자 하는 로직을 commence() 메서드에 구현
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException, ServletException {
    Exception exception = (Exception) request.getAttribute("exception");
    ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);

    logExceptionMessage(authException, exception);
  }

  private void logExceptionMessage(AuthenticationException authException, Exception exception) {
    String message = exception != null ? exception.getMessage() : authException.getMessage();
    log.warn("Unauthorized error happened: {}", message);
  }
}
