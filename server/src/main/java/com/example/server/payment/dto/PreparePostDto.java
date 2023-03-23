package com.example.server.payment.dto;

import java.math.BigDecimal;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PreparePostDto {
  @Pattern(regexp = "^\\d{20}$", message = "올바른 주문번호를 입력해주세요.")
  private String merchantUid;
  @Pattern(regexp = "\\d+")
  private BigDecimal amount;
}
