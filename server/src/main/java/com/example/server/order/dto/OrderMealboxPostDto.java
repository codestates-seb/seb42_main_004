package com.example.server.order.dto;

import lombok.Getter;

@Getter
public class OrderMealboxPostDto {  // OrderPostDto에 들어감가
  private long cartMealboxId;
  private long mealboxId;
  private int quantity;
}
