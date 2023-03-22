package com.example.server.payment.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PreparePostDto {
  private String merchantUid;
  private BigDecimal amount;
}
