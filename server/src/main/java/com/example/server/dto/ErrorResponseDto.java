package com.example.server.dto;

import com.example.server.exception.ExceptionCode;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponseDto {
  private final LocalDateTime timestamp = LocalDateTime.now();
  private final String status;
  private final String message;

  public static ResponseEntity<ErrorResponseDto> toResponseEntity(ExceptionCode exceptionCode) {
    return ResponseEntity
        .status(exceptionCode.getStatus())
        .body(ErrorResponseDto.builder()
            .message(exceptionCode.getMessage())
            .status(exceptionCode.getStatus().toString())
            .build()
        );
  }

  public static ErrorResponseDto of(HttpStatus httpStatus) {
    return ErrorResponseDto.builder()
            .message(httpStatus.getReasonPhrase())
            .status(httpStatus.toString())
            .build()
        ;
  }
}
