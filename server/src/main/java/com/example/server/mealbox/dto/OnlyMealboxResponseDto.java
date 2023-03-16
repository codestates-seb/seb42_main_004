package com.example.server.mealbox.dto;

import com.example.server.product.dto.ProductResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class OnlyMealboxResponseDto {
    private long mealboxId;
    private String mealboxName;
    private boolean createdByAdmin;
    private List<ProductResponseDto> products;
    private int weight;
    private int kcal;
    private int price;
}