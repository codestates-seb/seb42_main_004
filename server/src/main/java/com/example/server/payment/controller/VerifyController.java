package com.example.server.payment.controller;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/verifyPortOne")
public class VerifyController {

    // IamPort 결제 검증 컨트롤러
//  private final IamportClient iamportClient;
//
//  // 생성자를 통해 REST API 와 REST API secret 입력
//  public VerifyController() {
//    //this.iamportClient = new IamportClient("","")
//  }
//  // 프론트에서 받은 PG사 결괏값을 통해 아임포트 토큰 발행
//  @PostMapping("/{imp_uid}")
//  public IamportResponse<Payment> paymentByImpUid(@PathVariable("imp_uid") String impUid)
//      throws IOException, IamportResponseException {
//    log.info("paymentByImpUid 진입");
//    return iamportClient.paymentByImpUid(impUid);
//  }

}
