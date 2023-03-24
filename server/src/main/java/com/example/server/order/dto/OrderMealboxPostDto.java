package com.example.server.order.dto;

import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import lombok.Getter;

@Getter
public class OrderMealboxPostDto {  // OrderPostDto에 들어감
  @PositiveOrZero
  private long cartMealboxId;
  @PositiveOrZero
  private long mealboxId;
  @Positive
  private int quantity;
}
