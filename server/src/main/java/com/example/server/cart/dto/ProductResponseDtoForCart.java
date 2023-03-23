package com.example.server.cart.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductResponseDtoForCart {
    private long productId;
    private String name;
    private int weight;
    private int kcal;
    private int price;
    private int quantity;
    private String imagePath;
}
