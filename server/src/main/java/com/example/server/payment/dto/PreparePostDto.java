package com.example.server.payment.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PreparePostDto {
  private String merchantUid;
  private BigDecimal amount;
}
