package com.example.server.order.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.order.dto.OrderGetDto;
import com.example.server.order.entity.Orders;
import com.example.server.order.exception.OrderException;
import com.example.server.order.repository.OrderMealboxRepository;
import com.example.server.order.repository.OrderRepository;
import com.example.server.payment.controller.PaymentController;
import com.example.server.payment.dto.PreparePostDto;
import com.example.server.user.entity.User;
import com.example.server.user.service.UserService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
  private final OrderRepository orderRepository;
  private final OrderMealboxRepository orderMealboxRepository;
  private final UserService userService;
  private final PaymentController paymentController;

  public Orders createOrder(Orders order) throws IamportResponseException, IOException {
    order.makeOrderNumber();
    PreparePostDto preparePostDto = new PreparePostDto(order.getOrderNumber(), new BigDecimal(order.getTotalPrice()));
    paymentController.postPrepare(preparePostDto);
    return orderRepository.save(order);
  }

  public Orders cancelOrder(long orderId) {
    Orders order = findVerifiedOrder(orderId);
    int index = order.getStatus().getIndex();
    if(index == 3) {
      order.applyRefund();
    } else if (index == 4 & LocalDate.now().isAfter(order.getDeliveryDate().plusDays(1))) {
      throw new BusinessLogicException(OrderException.NOT_REFUNDABLE_DATE);
    } else if (index == 4) {
      order.applyRefund();
    } else if (index == 1) {
      // 주문 취소 메서드 필요 (아임포트)
      order.cancelOrder();
    }
    return orderRepository.save(order);
  }

  //추후 관리자가 주문 상태 변경시 사용할 예정
  public Orders completeDelivery(long orderId) {
    Orders order = findVerifiedOrder(orderId);
    int index = order.getStatus().getIndex();
    if(index != 3) {
      throw new BusinessLogicException(OrderException.DELIVERY_IS_NOT_IN_PROGRESS);
    }
    order.completeDelivery();
    return orderRepository.save(order);
  }

  public Orders findOrder(long orderId) {
    return findVerifiedOrder(orderId);
  }

  // 주문번호로 주문 찾기
  public Orders findByOrderNumber(String orderNumber) {
    Optional<Orders> order = orderRepository.findByOrderNumber(orderNumber);
    Orders findOrder = order.orElseThrow(() -> new BusinessLogicException(OrderException.ORDER_NOT_FOUND));
    return findOrder;
  }

  private Orders findVerifiedOrder(long orderId) {
    Optional<Orders> order = orderRepository.findById(orderId);
    Orders findOrder = order.orElseThrow(() -> new BusinessLogicException(OrderException.ORDER_NOT_FOUND));
    return findOrder;
  }

  public Orders paidOrder(Orders order) {
    order.paid();
    return orderRepository.save(order);
  }

  public Page<Orders> getOrdersByDateToPage(OrderGetDto orderGetDto, int page) {
    // 관리자 검증 해야함
    LocalDate localDate = changeStringToLocalDate(orderGetDto.getDate());
    LocalDateTime startDate = localDate.atStartOfDay();
    LocalDateTime endDate = localDate.atTime(LocalTime.MAX);
    return orderRepository.findAllByCreatedDateBetween(startDate, endDate, PageRequest.of(page, 5, Sort.by("createdDate").descending()));
  }

  public List<Orders> getOrdersByDateToList(OrderGetDto orderGetDto, long userId) {
    // 본인이 맞는지 검증해야함
    LocalDate localDate = changeStringToLocalDate(orderGetDto.getDate());
    LocalDateTime startDate = localDate.atStartOfDay();
    LocalDateTime endDate = localDate.atTime(LocalTime.MAX);
    User user = userService.getUser(userId);
    return orderRepository.findByCreatedDateBetweenAndUserOrderByCreatedDateDesc(startDate, endDate, user);
  }

  private LocalDate changeStringToLocalDate(String dateString) {
    return LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
  }
}
