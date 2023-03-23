package com.example.server.cart.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
public class CartPatchDto {
  @NotBlank(message = "카트에 담기는 고유한 밀박스ID는 공백일 수 없습니다.")
  private Long cartMealboxId;
  @NotBlank(message = "카트에 담기는 밀박스의 개수는 공백일 수 없습니다.")
  private int quantity;
}
