package com.example.server.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ProductPostDto {
    private String productName;
    private String details;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;
}