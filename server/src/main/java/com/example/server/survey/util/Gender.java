package com.example.server.survey.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public enum Gender {
    MALE("male"),
    FEMALE("female");

    private String gender;
}
