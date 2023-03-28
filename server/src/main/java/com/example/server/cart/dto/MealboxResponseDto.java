package com.example.server.cart.dto;

import com.example.server.mealbox.entity.Mealbox;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class MealboxResponseDto {
    private long mealboxId;
    private long cartMealboxId;
    private String name;
    private Mealbox.MealboxInfo mealboxInfo;
    private int quantity;
    private int weight;
    private int kcal;
    private int price;
    private List<ProductResponseDtoForCart> products;
}
