package com.example.server.cart.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class CartPostDto {
  @Positive
  private long mealboxId;
}
