package com.example.server.mealboxSet.dto;

import com.example.server.mealbox.dto.OnlyMealboxResponseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MealboxSetResponseDto {
    private OnlyMealboxResponseDto breakfast;
    private OnlyMealboxResponseDto lunch;
    private OnlyMealboxResponseDto dinner;
}
