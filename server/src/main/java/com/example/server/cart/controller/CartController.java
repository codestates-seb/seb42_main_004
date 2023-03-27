package com.example.server.cart.controller;

import com.example.server.auth.details.PrincipalDetails;
import com.example.server.cart.dto.CartAllPostDto;
import com.example.server.cart.dto.CartPatchDto;
import com.example.server.cart.dto.CartPostDto;

import com.example.server.cart.dto.CartResponseDto;
import com.example.server.cart.entity.Cart;
import com.example.server.cart.mapper.CartMapper;
import com.example.server.cart.service.CartService;
import com.example.server.dto.SingleResponseDto;
import com.example.server.mealbox.dto.MealboxDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.mapper.MealboxMapper;
import com.example.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/users/cart")
@Validated
public class CartController {
  private final CartService cartService;
  private final CartMapper cartMapper;
  private final MealboxMapper mealboxMapper;
  private final UserService userService;

  //장바구니에 바로 추천밀박스추가
  @PostMapping
  public ResponseEntity addRecMealboxToCart(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                            @RequestBody @Valid CartPostDto cartPostDto){
    log.info("------RecMealboxAddCart------");
    Cart cart = userService.getUser(principalDetails.getId()).getCart();
    cartService.createCartMealboxAndAddMealbox(cart, cartPostDto.getMealboxId());
    return new ResponseEntity(HttpStatus.OK);
  }

//  장바구니에 커스텀밀박스 생성 후 추가
//  소비자가 커스텀 밀박스 만들기 + 소비자가 기존의 추천조합 밀박스 수정하기
  @PostMapping("/custom")
  public ResponseEntity createCustomMealbox(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                            @RequestBody @Valid MealboxDto mealboxDto) {
    log.info("------createCustomMealboxAndAddCart------");
    Cart cart = userService.getUser(principalDetails.getId()).getCart();
    Mealbox mealbox = mealboxMapper.mealboxDtoToMealbox(mealboxDto, Mealbox.MealboxInfo.CUSTOM_MEALBOX);
    cartService.createCustomMealboxAndAddCart(cart, mealbox, mealboxDto.getProducts());
    log.info(String.valueOf(cart.getTotalPrice()));
    return new ResponseEntity(HttpStatus.CREATED);
  }

  //비로그인 -> 로그인 했을 때 장바구니에 전부 넣기
  @PostMapping("/all")
  public ResponseEntity addAllToCartWhenLogin(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                              @RequestBody @Valid CartAllPostDto cartAllPostDto) {
    log.info("------addAllToCartWhenLogin------");
    Cart cart = userService.getUser(principalDetails.getId()).getCart();
    List<CartAllPostDto.CustomMealboxDto> customMealboxDtos = cartAllPostDto.getCustomMealboxes();
    List<CartAllPostDto.AdminMadeMealboxDto> adminMadeMealboxDtos = cartAllPostDto.getAdminMadeMealboxes();

    cartService.addAllMealboxes(cart, customMealboxDtos, adminMadeMealboxDtos);
    log.info(cart.toString());
    return new ResponseEntity(HttpStatus.CREATED);
  }

  //장바구니에서 밀박스 삭제
  @DeleteMapping("/{cartMealboxId}")
  public ResponseEntity removeMealbox(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                      @PathVariable("cartMealboxId") @Positive Long cartMealboxId){
    log.info("------DeleteMealboxFromCart------");
    Cart cart = userService.getUser(principalDetails.getId()).getCart();
    cartService.removeMealboxFromCart(cart, cartMealboxId);
    return new ResponseEntity(HttpStatus.OK);
  }

  //밀박스 수량 변경 -> mealboxProduct의 quantity 바꾸기
  @PatchMapping
  public ResponseEntity changeMealboxCount(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                           @RequestBody @Valid CartPatchDto cartPatchDto){
    log.info("------ChangeMealboxCount------");
    Cart cart = userService.getUser(principalDetails.getId()).getCart();
    cartService.changeMealboxQuantity(cart, cartPatchDto.getCartMealboxId(), cartPatchDto.getQuantity());
    return new ResponseEntity(HttpStatus.OK);
  }

  //장바구니 화면 띄워주기
  @GetMapping
  public ResponseEntity getCart(@AuthenticationPrincipal PrincipalDetails principalDetails) {
    log.info("------getCart------");
    Cart cart = userService.getUser(principalDetails.getId()).getCart();
    CartResponseDto cartResponseDto = cartMapper.cartToCartResponseDto(cart);
    return new ResponseEntity(new SingleResponseDto(cartResponseDto),HttpStatus.OK);
  }

}
