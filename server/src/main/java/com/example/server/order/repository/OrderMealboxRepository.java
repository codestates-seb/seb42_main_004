package com.example.server.order.repository;

import com.example.server.order.entity.OrdersMealbox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMealboxRepository extends JpaRepository<OrdersMealbox, Long> {

}
