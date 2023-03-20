package com.example.server.cart.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CartResponseDto {
    private int totalPrice;
    private List<MealboxResponseDto> mealboxes;
}
