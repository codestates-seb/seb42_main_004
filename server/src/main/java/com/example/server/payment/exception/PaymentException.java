package com.example.server.payment.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PaymentException implements ExceptionCode {
  FABRICATED_PAYMENT(HttpStatus.CONFLICT, "Payment Information Is Fabricated");
  private final HttpStatus status;
  private final String message;
}
