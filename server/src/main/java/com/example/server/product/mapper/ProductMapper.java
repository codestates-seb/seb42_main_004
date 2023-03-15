package com.example.server.product.mapper;

import com.example.server.product.dto.ProductOnlyResponseDto;
import com.example.server.product.dto.ProductPatchDto;
import com.example.server.product.dto.ProductPostDto;
import com.example.server.product.dto.ProductResponseDto;
import com.example.server.product.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product productPostDtoToProduct(ProductPostDto productPostDto);
    Product productPatchDtoToProduct(ProductPatchDto productPatchDto);

    default List<ProductOnlyResponseDto> productsToProductOnlyResponseDtos(List<Product> products){
        return products.stream().map(product ->{
             return ProductOnlyResponseDto.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .unitKcal(product.getUnitKcal())
                    .unitWeight(product.getUnitWeight())
                    .unitPrice(product.getUnitPrice())
                     .build();
        }).collect(Collectors.toList());
    }
}
