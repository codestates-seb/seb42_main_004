package com.example.server.product.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.dto.PageInfo;
import com.example.server.dto.SingleResponseDto;
import com.example.server.product.dto.ProductOnlyResponseDto;
import com.example.server.product.dto.ProductPatchDto;
import com.example.server.product.dto.ProductPostDto;
import com.example.server.product.dto.ProductResponseDto;
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

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Validated
@RestController
public class ProductController {
    private final ProductMapper mapper;
    private final ProductService productService;


    public ProductController(ProductMapper mapper, ProductService productService) {
        this.mapper = mapper;
        this.productService = productService;
    }

    //관리자가 개별상품 생성하기
    @PostMapping("/admin/products")
    public ResponseEntity createAdminProduct(@RequestBody ProductPostDto productPostDto){
        log.info("--------createProduct-------");
        Product product = mapper.productPostDtoToProduct(productPostDto);
        productService.createProduct(product);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    //관리자가 개별상품 수정하기
    @PatchMapping("/admin/products/{productId}")
    public ResponseEntity updateAdminProduct(@PathVariable("productId") Long productId,
                                             @RequestBody ProductPatchDto productPatchDto){
        log.info("--------updateProduct-------");
        Product productPatcher = mapper.productPatchDtoToProduct(productPatchDto);
        productService.updateProduct(productId, productPatcher);
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 개별상품 삭제하기
    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity deleteAdminProduct(@PathVariable("productId") Long productId){
        log.info("--------deleteProduct-------");
        productService.deleteProduct(productId);
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 개별상품리스트 얻기 (추천조합 밀박스 만들때 + 구성품 조회할때)
    @GetMapping("/admin/products")
    public ResponseEntity getAdminProductList (@Positive @RequestParam int page,
                                               @Positive @RequestParam int size,
                                               @RequestParam String sort,
                                               @RequestParam Sort.Direction dir) {//여기서 이넘타입을 받을수있다!
        log.info("------getProductList-------");
        Page<Product> productPage = productService.findProducts(page, size, sort, dir);

        List<Product> products = productPage.getContent();
        List<ProductOnlyResponseDto> response = mapper.productsToProductOnlyResponseDtos(products);

        return new ResponseEntity(new MultiResponseDto(response,productPage), HttpStatus.OK);
    }

    //소비자가 개별상품리스트 얻기 (커스텀밀박스 만들때 + 구성품 조회할때)
    @GetMapping("/users/products")
    public ResponseEntity getProductList(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @RequestParam String sort,
                                         @RequestParam Sort.Direction dir) {
        log.info("------getProductList-------");
        Page<Product> productPage = productService.findProducts(page,size,sort,dir);

        List<Product> products = productPage.getContent();
        List<ProductOnlyResponseDto> response = mapper.productsToProductOnlyResponseDtos(products);

        return new ResponseEntity(new MultiResponseDto(response,productPage), HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity searchProductList(@Positive @RequestParam int page,
                                            @Positive @RequestParam int size,
                                            @RequestParam String search) {
        log.info("------searchProduct------");
        Page<Product> productPage =
                productService.searchProducts(search, page, size, "id", Sort.Direction.ASC);
        List<Product> products = productPage.getContent();
        List<ProductOnlyResponseDto> response = mapper.productsToProductOnlyResponseDtos(products);

        return new ResponseEntity(new MultiResponseDto(response, productPage), HttpStatus.OK);
    }
}