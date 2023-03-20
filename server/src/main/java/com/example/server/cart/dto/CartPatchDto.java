package com.example.server.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class CartPatchDto {
  private Long cartMealboxId;
  private int quantity;
}
