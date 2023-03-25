package com.example.server.product.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ProductException implements ExceptionCode {
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND,"Product Not Found"),
    PRODUCT_NOT_FOR_SALE(HttpStatus.UNPROCESSABLE_ENTITY, "Product Is Not For Sale");

    private final HttpStatus status;
    private final String message;
}
