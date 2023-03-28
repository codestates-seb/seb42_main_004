package com.example.server.payment.service;

import com.example.server.cart.entity.Cart;
import com.example.server.cart.service.CartMealboxService;
import com.example.server.cart.service.CartService;
import com.example.server.exception.BusinessLogicException;
import com.example.server.order.entity.Orders;
import com.example.server.order.service.OrderService;
import com.example.server.payment.Entity.PayInfo;
import com.example.server.payment.exception.PaymentException;
import com.example.server.payment.repository.PayInfoRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.PrepareData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Prepare;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
  // REST API key 와 REST API secret 입력
  private final IamportClient iamportClient = new IamportClient("5377665757631058",
      "AgLx6Jo4zg8gM6Xc6wPDrFGUR0r7LVzQVCkQljQcf8avGEsqmri0rHW68jX53b0J5faZywwhhQiBFkWy");
  private final OrderService orderService;
  private final PayInfoRepository payInfoRepository;
  private final CartService cartService;
  private final CartMealboxService cartMealboxService;

  // 결제금액 사전등록 (사전 검증)
  public void postPrepare(String orderNumber, int amount)
      throws IamportResponseException, IOException {
    PrepareData prepareData = new PrepareData(orderNumber, new BigDecimal(amount));
    iamportClient.postPrepare(prepareData);
  }

  // 사전등록된 결제정보 조회
  public IamportResponse<Prepare> getPrepare(String orderNumber) throws IamportResponseException, IOException {
    return iamportClient.getPrepare(orderNumber);
  }

  // 결제 사후 검증
  public Cart validatePayment(String impUid, String orderNumber, long userId)
      throws IamportResponseException, IOException {
    Orders order = orderService.findByOrderNumber(orderNumber);
    orderService.checkOrderHolder(order, userId);
    int serverPrice = order.getTotalPrice();
    int impPrice = iamportClient.paymentByImpUid(impUid).getResponse().getAmount().intValue();
    log.info("impPrice = {}", impPrice);
    log.info("serverPrice = {}", serverPrice);
    try { // 실결제 금액이 서버에 저장된 금액과 일치하는지 확인
      if(serverPrice != impPrice) {
        throw new BusinessLogicException(PaymentException.FABRICATED_PAYMENT);
      }
    } catch (BusinessLogicException e) {  // 일치하지 않는다면 결제 오류로 주문상태 변경
      log.error("!!!!!!!!! ERROR WHILE PAYING !!!!!!!!!");
      throw e;
    }
//    log.info("try catch 문 통과 / paidOrder 진입");
    // 일치하면 주문완료로 상태 변경
    orderService.paidOrder(order);
//    log.info("paidOrder 통과 / Order, PayInfo 매핑 진입");
    // 결제정보 저장
    mappingOrderAndPayInfo(order, impUid);
//    log.info("Order, PayInfo 매핑 통과 / deleteCartMealbox 진입");
    // 장바구니에 담겨있던 물건 삭제
    List<Long> cartMealboxIds = order.getCartMealboxIds();
    for (Long id : cartMealboxIds) {
//      log.info("id : {}", id);
      // 수정한것 : 카트에서 밀박스를 지우는것이지만 사실상 카트밀박스를 지우는것이다 -> cartMelaboxService 이용
      cartMealboxService.deleteCartMealbox(id);
    }
//    cartMealboxService.deleteCartMealboxAfterPayment(order);
//    log.info("deleteCartMealbox 통과 / refreshPrice 진입");
//    cartService.refreshTotalPrice(order.getUser().getCart());
//    log.info("refreshPrice 통과");
    return order.getUser().getCart();
  }

  public void refreshCartPrice(Cart cart) {
    cartService.refreshTotalPrice(cart);
  }

  private void mappingOrderAndPayInfo(Orders order, String impUid) {
    PayInfo payInfo = new PayInfo(impUid);
    payInfo.addOrder(order);
    payInfoRepository.save(payInfo);
  }

  public void errorWhilePaying(String orderNumber) {
    Orders order = orderService.findByOrderNumber(orderNumber);
    orderService.errorWhilePaying(order);
  }
}
