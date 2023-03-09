package com.example.server.product.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/products")
public class ProductController {

    @PostMapping
    public ResponseEntity createProduct(){
        log.info("--------createProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity getProduct(){
        log.info("--------getProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PatchMapping("/{productId}")
    public ResponseEntity updateProduct(){
        log.info("--------updateProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteProduct(){
        log.info("--------deleteProduct-------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getProductList() {
        log.info("------getProductList-------");
        return new ResponseEntity(HttpStatus.OK);
    }
}