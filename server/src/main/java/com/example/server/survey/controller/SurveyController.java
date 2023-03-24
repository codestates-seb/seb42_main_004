package com.example.server.survey.controller;

import com.example.server.dto.SingleResponseDto;
import com.example.server.survey.dto.SurveyResponseDto;
import com.example.server.survey.util.ActivityAmount;
import com.example.server.survey.util.Gender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Slf4j
@Validated
@RestController
public class SurveyController {
    static final int[] kcalUnitList = new int[]{2000, 1600, 1400, 1200, 1000, 800};
//나이, 성별, 신장, 체중  /비활동적, 저활동적, 활동적, 매우 활동적
    @GetMapping("/survey")
    ResponseEntity doSurvey(@RequestParam @Positive @Max(100) int age,
                            @RequestParam @NotBlank Gender gender,
                            @RequestParam @Positive @Max(200) int height,
                            @RequestParam @Positive @Max(150) double weight,
                            @RequestParam ActivityAmount activityAmount){
        double BMR = 0;
        if(gender==Gender.MALE){
            BMR = maleCBmrCalculator(age, height, weight);
        }else if(gender==Gender.FEMALE){
            BMR = femaleBmrCalculator(age, height, weight);
        }
        int currentKcal = (int) applyActivity(BMR, activityAmount);

        int easyGoalKcal = calculateGoalKcal(currentKcal);
        int normalGoalKcal = calculateGoalKcal(easyGoalKcal);
        int hardGoalKcal = calculateGoalKcal(normalGoalKcal);

        SurveyResponseDto response = SurveyResponseDto.builder()
                .easy(SurveyResponseDto.Diet.builder().kcal(easyGoalKcal)
                        .goalWeightLoss(calculateWeightLoss(currentKcal, easyGoalKcal))
                        .goalWeight(calculateWeight(weight, calculateWeightLoss(currentKcal, easyGoalKcal))).build()
                ).normal(SurveyResponseDto.Diet.builder().kcal(normalGoalKcal)
                        .goalWeightLoss(calculateWeightLoss(currentKcal, normalGoalKcal))
                        .goalWeight(calculateWeight(weight, calculateWeightLoss(currentKcal, normalGoalKcal))).build()
                ).hard(SurveyResponseDto.Diet.builder().kcal(hardGoalKcal)
                .goalWeightLoss(calculateWeightLoss(currentKcal, hardGoalKcal))
                .goalWeight(calculateWeight(weight, calculateWeightLoss(currentKcal, hardGoalKcal))).build()).build();

        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    private static double calculateWeightLoss(int currentKcal, int goalKcal){
        return ((currentKcal-goalKcal)*14/700)/10.0;
    }

    private static double calculateWeight(double weight, double weightLoss){
        return Math.round((weight-weightLoss)*10)/10.0;
    }

    private static int calculateGoalKcal(int currentKcal) {
        for(int i = 0; i<kcalUnitList.length; i++){
            if(kcalUnitList[i]< currentKcal - 100){
                return kcalUnitList[i];
            }
        }
        return kcalUnitList[kcalUnitList.length-1];
    }

    private double maleCBmrCalculator(int age, int height, double weight){
        return 10*weight + 6.25*height - 5*age + 5;
    }

    private double femaleBmrCalculator(int age, int height, double weight){
        return 10*weight + 6.25*height - 5*age -161;
    }

    private double applyActivity(double BMR, ActivityAmount activityAmount){
        return BMR * activityAmount.getBMRMultiplier();
    }
}
