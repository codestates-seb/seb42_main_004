package com.example.server.product.dto;

import lombok.Getter;

@Getter
public class ProductPatchDto {
    private String productName;
    private String details;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;
}
