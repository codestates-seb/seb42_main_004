package com.example.server.cart.dto;

import com.example.server.mealbox.dto.MealboxDto;
import lombok.Getter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class CartAllPostDto {
    private List<AdminMadeMealboxDto> adminMadeMealboxes;
    private List<CustomMealboxDto> customMealboxes;
    @Getter
    public static class AdminMadeMealboxDto{
        @Positive
        private long mealboxId;
        @Min(1)
        @Max(100)
        private int quantity;
    }
    @Getter
    public static class CustomMealboxDto{
        private MealboxDto mealbox;
        @Min(1)
        @Max(100)
        private int quantity;
    }
}