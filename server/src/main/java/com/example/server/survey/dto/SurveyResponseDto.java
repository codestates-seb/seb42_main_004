package com.example.server.survey.dto;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SurveyResponseDto {
    private Diet easy;
    private Diet normal;
    private Diet hard;

    @Builder
    @Getter
    public static class Diet {
        private int kcal;
        private double goalWeight;
        private double goalWeightLoss;
    }
}