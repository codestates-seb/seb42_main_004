package com.example.server.auth.utils;

import com.example.server.dto.ErrorResponseDto;
import com.google.gson.Gson;
import io.jsonwebtoken.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class ErrorResponder {
  public static void sendErrorResponse(HttpServletResponse response, HttpStatus status)
      throws IOException, java.io.IOException {
    Gson gson = new Gson();
    ErrorResponseDto errorResponse = ErrorResponseDto.of(status);
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(status.value());
    response.getWriter().write(gson.toJson(errorResponse, ErrorResponseDto.class));
  }
}
