package com.example.server.image.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ImageSort {
    PRODUCT_IMAGE("개별상품 이미지","product"),
    MEALBOX_IMAGE("밀박스 이미지","mealbox"),
    USER_IMAGE("유저 이미지","user");

    private final String item;
    private final String path;
}
