package com.example.server.image.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ImageUploadException implements ExceptionCode {
    IMAGE_NOT_CONVERTED(HttpStatus.INTERNAL_SERVER_ERROR,"이미지 변환에 실패했습니다."),
    IMAGE_NOT_UPLOADED(HttpStatus.INTERNAL_SERVER_ERROR, "파일을 업로드 하던 중 에러가 발생했습니다");

    private final HttpStatus status;
    private final String message;
}
