package com.example.server.order.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum OrderException implements ExceptionCode {
  ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "Order Not Found"),
  DELIVERY_IS_NOT_IN_PROGRESS(HttpStatus.FORBIDDEN, "Delivery Is Not In Progress"),
  NOT_REFUNDABLE_DATE(HttpStatus.FORBIDDEN, "This Is Not A Refundable Date");

  private final HttpStatus status;
  private final String message;
}
