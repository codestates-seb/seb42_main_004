package com.example.server.mealbox.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class MealboxDto {
    @NotBlank
    private String name;
    @NotBlank
    private int price;
    @NotBlank
    private int kcal;
    @NotBlank
    private int weight;
    @NotBlank
    private List<Product> products;
    @Getter
    public static class Product{
        @NotBlank
        private Long productId;
        @NotBlank
        private int quantity;
    }
}
