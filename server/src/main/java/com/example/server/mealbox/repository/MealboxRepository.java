package com.example.server.mealbox.repository;

import com.example.server.mealbox.entity.Mealbox;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealboxRepository extends JpaRepository<Mealbox, Long> {
    Page<Mealbox> findAllByMealboxInfoIsNot(Pageable pageable, Mealbox.MealboxInfo mealboxInfo);

    Page<Mealbox> findAllByMealboxInfoIsNotAndNameContains(Pageable pageable, Mealbox.MealboxInfo mealboxInfo,
                                                              String search);
    boolean existsMealboxByName(String name);
}
