package com.example.server.mealbox.mapper;

import com.example.server.mealbox.dto.MealboxPatchDto;
import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.dto.OnlyMealboxResponseDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.product.dto.ProductResponseDto;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MealboxMapper {
    default Mealbox mealboxPostDtoToMealbox(MealboxPostDto mealboxPostDto, Mealbox.MealboxInfo mealboxInfo){
        return Mealbox.builder().name(mealboxPostDto.getName())
                .price(mealboxPostDto.getPrice())
                .kcal(mealboxPostDto.getKcal())
                .weight(mealboxPostDto.getWeight())
                .mealboxInfo(mealboxInfo)
                .build();
    }

    default Mealbox mealboxPatchDtoToMealbox(MealboxPatchDto mealboxPatchDto){
        return Mealbox.builder()
                .name(mealboxPatchDto.getName())
                .price(mealboxPatchDto.getPrice())
                .kcal(mealboxPatchDto.getKcal())
                .weight(mealboxPatchDto.getWeight())
                .build();
    }

    default OnlyMealboxResponseDto mealboxToMealboxResponseDto(Mealbox mealbox) {
        //나중에 이거 다른곳으로 빼기(리팩토링)
        List<ProductResponseDto> productResponseDtos =
                mealbox.getMealboxProducts().stream().map(mealboxProduct -> {
                    return ProductResponseDto.builder()
                            .productId(mealboxProduct.getProduct().getId())
                            .name(mealboxProduct.getProduct().getName())
                            .price(mealboxProduct.getProduct().getPrice())
                            .weight(mealboxProduct.getProduct().getWeight())
                            .kcal(mealboxProduct.getProduct().getKcal())
                            .quantity(mealboxProduct.getQuantity())
                            .build();
                }).collect(Collectors.toList());

        return OnlyMealboxResponseDto.builder()
                .mealboxId(mealbox.getId())
                .name(mealbox.getName())
                .mealboxInfo(mealbox.getMealboxInfo())
                .weight(mealbox.getWeight())
                .kcal(mealbox.getKcal())
                .price(mealbox.getPrice())
                .products(productResponseDtos)
                .build();
    }

    default List<OnlyMealboxResponseDto> mealboxListToMealboxResponseDtoList(List<Mealbox> mealboxList) {
        return mealboxList.stream().map(mealbox->mealboxToMealboxResponseDto(mealbox)).collect(Collectors.toList());
    }

}
