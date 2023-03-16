package com.example.server.mealbox.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SurveyMealboxResponseDto {
    private OnlyMealboxResponseDto breakfast;
    private OnlyMealboxResponseDto lunch;
    private OnlyMealboxResponseDto dinner;
}
