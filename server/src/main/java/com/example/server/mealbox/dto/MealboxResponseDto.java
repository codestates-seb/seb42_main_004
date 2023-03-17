package com.example.server.mealbox.dto;

import com.example.server.mealbox.entity.Mealbox;
import com.example.server.product.dto.ProductResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class MealboxResponseDto {
    private long mealboxId;
    private long orderMealboxId;
    private long cartMealboxId;
    private String name;
    private Mealbox.MealboxInfo mealboxInfo;
    private List<ProductResponseDto> products;
    private int quantity;
    private int weight;
    private int kcal;
    private int price;
}
