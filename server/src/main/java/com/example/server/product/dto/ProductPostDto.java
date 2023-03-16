package com.example.server.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ProductPostDto {
    private String name;
    private int weight;
    private int kcal;
    private int price;
}
