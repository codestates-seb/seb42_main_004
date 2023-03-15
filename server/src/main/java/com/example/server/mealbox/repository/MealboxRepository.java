package com.example.server.mealbox.repository;

import com.example.server.mealbox.entity.Mealbox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealboxRepository extends JpaRepository<Mealbox, Long> {
}
