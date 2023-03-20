package com.example.server.image.entity;



import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class ImageInfo {
    @Column(nullable = false)
    private String imageName;
    @Column(nullable = false)
    private String oriName;
    @Column(nullable = false)
    private String filePath;
    @Transient
    private final String baseUrl = "https://codestates-main-project-image.s3.ap-northeast-2.amazonaws.com/";
}