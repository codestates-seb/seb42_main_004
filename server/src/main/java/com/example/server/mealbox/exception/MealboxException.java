package com.example.server.mealbox.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum MealboxException implements ExceptionCode {
    MEALBOX_NOT_FOUND(HttpStatus.NOT_FOUND,"Mealbox Not Found");

    private final HttpStatus status;
    private final String message;
}
