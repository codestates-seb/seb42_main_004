package com.example.server.order.repository;

import com.example.server.order.data.OrderStatus;
import com.example.server.order.entity.Orders;
import com.example.server.user.entity.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
  //미결제 안뜨게 다 바꿔야함
  Page<Orders> findAllByCreatedDateBetweenAndStatusNot(LocalDateTime startDate, LocalDateTime endDate, OrderStatus orderStatus, Pageable pageable);
  List<Orders> findByUserAndStatusNotOrderByCreatedDateDesc(User user, OrderStatus orderStatus);
  Optional<Orders> findByOrderNumber(String orderNumber);
}
