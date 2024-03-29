package com.example.server.product.mapper;

import com.example.server.image.entity.ImageInfo;
import com.example.server.product.dto.ProductDto;
import com.example.server.product.dto.ProductOnlyResponseDto;
import com.example.server.product.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    default Product productDtoToProduct(ProductDto productDto) {
        return Product.builder().name(productDto.getName())
                .weight(productDto.getWeight())
                .kcal(productDto.getKcal())
                .price(productDto.getPrice())
                .build();
    }

    default List<ProductOnlyResponseDto> productsToProductOnlyResponseDtos(List<Product> products){
        return products.stream().map(product ->{
            ProductOnlyResponseDto productOnlyResponseDto = ProductOnlyResponseDto.builder()
                    .productId(product.getId())
                    .name(product.getName())
                    .kcal(product.getKcal())
                    .weight(product.getWeight())
                    .price(product.getPrice())
                     .build();

            if(product.getImage()!=null){
                ImageInfo imageInfo = product.getImage().getImageInfo();
                productOnlyResponseDto.setImagePath(imageInfo.getBaseUrl()+imageInfo.getFilePath()+imageInfo.getImageName());
            }

            return productOnlyResponseDto;
        }).collect(Collectors.toList());
    }
}
