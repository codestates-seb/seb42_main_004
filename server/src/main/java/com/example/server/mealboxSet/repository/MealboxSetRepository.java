package com.example.server.mealboxSet.repository;

import com.example.server.mealboxSet.entity.MealboxSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealboxSetRepository extends JpaRepository<MealboxSet, Long> {
    List<MealboxSet> findAllByKcal(int kcal);
}
