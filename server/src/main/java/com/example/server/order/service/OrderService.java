package com.example.server.order.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.service.MealboxService;
import com.example.server.order.data.OrderStatus;
import com.example.server.order.dto.OrderMealboxPostDto;
import com.example.server.order.dto.OrderPatchDeliveryDto;
import com.example.server.order.dto.OrderPatchStatusDto;
import com.example.server.order.dto.OrderPostDto;
import com.example.server.order.entity.Orders;
import com.example.server.order.entity.OrdersMealbox;
import com.example.server.order.exception.OrderException;
import com.example.server.order.repository.OrderMealboxRepository;
import com.example.server.order.repository.OrderRepository;
import com.example.server.payment.service.PaymentService;
import com.example.server.user.entity.User;
import com.example.server.user.service.UserService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class OrderService {
  private final OrderRepository orderRepository;
  private final OrderMealboxRepository orderMealboxRepository;
  private final MealboxService mealboxService;
  private final UserService userService;
  private final PaymentService paymentService;

  public OrderService(OrderRepository orderRepository,
      OrderMealboxRepository orderMealboxRepository,
      MealboxService mealboxService, UserService userService, @Lazy PaymentService paymentService) {
    this.orderRepository = orderRepository;
    this.orderMealboxRepository = orderMealboxRepository;
    this.mealboxService = mealboxService;
    this.userService = userService;
    this.paymentService = paymentService;
  }

  public Orders createOrder(Orders order, OrderPostDto orderPostDto, long userId) throws IamportResponseException, IOException {
    order.makeOrderNumber();
//    orderRepository.save(order);
    User user = userService.getUser(userId);
    userService.checkActive(user);
    order.addUser(user);
    orderRepository.save(order);
    log.info("------------------- CREATE OrderMealboxes -------------------");
    OrderMealboxPostDtoToOrdersMealbox(orderPostDto.getMealboxes(), order);
    order.setTotalPrice(order.getOrdersMealboxes().stream().
        mapToInt(ordersMealbox -> ordersMealbox.getPrice() * ordersMealbox.getQuantity()).sum());
    paymentService.postPrepare(order.getOrderNumber(), order.getTotalPrice());
    return orderRepository.save(order);
  }

  // MealboxId 와 quantity, user로 OrdersMealbox를 저장
  private void OrderMealboxPostDtoToOrdersMealbox(List<OrderMealboxPostDto> orderMealboxPostDtos, Orders order) {
    orderMealboxPostDtos.stream().forEach(orderMealboxPostDto -> {
      Mealbox mealbox = mealboxService.findMealboxById(orderMealboxPostDto.getMealboxId());
      int quantity = orderMealboxPostDto.getQuantity();
      OrdersMealbox ordersMealbox = new OrdersMealbox(quantity, mealbox, mealbox.getName());
      ordersMealbox.addOrders(order);
      ordersMealbox.setPrice(mealbox.getPrice());
      ordersMealbox.setKcal(mealbox.getKcal());
      orderMealboxRepository.save(ordersMealbox);
    });
  }

  public void cancelOrder(String orderNumber) {
    Orders order = findByOrderNumber(orderNumber);
    int index = order.getStatus().getIndex();
    if ((order.getDeliveryDate() != null) && LocalDate.now().isAfter(order.getDeliveryDate().plusDays(1))) {
      throw new BusinessLogicException(OrderException.NOT_REFUNDABLE_DATE);
    } else if (index == 4 || index == 3) {
      order.applyRefund();
    } else if (index == 1) {
      // 주문 취소 메서드 필요 (아임포트)
      order.cancelOrder();
    } else if (index == 5) {
      throw new BusinessLogicException(OrderException.ALREADY_APPLIED_REFUND);
    } else if (index == 2) {
      throw new BusinessLogicException(OrderException.ALREADY_CANCELED);
    } else {
      throw new BusinessLogicException(OrderException.NOT_YET_PAID);
    }
    orderRepository.save(order);
  }

  public void changeStatus(String orderNumber, OrderPatchStatusDto dto) {
    Orders order = findByOrderNumber(orderNumber);
    if(dto.getStatus().equals("배송완료")) {
      order.completeDelivery();
    } else {
      order.setStatus(OrderStatus.valueOfStatus(dto.getStatus()));
    }

    orderRepository.save(order);
  }

  // 주문번호로 주문 찾기
  public Orders findByOrderNumber(String orderNumber) {
    Optional<Orders> order = orderRepository.findByOrderNumber(orderNumber);
    return order.orElseThrow(() -> new BusinessLogicException(OrderException.ORDER_NOT_FOUND));
  }

  public Orders findOrder(long orderId) {
    Optional<Orders> order = orderRepository.findById(orderId);
    return order.orElseThrow(() -> new BusinessLogicException(OrderException.ORDER_NOT_FOUND));
  }

  public void paidOrder(Orders order) {
    order.paid();
    orderRepository.save(order);
  }

  public void errorWhilePaying(Orders order) {
    order.errorWhilePaying();
    orderRepository.save(order);
  }

  public Page<Orders> getOrdersByDateToPage(String date, int page) {
    // 관리자 검증 해야함
    LocalDate localDate = changeStringToLocalDate(date);
    LocalDateTime startDate = localDate.atStartOfDay();
    LocalDateTime endDate = localDate.atTime(LocalTime.MAX);
    return orderRepository.findAllByCreatedDateBetweenAndStatusNot(startDate, endDate, OrderStatus.NOT_PAID, PageRequest.of(page, 5, Sort.by("createdDate").descending()));
  }

  public List<Orders> getOrdersByDateToList(long userId) {
    // 본인이 맞는지 검증해야함
    User user = userService.getUser(userId);
    return orderRepository.findByUserAndStatusNotOrderByCreatedDateDesc(user, OrderStatus.NOT_PAID);
  }

  private LocalDate changeStringToLocalDate(String dateString) {
    return LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
  }

  public void setDeliveryAddress(OrderPatchDeliveryDto orderPatchDeliveryDto, long orderId) {
    Orders order = findOrder(orderId);
    order.setAddressee(orderPatchDeliveryDto.getAddressee());
    order.setZipCode(orderPatchDeliveryDto.getZipCode());
    order.setSimpleAddress(orderPatchDeliveryDto.getSimpleAddress());
    order.setDetailAddress(orderPatchDeliveryDto.getDetailAddress());
    order.setPhoneNumber(orderPatchDeliveryDto.getPhoneNumber());
    orderRepository.save(order);
  }

  // 로그인한 유저가 주문자인지 확인
  public void checkOrderHolder(Orders order, long userId) {
    long orderHolderId = order.getUser().getId();
    if(orderHolderId != userId) {
      throw new BusinessLogicException(OrderException.NOT_ORDER_HOLDER);
    }
  }

  public void checkOrderHolder(long orderId, long userId) {
    long orderHolderId = findOrder(orderId).getUser().getId();
    if(orderHolderId != userId) {
      throw new BusinessLogicException(OrderException.NOT_ORDER_HOLDER);
    }
  }

  public void checkOrderHolder(String orderNumber, long userId) {
    long orderHolderId = findByOrderNumber(orderNumber).getUser().getId();
    if(orderHolderId != userId) {
      throw new BusinessLogicException(OrderException.NOT_ORDER_HOLDER);
    }
  }
}
