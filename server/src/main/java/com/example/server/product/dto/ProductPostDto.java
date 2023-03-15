package com.example.server.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ProductPostDto {
    private String name;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;
}
