package com.example.server.cart.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
public class CartPostDto {
  @NotBlank(message = "카트에 담기는 고유한 밀박스ID는 공백일 수 없습니다.")
  private long mealboxId;
}
