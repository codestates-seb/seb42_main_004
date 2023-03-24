package com.example.server.cart.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class CartPatchDto {
  @Positive
  private Long cartMealboxId;
  @Positive
  private int quantity;
}
