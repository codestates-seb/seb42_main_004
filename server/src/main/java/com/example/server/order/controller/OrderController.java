package com.example.server.order.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.order.dto.OrderPageResponseDto;
import com.example.server.order.dto.OrderPatchDeliveryDto;
import com.example.server.order.dto.OrderPatchStatusDto;
import com.example.server.order.dto.OrderPostDto;
import com.example.server.order.dto.OrderResponseDto;
import com.example.server.order.entity.Orders;
import com.example.server.order.mapper.OrderMapper;
import com.example.server.order.service.OrderService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class OrderController {
  private final OrderService orderService;
  private final OrderMapper mapper;
  @PostMapping("/orders")
  public ResponseEntity postOrder(@RequestBody OrderPostDto orderPostDto,
      @RequestHeader("Authorization") String auth)
      throws IamportResponseException, IOException { // 결제 전 주문 생성
    Orders order = mapper.orderPostDtoToOrders(orderPostDto);
    Orders createdOrder = orderService.createOrder(order, orderPostDto);
//    OrderPostResponseDto response = new OrderPostResponseDto();
//    response.setOrderId(createdOrder.getOrderId());
//    return new ResponseEntity<>(response, HttpStatus.CREATED);
    String uri = String.format("redirect:/orders/checkout/%d",createdOrder.getOrderId());
    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(URI.create(uri));

    log.info("------------------- Redirect -------------------");
    return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
  }

  @GetMapping("/orders/checkout/{order-id}")
  public ResponseEntity getOrderToPay(@PathVariable("order-id") @PositiveOrZero long orderId) { // 결제 창
    Orders order = orderService.findOrder(orderId);
    OrderPageResponseDto response = mapper.ordersToOrderPageResponseDto(order);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  @PatchMapping("/orders/delivery/{order-id}")
  public ResponseEntity setDeliveryAddress(@PathVariable("order-id") @PositiveOrZero long orderId,
      @RequestBody OrderPatchDeliveryDto orderPatchDeliveryDto) {  // 결제시 주문에 배송지 입력
    orderService.setDeliveryAddress(orderPatchDeliveryDto, orderId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/orders/user/{user-id}")
  public ResponseEntity getOrdersUser(@PathVariable("user-id") @PositiveOrZero long userId) {  //유저별 주문 내역 확인, JWT 정보랑 비교해야할 듯
    List<Orders> orders = orderService.getOrdersByDateToList(userId);
    List<OrderResponseDto> response = mapper.OrdersToOrderResponseDtos(orders);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/admin/orders")
  public ResponseEntity getOrdersAdmin(@RequestParam @Positive int page, @RequestParam String date) {
    Page<Orders> orders = orderService.getOrdersByDateToPage(date, page-1);
    List<Orders> content = orders.getContent();
    List<OrderResponseDto> orderResponseDtos = mapper.OrdersToOrderResponseDtos(content);
    return new ResponseEntity<>(new MultiResponseDto<>(orderResponseDtos, orders),HttpStatus.OK);
  }

  @DeleteMapping("/orders/{order-number}")
  public ResponseEntity deleteOrder(@PathVariable("order-number") @PositiveOrZero String orderNumber) {
    orderService.cancelOrder(orderNumber);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @PatchMapping("/admin/orders/status/{order-number}")
  public ResponseEntity setOrderStatus(@PathVariable("order-number") String orderNumber, @RequestBody
      OrderPatchStatusDto orderPatchStatusDto) {
    orderService.changeStatus(orderNumber, orderPatchStatusDto);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
