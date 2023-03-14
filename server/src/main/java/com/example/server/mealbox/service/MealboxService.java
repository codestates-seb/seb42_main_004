package com.example.server.mealbox.service;

import com.example.server.mealbox.repository.MealboxRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class MealboxService {
    private final MealboxRepository mealboxRepository;

    public MealboxService(MealboxRepository mealboxRepository) {
        this.mealboxRepository = mealboxRepository;
    }
}
