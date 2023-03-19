package com.example.server.survey.util;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;


@Getter
public enum Gender {
    MALE("male"),
    FEMALE("female");

    private String gender;

    @JsonCreator
    Gender(String gender) {
        this.gender = gender;
    }
}
