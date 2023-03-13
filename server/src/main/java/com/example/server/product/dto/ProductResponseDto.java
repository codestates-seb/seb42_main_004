package com.example.server.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@AllArgsConstructor
@Builder
@Getter
public class ProductResponseDto {
    private long productId;
    private long mealboxProductId;
    private String productName;
    private String details;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;
    private int quantity;
}