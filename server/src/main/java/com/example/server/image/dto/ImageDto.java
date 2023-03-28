package com.example.server.image.dto;

import com.example.server.image.entity.ImageInfo;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ImageDto {
    private boolean isFileInserted;
    private String uploadStatus;
    private ImageInfo content;
}
