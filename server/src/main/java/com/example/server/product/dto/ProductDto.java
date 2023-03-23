package com.example.server.product.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProductDto {
    @NotBlank
    private String name;
    @NotBlank
    private int weight;
    @NotBlank
    private int kcal;
    @NotBlank
    private int price;
}
