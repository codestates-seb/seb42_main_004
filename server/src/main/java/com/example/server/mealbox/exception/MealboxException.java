package com.example.server.mealbox.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MealboxException implements ExceptionCode {
  MEALBOX_NOT_FOUND(HttpStatus.NOT_FOUND, "Mealbox Not Found"),
  TOTAL_QUANTITY_OVER(HttpStatus.NOT_ACCEPTABLE, "The Products in Mealbox is over limit");

  private final HttpStatus status;
  private final String message;
}
