package com.example.server.mealbox.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MealboxPostDto {
    private String name;
    private int totalPrice;
    private int totalKcal;
    private int totalWeight;
    private List<Product> products;
    @Getter
    private class Product{
        private Long productId;
        private int quantity;
    }
}
