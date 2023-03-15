package com.example.server.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class ProductOnlyResponseDto {
    private long productId;
    private String productName;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;
}