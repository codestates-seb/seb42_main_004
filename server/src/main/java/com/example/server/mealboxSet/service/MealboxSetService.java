package com.example.server.mealboxSet.service;

import com.example.server.mealboxSet.entity.MealboxSet;
import com.example.server.mealboxSet.repository.MealboxSetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealboxSetService {
    MealboxSetRepository mealboxSetRepository;

    public MealboxSetService(MealboxSetRepository mealboxSetRepository) {
        this.mealboxSetRepository = mealboxSetRepository;
    }

    public MealboxSet findMealboxSet(int kcal){
        List<MealboxSet> mealboxSets = mealboxSetRepository.findAllByKcal(kcal);
        int randomNum = (int) (Math.random()*mealboxSets.size()+1);
        return mealboxSets.get(randomNum);
    }
}
