package com.example.server.image.repository;

import com.example.server.image.entity.MealboxImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealboxImageRepository extends JpaRepository<MealboxImage, Long> {
}
