package com.example.server.order.dto;

import com.example.server.mealbox.dto.MealboxProductResponseDto;
import java.util.List;
import lombok.Setter;

@Setter
public class OrderMealboxResponseDto {  // 주문 목록 조회시 필요
    private String mealboxName;
    private int mealboxPrice;
    private int mealboxQuantity;
    private List<MealboxProductResponseDto> products;
}
