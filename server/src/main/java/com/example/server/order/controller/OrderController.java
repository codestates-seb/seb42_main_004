package com.example.server.order.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.order.dto.OrderGetDto;
import com.example.server.order.dto.OrderPageResponseDto;
import com.example.server.order.dto.OrderPatchDeliveryDto;
import com.example.server.order.dto.OrderPostDto;
import com.example.server.order.dto.OrderPostResponseDto;
import com.example.server.order.dto.OrderResponseDto;
import com.example.server.order.entity.Orders;
import com.example.server.order.mapper.OrderMapper;
import com.example.server.order.service.OrderService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import java.io.IOException;
import java.util.List;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequiredArgsConstructor
public class OrderController {
  private final OrderService orderService;
  private final OrderMapper mapper;
  @PostMapping("/orders")
  public ResponseEntity postOrder(@RequestBody OrderPostDto orderPostDto)
      throws IamportResponseException, IOException { // 결제 전 주문 생성
    Orders order = mapper.orderPostDtoToOrders(orderPostDto);
    Orders createdOrder = orderService.createOrder(order, orderPostDto);
    OrderPostResponseDto response = new OrderPostResponseDto();
    response.setOrderId(createdOrder.getOrderId());
    return new ResponseEntity<>(response, HttpStatus.CREATED);
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
    return new ResponseEntity<>(orders, HttpStatus.OK);
  }

  @GetMapping("/admin/orders")
  public ResponseEntity getOrdersAdmin(@RequestParam @Positive int page, @RequestBody OrderGetDto orderGetDto) {
    Page<Orders> orders = orderService.getOrdersByDateToPage(orderGetDto, page-1);
    List<Orders> content = orders.getContent();
    List<OrderResponseDto> orderResponseDtos = mapper.OrdersToOrderResponseDtos(content);
    return new ResponseEntity<>(new MultiResponseDto<>(orderResponseDtos, orders),HttpStatus.OK);
  }

  @DeleteMapping("/orders/{order-id}")
  public ResponseEntity deleteOrder(@PathVariable("order-id") @PositiveOrZero long orderId) {
    orderService.cancelOrder(orderId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
