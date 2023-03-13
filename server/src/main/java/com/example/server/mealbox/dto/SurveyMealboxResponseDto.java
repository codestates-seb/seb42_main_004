package com.example.server.mealbox.dto;

import com.example.server.mealbox.entity.Mealbox;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SurveyMealboxResponseDto {
    private MealboxResponseDto breakfast;
    private MealboxResponseDto lunch;
    private MealboxResponseDto dinner;
}
