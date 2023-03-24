package com.example.server.payment.dto;

import javax.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class ValidatePaymentDto {
  @Pattern(regexp = "^imp_\\d{12}$", message = "올바른 포트원 결제번호를 입력해주세요")
  private String impUid;
  @Pattern(regexp = "^\\d{20}$", message = "올바른 주문번호를 입력해주세요.")
  private String merchantUid;
}
