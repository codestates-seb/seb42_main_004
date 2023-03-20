package com.example.server.mealboxSet.mapper;

import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.mapper.MealboxMapper;
import com.example.server.mealboxSet.dto.MealboxSetResponseDto;
import com.example.server.mealboxSet.entity.MealboxSet;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MealboxSetMapper {
    private final MealboxMapper mealboxMapper;

    public MealboxSetMapper(MealboxMapper mealboxMapper) {
        this.mealboxMapper = mealboxMapper;
    }

    public MealboxSetResponseDto MealboxSetToResponseDto(MealboxSet mealboxSet){
        List<Mealbox> mealboxes = mealboxSet.getMealboxes();
        MealboxSetResponseDto responseDto = new MealboxSetResponseDto();

        for(int i=0;i<mealboxes.size();i++){
            switch(mealboxes.get(i).getMealboxInfo()){
                case BREAKFAST_REC_MEALBOX:
                    responseDto.setBreakfast
                            (mealboxMapper.mealboxToMealboxResponseDto(mealboxes.get(i)));
                case LUNCH_REC_MEALBOX:
                    responseDto.setLunch
                            (mealboxMapper.mealboxToMealboxResponseDto(mealboxes.get(i)));
                case DINNER_REC_MEALBOX:
                    responseDto.setDinner
                            (mealboxMapper.mealboxToMealboxResponseDto(mealboxes.get(i)));
            }
        }

        return responseDto;
    }
}
