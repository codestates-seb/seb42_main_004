package com.example.server.product.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.product.dto.ProductResponseDto;
import com.example.server.product.entity.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Validated
@RestController
public class ProductController {
    @PostMapping("/admin/products")
    public ResponseEntity createProduct(){
        log.info("--------createProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PatchMapping("/admin/products/{productId}")
    public ResponseEntity updateProduct(){
        log.info("--------updateProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity deleteProduct(){
        log.info("--------deleteProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/admin/products")
    public ResponseEntity getAdminProductList() {
        log.info("------getProductList-------");
        ProductResponseDto productResponseDto1 = ProductResponseDto.builder()
                .productId(1)
                .productName("사과")
                .details("국산")
                .unitKcal(100)
                .unitPrice(1000)
                .unitWeight(200)
                .build();
        ProductResponseDto productResponseDto2 = ProductResponseDto.builder()
                .productId(2)
                .productName("배")
                .details("국산")
                .unitKcal(150)
                .unitPrice(1500)
                .unitWeight(200)
                .build();
        List<ProductResponseDto> list = new ArrayList<>();
        list.add(productResponseDto1);
        list.add(productResponseDto2);
        new MultiResponseDto<ProductResponseDto>(list, );
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity getProductList() {
        log.info("------getProductList-------");
        return new ResponseEntity(HttpStatus.OK);
    }
}