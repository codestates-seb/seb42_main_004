package com.example.server.order.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.exception.ExceptionCode;
import com.example.server.order.entity.Orders;
import com.example.server.order.exception.OrderException;
import com.example.server.order.repository.OrderMealboxRepository;
import com.example.server.order.repository.OrderRepository;
import java.time.LocalDate;
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

  public Orders completeDelivery(long orderId) {
    Orders order = findVerifiedOrder(orderId);
    int index = order.getStatus().getIndex();
    if(index != 3) {
      throw new BusinessLogicException(OrderException.DELIVERY_IS_NOT_IN_PROGRESS);
    }
    order.completeDelivery();
    return orderRepository.save(order);
  }

  private Orders findOrder(long orderId) {
    return findVerifiedOrder(orderId);
  }

  private Orders findVerifiedOrder(long orderId) {
    Optional<Orders> order = orderRepository.findById(orderId);
    Orders findOrder = order.orElseThrow(() -> new BusinessLogicException(OrderException.ORDER_NOT_FOUND));
    return findOrder;
  }
}
