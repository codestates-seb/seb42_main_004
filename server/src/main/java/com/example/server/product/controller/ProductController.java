package com.example.server.product.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.dto.PageInfo;
import com.example.server.product.dto.ProductPostDto;
import com.example.server.product.dto.ProductResponseDto;
import com.example.server.product.entity.Product;
import com.example.server.product.mapper.ProductMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Validated
@RestController
public class ProductController {
    private final ProductMapper mapper;

    public ProductController(ProductMapper mapper) {
        this.mapper = mapper;
    }

    //관리자가 개별상품 생성하기
    @PostMapping("/admin/products")
    public ResponseEntity createAdminProduct(@RequestBody ProductPostDto productPostDto){
        log.info("--------createProduct-------");
        Product product = mapper.productPostDtoToProduct(productPostDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 개별상품 수정하기
    @PatchMapping("/admin/products/{productId}")
    public ResponseEntity updateAdminProduct(){
        log.info("--------updateProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 개별상품 삭제하기
    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity deleteAdminProduct(){
        log.info("--------deleteProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 개별상품리스트 얻기 (추천조합 밀박스 만들때)
    @GetMapping("/admin/products")
    public ResponseEntity getAdminProductList (@Positive @RequestParam int page,
                                               @Positive @RequestParam int size) {
        log.info("------getProductList-------");

        return new ResponseEntity(HttpStatus.OK);
    }

    //소비자가 개별상품리스트 얻기 (커스텀밀박스 만들때)
    @GetMapping("/products")
        public ResponseEntity getProductList() {

        return new ResponseEntity(HttpStatus.OK);
    }
}