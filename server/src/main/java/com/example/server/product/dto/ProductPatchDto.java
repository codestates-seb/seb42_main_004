package com.example.server.product.dto;

import lombok.Getter;

@Getter
public class ProductPatchDto {
    private String name;
    private int weight;
    private int kcal;
    private int price;
}
