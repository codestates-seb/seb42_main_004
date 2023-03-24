package com.example.server.order.repository;

import com.example.server.order.entity.OrdersProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrdersProduct, Long> {

}
