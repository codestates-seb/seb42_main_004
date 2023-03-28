package com.example.server.mealbox.mapper;

import com.example.server.image.entity.ImageInfo;
import com.example.server.image.entity.ProductImage;
import com.example.server.mealbox.dto.MealboxDto;
import com.example.server.mealbox.dto.OnlyMealboxResponseDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.product.dto.ProductResponseDto;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MealboxMapper {
    default Mealbox mealboxDtoToMealbox(MealboxDto mealboxDto, Mealbox.MealboxInfo mealboxInfo){
        return Mealbox.builder().name(mealboxDto.getName())
                .price(mealboxDto.getPrice())
                .kcal(mealboxDto.getKcal())
                .weight(mealboxDto.getWeight())
                .mealboxInfo(mealboxInfo)
                .build();
    }

    default Mealbox mealboxDtoToMealboxPatcher(MealboxDto mealboxDto){
        return Mealbox.builder().name(mealboxDto.getName())
                .price(mealboxDto.getPrice())
                .kcal(mealboxDto.getKcal())
                .weight(mealboxDto.getWeight())
                .build();
    }

    default OnlyMealboxResponseDto mealboxToMealboxResponseDto(Mealbox mealbox) {
        List<ProductResponseDto> productResponseDtos =
                mealbox.getMealboxProducts().stream().map(mealboxProduct -> {
                    ProductResponseDto prd =  ProductResponseDto.builder()
                            .productId(mealboxProduct.getProduct().getId())
                            .name(mealboxProduct.getProduct().getName())
                            .price(mealboxProduct.getProduct().getPrice())
                            .weight(mealboxProduct.getProduct().getWeight())
                            .kcal(mealboxProduct.getProduct().getKcal())
                            .quantity(mealboxProduct.getQuantity())
                            .build();

                    ProductImage productImage = mealboxProduct.getProduct().getImage();

                    if(productImage != null) {
                        ImageInfo imageInfo = productImage.getImageInfo();
                        prd.setImagePath(imageInfo.getBaseUrl()+imageInfo.getFilePath()+imageInfo.getImageName());
                    }

                    return prd;
                }).collect(Collectors.toList());

        OnlyMealboxResponseDto responseDto = OnlyMealboxResponseDto.builder()
                .mealboxId(mealbox.getId())
                .name(mealbox.getName())
                .mealboxInfo(mealbox.getMealboxInfo())
                .weight(mealbox.getWeight())
                .kcal(mealbox.getKcal())
                .price(mealbox.getPrice())
                .products(productResponseDtos)
                .build();

        if(mealbox.getImage()!=null) {
            ImageInfo imageInfo = mealbox.getImage().getImageInfo();
            responseDto.setImagePath(imageInfo.getBaseUrl()+imageInfo.getFilePath()+imageInfo.getImageName());
        }

        return responseDto;
    }

    default List<OnlyMealboxResponseDto> mealboxListToMealboxResponseDtoList(List<Mealbox> mealboxList) {
        return mealboxList.stream().map(mealbox->mealboxToMealboxResponseDto(mealbox)).collect(Collectors.toList());
    }

}
