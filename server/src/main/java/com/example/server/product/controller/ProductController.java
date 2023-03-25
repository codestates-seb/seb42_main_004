package com.example.server.product.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.dto.PageInfo;
import com.example.server.product.dto.ProductDto;
import com.example.server.product.dto.ProductOnlyResponseDto;
import com.example.server.product.entity.Product;
import com.example.server.product.mapper.ProductMapper;
import com.example.server.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@RestController
public class ProductController {
    private final ProductMapper mapper;
    private final ProductService productService;
    private final int productListSize = 8;


    public ProductController(ProductMapper mapper, ProductService productService) {
        this.mapper = mapper;
        this.productService = productService;
    }

    //관리자가 개별상품 생성하기
    @PostMapping("/admin/products")
    public ResponseEntity createAdminProduct(@RequestBody @Valid ProductDto productDto){
        log.info("--------createProduct-------");
        Product product = mapper.productDtoToProduct(productDto);
        Product savedProduct = productService.createProduct(product);
        return new ResponseEntity(savedProduct.getId(), HttpStatus.CREATED);
    }

    //관리자가 개별상품 수정하기
    @PatchMapping("/admin/products/{productId}")
    public ResponseEntity updateAdminProduct(@PathVariable("productId") @Positive Long productId,
                                             @RequestBody @Valid ProductDto productDto){
        log.info("--------updateProduct-------");
        Product productPatcher = mapper.productDtoToProduct(productDto);
        productService.updateProduct(productId, productPatcher);
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 개별상품 삭제하기
    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity deleteAdminProduct(@PathVariable("productId") @Positive Long productId){
        log.info("--------deleteProduct-------");
        productService.stopSellingProduct(productId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/admin/products")
    public ResponseEntity adminGetProductList (@RequestParam @Positive int page,
                                               @RequestParam @NotBlank String sort,
                                               @RequestParam Sort.Direction dir) {
        log.info("------adminGetProductList-------");
        Page<Product> productPage = productService.findProducts(page, productListSize, sort, dir, true);

        List<Product> products = productPage.getContent();
        List<ProductOnlyResponseDto> response = mapper.productsToProductOnlyResponseDtos(products);

        return new ResponseEntity(new MultiResponseDto(response,productPage), HttpStatus.OK);
    }

    @GetMapping("/admin/products/search")
    public ResponseEntity adminGetSearchedProductList(@RequestParam @Positive int page,
                                                      @RequestParam String name){
        log.info("------adminGetsearchProductList------");
        Page<Product> productPage =
                productService.searchProducts(name, page, productListSize, "id", Sort.Direction.ASC);

        List<Product> products = productPage.getContent();
        List<ProductOnlyResponseDto> response = mapper.productsToProductOnlyResponseDtos(products);

        return new ResponseEntity(new MultiResponseDto(response, productPage), HttpStatus.OK);
    }
    //개별상품리스트 얻기 (추천조합 밀박스 만들때 + 구성품 조회할때)
    @GetMapping("/products")
    public ResponseEntity getProductList (@RequestParam @Positive int page,
                                          @RequestParam @NotBlank String sort,
                                          @RequestParam Sort.Direction dir) {//여기서 이넘타입을 받을수있다!
        log.info("------getProductList-------");
        Page<Product> productPage = productService.findProducts(page, productListSize, sort, dir, false);

        List<Product> products = productPage.getContent();
        List<ProductOnlyResponseDto> response = mapper.productsToProductOnlyResponseDtos(products);

        PageInfo pageInfo = new PageInfo(productPage.getNumber()+1, productPage.getSize(),
                (int) productPage.getTotalElements());
        return new ResponseEntity(new MultiResponseDto(response,pageInfo), HttpStatus.OK);
    }

    @GetMapping("/products/search")
    public ResponseEntity getSearchedProductList(@RequestParam @Positive int page,
                                                 @RequestParam String name) {
        log.info("------getsearchProduct------");
        Page<Product> productPage =
                productService.searchProducts(name, page, productListSize, "id", Sort.Direction.ASC);

        List<Product> products = productPage.getContent();
        List<ProductOnlyResponseDto> response = mapper.productsToProductOnlyResponseDtos(products);

        return new ResponseEntity(new MultiResponseDto(response, productPage), HttpStatus.OK);
    }

    @PostMapping("/admin/products/{productId}/image")
    public ResponseEntity postProductImage(@PathVariable("productId") @Positive Long productId,
                                           @RequestPart("file") MultipartFile file) {
        log.info("------uploadProductImage------");
        productService.uploadImage(productId, file);
        return new ResponseEntity(HttpStatus.CREATED);
    }

}