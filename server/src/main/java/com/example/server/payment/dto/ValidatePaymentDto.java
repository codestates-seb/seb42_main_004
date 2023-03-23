package com.example.server.payment.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class ValidatePaymentDto {
  private String impUid;
  private String merchantUid;
}
