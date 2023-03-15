package com.example.server.order.repository;

import com.example.server.order.entity.Orders;
import com.example.server.user.entity.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Orders, Long> {
  //나중에 테스트 해봐야함
  Page<Orders> findAllByCreatedDateBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
  List<Orders> findByCreatedDateBetweenAndUserOrderByCreatedDateDesc(LocalDateTime startDate, LocalDateTime endDate, User user);
  Optional<Orders> findByOrderNumber(String orderNumber);
}
