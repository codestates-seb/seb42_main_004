package com.example.server.mealbox.dto;

import lombok.Getter;

import javax.validation.constraints.*;
import java.util.List;

@Getter
public class MealboxDto {
    @NotBlank(message = "이름은 공백일 수 없습니다.")
    @Size(min = 1, max = 15)
    private String name;
    @Positive @Max(100000)
    private int price;
    @Positive @Max(10000)
    private int kcal;
    @Positive @Max(10000)
    private int weight;
    @NotEmpty
    private List<Product> products;
    @Getter
    public static class Product{
        @Positive
        private Long productId;
        @Positive @Max(10)
        private int quantity;
    }
}
