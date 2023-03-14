package com.example.server.mealbox.mapper;

import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.entity.Mealbox;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MealboxMapper {
    default Mealbox mealboxPostDtoToMealbox(MealboxPostDto mealboxPostDto, boolean createdByAdmin){
        return Mealbox.builder().name(mealboxPostDto.getName())
                .totalPrice(mealboxPostDto.getTotalPrice())
                .totalKcal(mealboxPostDto.getTotalKcal())
                .totalWeight(mealboxPostDto.getTotalWeight())
                .createdByAdmin(createdByAdmin)
                .build();
    }
}
