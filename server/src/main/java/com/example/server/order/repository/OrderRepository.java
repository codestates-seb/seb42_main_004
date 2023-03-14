package com.example.server.order.repository;

import com.example.server.order.entity.Orders;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
  //나중에 테스트 해봐야함
//  Page<Orders> findAllByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
//  List<Orders> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
  Optional<Orders> findByOrderNumber(String orderNumber);
}
