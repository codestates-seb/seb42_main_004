package com.example.server.mealboxSet.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum MealboxSetException implements ExceptionCode{
    KCAL_IS_NOT_SETTED(HttpStatus.NOT_ACCEPTABLE, "This Kcal Is Not Setted");

    private final HttpStatus status;
    private final String message;
}