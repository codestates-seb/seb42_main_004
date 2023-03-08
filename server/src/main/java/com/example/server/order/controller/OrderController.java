package com.example.server.order.controller;

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
public class OrderController {
  @PostMapping
  public ResponseEntity postOrder() {

    return new ResponseEntity(HttpStatus.CREATED);
  }

  @PatchMapping("/{order-id}")
  public ResponseEntity patchOrder(@PathVariable("order-id") long id) {

    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping("/{order-id}")
  public ResponseEntity getOrder(@PathVariable("order-id") long id) {

    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity getOrders() {

    return new ResponseEntity(HttpStatus.OK);
  }

  @DeleteMapping("/{order-id}")
  public ResponseEntity deleteOrder(@PathVariable("order-id") long id) {

    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
