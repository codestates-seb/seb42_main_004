package com.example.server.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum ExceptionCode {
  ORDER_NOT_FOUND(404, "Order Not Found");

  @Getter
  private final int status;

  @Getter
  private final String message;
}
