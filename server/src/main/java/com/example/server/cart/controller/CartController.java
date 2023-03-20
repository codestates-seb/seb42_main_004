package com.example.server.cart.controller;

import com.example.server.cart.dto.CartPatchDto;
import com.example.server.cart.dto.CartPostDto;

import com.example.server.cart.dto.CartResponseDto;
import com.example.server.cart.entity.Cart;
import com.example.server.cart.mapper.CartMapper;
import com.example.server.cart.service.CartService;
import com.example.server.dto.SingleResponseDto;
import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.mapper.MealboxMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/users/cart")
@Validated
public class CartController {
  private final CartService cartService;
  private final CartMapper cartMapper;
  private final MealboxMapper mealboxMapper;
  public CartController(CartService cartService, CartMapper cartMapper, MealboxMapper mealboxMapper) {
    this.cartService = cartService;
    this.cartMapper = cartMapper;
    this.mealboxMapper = mealboxMapper;
  }

  //장바구니에 바로 추천밀박스추가
  @PostMapping("/{cartId}")
  public ResponseEntity addRecMealboxToCart(@PathVariable("cartId") Long cartId,
                                            @RequestBody CartPostDto cartPostDto){
    cartService.createCartMealboxAndAddMealbox(cartId, cartPostDto.getMealboxId(),cartPostDto.getQuantity());
    return new ResponseEntity(HttpStatus.OK);
  }

  //장바구니에 커스텀밀박스 생성 후 추가
  //소비자가 커스텀 밀박스 만들기 + 소비자가 기존의 추천조합 밀박스 수정하기
  @PostMapping("/custom/{cartId}")
  public ResponseEntity createCustomMealbox(@PathVariable("cartId") Long cartId,
                                            @RequestBody MealboxPostDto mealboxPostDto) {
    log.info("------createCustomMealboxAndAddCart------");
    Mealbox mealbox = mealboxMapper.mealboxPostDtoToMealbox(mealboxPostDto, Mealbox.MealboxInfo.CUSTOM_MEALBOX);
    cartService.createMealboxAndAddCart(cartId, mealbox, mealboxPostDto.getProducts());
    return new ResponseEntity(HttpStatus.CREATED);
  }

  //장바구니에서 밀박스 삭제 -> 커스텀밀박스면 cartMealbox, mealboxProduct와 mealbox삭제 -> 밀박스를 삭제+이후전이
  //                        추천조합 밀박스면 cartMealbox만 삭제 -> cartMealbox만 삭제
  @DeleteMapping("/{cartId}/{cartMealboxId}")
  public ResponseEntity removeMealbox(@PathVariable("cartId") Long cartId,
                                      @PathVariable("cartMealboxId") Long cartMealboxId){
    cartService.removeMealboxFromCart(cartId, cartMealboxId);
    return new ResponseEntity(HttpStatus.OK);
  }

  //밀박스 수량 변경 -> mealboxProduct의 quantity 바꾸기
  @PatchMapping("/{cartId}")
  public ResponseEntity changeMealboxCount(@PathVariable("cartId") Long cartId,
                                           @RequestBody CartPatchDto cartPatchDto){
    cartService.changeMealboxQuantity(cartId, cartPatchDto.getCartMealboxId(), cartPatchDto.getQuantity());
    return new ResponseEntity(HttpStatus.OK);
  }

  //장바구니 화면 띄워주기
  @GetMapping("/{cartId}")
  public ResponseEntity getCart(@PathVariable("cartId") Long cartId) {
    Cart cart = cartService.findCartById(cartId);
    CartResponseDto cartResponseDto = cartMapper.cartToCartResponseDto(cart);
    return new ResponseEntity(new SingleResponseDto(cartResponseDto),HttpStatus.OK);
  }
}
