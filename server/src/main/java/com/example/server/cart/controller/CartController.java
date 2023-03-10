package com.example.server.cart.controller;

import com.example.server.cart.dto.CartPostDto;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/cart")
@Validated
public class CartController {
  @PostMapping("/{user-id}")
  public ResponseEntity postCart(@PathVariable("user-id") long userId, @RequestBody List<CartPostDto> cartPostDtos) {
    // 비즈니스 로직 작성해야함
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
  @PatchMapping("/{user-id}/{mealbox-id}")
  public ResponseEntity patchCart(@PathVariable("user-id") long userId, @PathVariable("mealbox-id") long mealboxId){
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping("/{user-id}")
  public ResponseEntity getCart(@PathVariable("user-id") long userId) {
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.OK);
  }

  @DeleteMapping("/{user-id}/{mealbox-id}")
  public ResponseEntity deleteCart(@PathVariable("user-id") long userId, @PathVariable("mealbox-id") long mealboxId) {
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
