package com.example.server.mealbox.repository;

import com.example.server.mealbox.entity.Mealbox;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealboxRepository extends JpaRepository<Mealbox, Long> {
    Page<Mealbox> findAllByForSaleIsTrueAndMealboxInfoIsNot(Pageable pageable, Mealbox.MealboxInfo mealboxInfo);

    Page<Mealbox> findAllByForSaleIsTrueAndMealboxInfoIsNotAndNameContains(Pageable pageable, Mealbox.MealboxInfo mealboxInfo,
                                                              String search);

    Page<Mealbox> findAllDistinctByForSaleIsTrueAndMealboxInfoIsNotAndNameContainingOrMealboxProductsProductNameContains(Pageable pageable,
                                                                                                 Mealbox.MealboxInfo mealboxInfo,
                                                                                                 String mealboxName, String productName);

    boolean existsMealboxByName(String name);
}
