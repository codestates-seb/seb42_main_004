package com.example.server.survey.util;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public enum ActivityAmount {
    NOT_ACTIVE("Not Active",1.2),
    LOW_ACTIVE("Low Active",1.375),
    NORMAL_ACTIVE("Normal Active",1.55),
    HIGH_ACTIVE("High Active",1.725);
    private String ActivityAmount;
    private double BMRMultiplier;

    @JsonCreator
    ActivityAmount(String activityAmount, double BMRMultiplier) {
        ActivityAmount = activityAmount;
        this.BMRMultiplier = BMRMultiplier;
    }
}
