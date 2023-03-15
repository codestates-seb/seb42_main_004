package com.example.server.payment.dto;

import lombok.Getter;

@Getter
public class ValidatePaymentDto {
  private String impUid;
  private String merchantUid;
}
