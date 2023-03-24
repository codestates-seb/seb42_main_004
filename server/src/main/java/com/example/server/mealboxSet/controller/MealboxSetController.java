package com.example.server.mealboxSet.controller;

import com.example.server.dto.SingleResponseDto;
import com.example.server.mealboxSet.dto.MealboxSetResponseDto;
import com.example.server.mealboxSet.entity.MealboxSet;
import com.example.server.mealboxSet.mapper.MealboxSetMapper;
import com.example.server.mealboxSet.service.MealboxSetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@Slf4j
@Validated
@RestController
public class MealboxSetController {
    MealboxSetService mealboxSetService;
    MealboxSetMapper mapper;

    public MealboxSetController(MealboxSetService mealboxSetService, MealboxSetMapper mealboxSetMapper) {
        this.mealboxSetService = mealboxSetService;
        this.mapper = mealboxSetMapper;
    }

    //소비자가 추천조합 밀박스 추천받기
    @GetMapping("/mealboxes/rec/survey")
    public ResponseEntity getSurveyMealboxSet(@Positive @RequestParam("kcal") int kcal) {
        log.info("------getRecMealbox------");
        MealboxSet mealboxSet = mealboxSetService.findMealboxSet(kcal);
        MealboxSetResponseDto response = mapper.MealboxSetToResponseDto(mealboxSet);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }
}
