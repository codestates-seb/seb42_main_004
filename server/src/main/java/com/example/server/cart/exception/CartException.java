package com.example.server.cart.exception;


import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum CartException implements ExceptionCode {
    CART_NOT_FOUND(HttpStatus.NOT_FOUND, "Cart Not Found");
    private final HttpStatus status;
    private final String message;
}
