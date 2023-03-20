package com.example.server.exception;

import com.example.server.dto.ErrorResponseDto;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Controller 내에서 발생하는 Exception 대해서 Catch 하여 응답값(Response)을 보내주는 기능을 수행함.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  /**
   * BusinessException에서 발생한 에러
   *
   * @param ex BusinessException
   * @return ResponseEntity
   */
  @ExceptionHandler(BusinessLogicException.class)
  public ResponseEntity<ErrorResponseDto> handleCustomException(BusinessLogicException ex) {
    log.debug("===========================================================");
    log.debug("여기로 오는가?!");
    log.debug("===========================================================");

    return ErrorResponseDto.toResponseEntity(ex.getExceptionCode());
  }
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> dtoValidation(final MethodArgumentNotValidException e) {
    Map<String, String> errors = new HashMap<>();
    e.getBindingResult().getAllErrors().forEach((error)-> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(errors);
  }
}

