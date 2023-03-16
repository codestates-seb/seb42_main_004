package com.example.server.survey.dto;


import lombok.Builder;

@Builder
public class SurveyResponseDto {
    private Diet easy;
    private Diet normal;
    private Diet hard;

    @Builder
    public class Diet {
        private int kcal;
        private double goalWeight;
        private double goalWeightLoss;
    }
}