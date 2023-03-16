package com.example.server.mealbox.mapper;

import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.dto.OnlyMealboxResponseDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.product.dto.ProductResponseDto;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

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

    default OnlyMealboxResponseDto mealboxToMealboxResponseDto(Mealbox mealbox) {
        //나중에 이거 다른곳으로 빼기(리팩토링)
        List<ProductResponseDto> productResponseDtos =
                mealbox.getMealboxProducts().stream().map(mealboxProduct -> {
                    return ProductResponseDto.builder()
                            .productId(mealboxProduct.getProduct().getId())
                            .mealboxProductId(mealboxProduct.getId())
                            .productName(mealboxProduct.getProduct().getName())
                            .unitPrice(mealboxProduct.getProduct().getUnitPrice())
                            .unitWeight(mealboxProduct.getProduct().getUnitWeight())
                            .unitKcal(mealboxProduct.getProduct().getUnitKcal())
                            .quantity(mealboxProduct.getQuantity())
                            .build();
                }).collect(Collectors.toList());

        return OnlyMealboxResponseDto.builder()
                .mealboxId(mealbox.getId())
                .mealboxName(mealbox.getName())
                .createdByAdmin(mealbox.isCreatedByAdmin())
                .weight(mealbox.getTotalWeight())
                .kcal(mealbox.getTotalKcal())
                .price(mealbox.getTotalPrice())
                .products(productResponseDtos)
                .build();
    }

    default List<OnlyMealboxResponseDto> mealboxListToMealboxResponseDtoList(List<Mealbox> mealboxList) {
        return mealboxList.stream().map(mealbox->mealboxToMealboxResponseDto(mealbox)).collect(Collectors.toList());
    }

}
