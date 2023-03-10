package com.example.server.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartPostDto {
  private long mealboxId;
  private int quantity;
}
