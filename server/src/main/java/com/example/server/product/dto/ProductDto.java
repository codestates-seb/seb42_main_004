package com.example.server.product.dto;

import lombok.Getter;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
public class ProductDto {
    @NotBlank(message = "이름은 공백일 수 없습니다.")
    @Size(min = 1, max = 15)
    private String name;
    @Positive
    @Max(9999)
    private int weight;
    @Positive
    @Max(9999)
    private int kcal;
    @Positive
    @Max(99999)
    private int price;
}
