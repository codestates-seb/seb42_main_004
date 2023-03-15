package com.example.server.order.dto;

import com.example.server.mealbox.dto.MealboxProductResponseDto;
import java.util.List;
import lombok.Setter;

@Setter
public class OrderMealboxResponseDto {
    private String mealboxName;
    private int mealboxPrice;
    private int mealboxQuantity;
    List<MealboxProductResponseDto> products;
}
