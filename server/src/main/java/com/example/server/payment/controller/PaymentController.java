package com.example.server.payment.controller;

import com.example.server.auth.details.PrincipalDetails;
import com.example.server.payment.dto.ValidatePaymentDto;
import com.example.server.payment.service.PaymentService;
import com.google.gson.Gson;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import java.io.IOException;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequestMapping("/payments")
@Validated
public class PaymentController { // IamPort 결제 검증 컨트롤러
  private final PaymentService paymentService;
  Gson gson = new Gson();

  public PaymentController(PaymentService paymentService) {
    this.paymentService = paymentService;
  }

  // 결제 사후 검증
  @PostMapping("/validation")
  public ResponseEntity<?> validatePayment(@Valid @RequestBody ValidatePaymentDto dto,
      @AuthenticationPrincipal PrincipalDetails principalDetails)
      throws IamportResponseException, IOException {
    log.info("------------------- PAYMENT VALIDATION -------------------");
    paymentService.validatePayment(dto.getImpUid(), dto.getMerchantUid(), principalDetails.getId());
    return new ResponseEntity<>(HttpStatus.OK);
  }

  // 사전등록된 결제정보 조회
  @GetMapping("/prepare/{merchant-uid}")
  public ResponseEntity<?> getPrepare(@PathVariable("merchant-uid") String merchantUid)
      throws IamportResponseException, IOException {
    log.info("------------------- GET PREPARE -------------------");
    IamportResponse<?> impResponse = paymentService.getPrepare(merchantUid);
    String json = gson.toJson(impResponse);
    return new ResponseEntity<>(json, HttpStatus.OK);
  }
}
