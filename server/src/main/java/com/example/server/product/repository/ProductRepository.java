package com.example.server.product.repository;

import com.example.server.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAllByForSaleIsTrue(Pageable pageable);
    Page<Product> findAllByForSaleIsTrueAndNameContains(String search, Pageable pageable);
}