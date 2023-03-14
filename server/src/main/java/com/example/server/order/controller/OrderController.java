package com.example.server.order.controller;

import com.example.server.order.service.OrderService;
import javax.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@Validated
@RequiredArgsConstructor
public class OrderController {
  private final OrderService orderService;
  @PostMapping
  public ResponseEntity postOrder() { //주문하기

    return new ResponseEntity(HttpStatus.CREATED);
  }

  @PatchMapping("/{order-id}")
  public ResponseEntity patchOrder(@PathVariable("order-id") @PositiveOrZero long orderId) {  //주문수정 (뭐 하는진 모름)

    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping("user/{user-id}")
  public ResponseEntity getOrder(@PathVariable("user-id") @PositiveOrZero long userId) {  //유저별 주문 내역 확인, JWT 정보랑 비교해야할 듯

    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity getOrders() {

    return new ResponseEntity(HttpStatus.OK);
  }

  @DeleteMapping("/{order-id}")
  public ResponseEntity deleteOrder(@PathVariable("order-id") @PositiveOrZero long orderId) {
    orderService.cancelOrder(orderId);
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
