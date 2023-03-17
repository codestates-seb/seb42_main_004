package com.example.server.cart.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CartMealboxException implements ExceptionCode {

  CART_MEALBOX_NOT_FOUND(HttpStatus.NOT_FOUND, "Cart Meal Box Not Found");
  private final HttpStatus status;
  private final String message;
}
