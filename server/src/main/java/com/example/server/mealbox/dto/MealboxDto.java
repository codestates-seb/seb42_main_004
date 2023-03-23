package com.example.server.mealbox.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class MealboxDto {
    @NotBlank(message = "이름은 공백일 수 없습니다.")
    private String name;
    @NotBlank(message = "가격은 공백일 수 없습니다.")
    private int price;
    @NotBlank(message = "칼로리는 공백일 수 없습니다.")
    private int kcal;
    @NotBlank(message = "무게는 공백일 수 없습니다.")
    private int weight;
    @NotBlank(message = "구성상품이 없는 빈 밀박스일 수 없습니다.")
    private List<Product> products;
    @Getter
    public static class Product{
        @NotBlank(message = "상품Id는 공백일 수 없습니다.")
        private Long productId;
        @NotBlank(message = "상품수량은 공백일 수 없습니다.")
        private int quantity;
    }
}
