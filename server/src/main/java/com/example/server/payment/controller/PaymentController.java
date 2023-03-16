package com.example.server.payment.controller;

import com.example.server.exception.BusinessLogicException;
import com.example.server.order.entity.Orders;
import com.example.server.order.service.OrderService;
import com.example.server.payment.Entity.PayInfo;
import com.example.server.payment.dto.PreparePostDto;
import com.example.server.payment.dto.ValidatePaymentDto;
import com.example.server.payment.exception.PaymentException;
import com.example.server.payment.repository.PayInfoRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.PrepareData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.siot.IamportRestClient.response.Prepare;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequestMapping("/payments")
public class PaymentController {

    // IamPort 결제 검증 컨트롤러
  private final IamportClient iamportClient;
  private final OrderService orderService;
  private final PayInfoRepository payInfoRepository;

  // 생성자를 통해 REST API 와 REST API secret 입력
  public PaymentController(@Lazy OrderService orderService, PayInfoRepository payInfoRepository) {
    this.iamportClient = new IamportClient("5377665757631058","AgLx6Jo4zg8gM6Xc6wPDrFGUR0r7LVzQVCkQljQcf8avGEsqmri0rHW68jX53b0J5faZywwhhQiBFkWy");
    this.orderService = orderService;
    this.payInfoRepository = payInfoRepository;
  }
  // 프론트에서 받은 PG사 결괏값을 통해 아임포트 토큰 발행
  @PostMapping("/{imp_uid}")
  public IamportResponse<Payment> paymentByImpUid(@PathVariable("imp_uid") String impUid)
      throws IOException, IamportResponseException {
    log.info("paymentByImpUid 진입");
    return iamportClient.paymentByImpUid(impUid);
  }
  @PostMapping("/validation")
  public ResponseEntity validatePayment(@RequestBody ValidatePaymentDto validatePaymentDto)
      throws IamportResponseException, IOException {
    Orders order = orderService.findByOrderNumber(validatePaymentDto.getMerchantUid());
    int serverPrice = order.getTotalPrice();
    int impPrice = iamportClient.paymentByImpUid(validatePaymentDto.getImpUid()).getResponse().getAmount().intValue();
    if(serverPrice != impPrice) {
      throw new BusinessLogicException(PaymentException.FABRICATED_PAYMENT);
    }
    orderService.paidOrder(order);
    PayInfo payInfo = new PayInfo(validatePaymentDto.getImpUid());
    payInfo.addOrder(order);
    payInfoRepository.save(payInfo);
    return new ResponseEntity<>(HttpStatus.OK);
  }
  // 결제금액 사전등록
  @PostMapping("/prepare")
  public IamportResponse<Prepare> postPrepare(@RequestBody PreparePostDto preparePostDto)
      throws IamportResponseException, IOException {
    PrepareData prepareData = new PrepareData(preparePostDto.getMerchantUid(), preparePostDto.getAmount());
    return iamportClient.postPrepare(prepareData);
  }

  // 사전등록된 결제정보 조회
  @GetMapping("/prepare/{merchant-uid}")
  public IamportResponse<Prepare> getPrepare(@PathVariable("merchant-uid") String merchantUid)
      throws IamportResponseException, IOException {
    return iamportClient.getPrepare(merchantUid);
  }
}
