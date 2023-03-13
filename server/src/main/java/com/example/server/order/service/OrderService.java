package com.example.server.order.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.exception.ExceptionCode;
import com.example.server.order.entity.Orders;
import com.example.server.order.repository.OrderMealboxRepository;
import com.example.server.order.repository.OrderRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.hibernate.criterion.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
  private final OrderRepository orderRepository;
  private final OrderMealboxRepository orderMealboxRepository;

  public Orders createOrder(Orders order) {
    return orderRepository.save(order);
  }

  public Orders cancelOrder(long orderId) {
    Orders order = findVerifiedOrder(orderId);
    order.applyRefund();
    return orderRepository.save(order);
  }

  private Orders findOrder(long orderId) {
    return findVerifiedOrder(orderId);
  }

  private Orders findVerifiedOrder(long orderId) {
    Optional<Orders> order = orderRepository.findById(orderId);
    Orders findOrder = order.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
    return findOrder;
  }
}
