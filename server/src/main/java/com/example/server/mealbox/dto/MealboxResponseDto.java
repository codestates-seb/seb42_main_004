package com.example.server.mealbox.dto;

import com.example.server.product.dto.ProductResponseDto;
import com.example.server.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class MealboxResponseDto {
    private long mealboxId;
    private long ordersMealboxId;
    private long cartMealboxId;
    private String mealboxName;
    private String details;
    private boolean createdByAdmin;
    private List<ProductResponseDto> products;
    private int quantity;
    private int totalWeight;
    private int totalKcal;
    private int totalPrice;
}