package com.example.server.mealboxSet.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.mealboxSet.entity.MealboxSet;
import com.example.server.mealboxSet.exception.MealboxSetException;
import com.example.server.mealboxSet.repository.MealboxSetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealboxSetService {
    private final MealboxSetRepository mealboxSetRepository;
    private final int[] settedKcalList = {800, 1000, 1200, 1400, 1600, 2000};
    public MealboxSetService(MealboxSetRepository mealboxSetRepository) {
        this.mealboxSetRepository = mealboxSetRepository;
    }

    public MealboxSet findMealboxSet(int kcal){
        verifyKcal(kcal);

        List<MealboxSet> mealboxSets = mealboxSetRepository.findAllByKcalBetween(kcal-20,kcal+20);

        int randomNum = (int) (Math.random()*mealboxSets.size());
        return mealboxSets.get(randomNum);
    }

    /* ####### private 메서드 ####### */
    private void verifyKcal(int kcal) {
        boolean isSettedKcal = false;
        for(int i=0; i< settedKcalList.length; i++){
            if(kcal == settedKcalList[i]){
                isSettedKcal = true;
            }
        }
        if(isSettedKcal == false) {
            throw new BusinessLogicException(MealboxSetException.KCAL_IS_NOT_SETTED);
        }
    }
}
