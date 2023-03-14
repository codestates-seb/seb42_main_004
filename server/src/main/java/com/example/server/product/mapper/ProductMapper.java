package com.example.server.product.mapper;

import com.example.server.product.dto.ProductPatchDto;
import com.example.server.product.dto.ProductPostDto;
import com.example.server.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    Product productPostDtoToProduct(ProductPostDto productPostDto);
    Product productPatchDtoToProduct(ProductPatchDto productPatchDto);
}
