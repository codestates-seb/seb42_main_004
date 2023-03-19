package com.example.server.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@Builder
@Getter
public class ProductResponseDto {
    private long productId;
    private String name;
    private int weight;
    private int kcal;
    private int price;
    private int quantity;
}
