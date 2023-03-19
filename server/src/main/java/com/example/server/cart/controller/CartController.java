package com.example.server.cart.controller;

import com.example.server.cart.dto.CartPostDto;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/cart")
@Validated
public class CartController {

  //장바구니에 바로 추천밀박스추가
  @PatchMapping("/{user-id}/{mealbox-id}/add")
  public ResponseEntity patchCart(@PathVariable("user-id") long userId, @PathVariable("mealbox-id") long mealboxId){
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.OK);
  }

  //장바구니에 커스텀밀박스 생성 후 추가
  @PatchMapping("/{user-id}/{mealbox-id}/post")
  public ResponseEntity addCustomMealbox(@PathVariable("user-id") long userId, @PathVariable("mealbox-id") long mealboxId){
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.OK);
  }

  //장바구니에서 밀박스 삭제 -> 커스텀밀박스면 mealboxProduct와 mealbox삭제
  //                        추천조합 밀박스면 mealboxProduct만 삭제
  @PatchMapping("/{user-id}/{mealbox-id}/delete")
  public ResponseEntity removeMealbox(@PathVariable("user-id") long userId, @PathVariable("mealbox-id") long mealboxId){
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.OK);
  }

  //밀박스 수량 변경 -> mealboxProduct의 quantity 바꾸기
  @PatchMapping("/{user-id}/{mealbox-id}/patch")
  public ResponseEntity changeMealboxCount(@PathVariable("user-id") long userId, @PathVariable("mealbox-id") long mealboxId){
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.OK);
  }

  //장바구니 화면 띄워주기
  @GetMapping("/{user-id}")
  public ResponseEntity getCart(@PathVariable("user-id") long userId) {
    // 비즈니스 로직 작성해야함
    return new ResponseEntity(HttpStatus.OK);
  }
}
