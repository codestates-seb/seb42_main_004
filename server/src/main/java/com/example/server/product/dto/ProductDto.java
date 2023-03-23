package com.example.server.product.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProductDto {
    @NotBlank(message = "이름은 공백일 수 없습니다.")
    private String name;
    @NotBlank(message = "무게는 공백일 수 없습니다.")
    private int weight;
    @NotBlank(message = "칼로리는 공백일 수 없습니다.")
    private int kcal;
    @NotBlank(message = "가격은 공백일 수 없습니다.")
    private int price;
}
