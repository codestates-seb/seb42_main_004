package com.example.server.image.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.image.entity.ImageInfo;
import com.example.server.image.entity.MealboxImage;
import com.example.server.image.entity.ProductImage;
import com.example.server.image.entity.UserImage;
import com.example.server.image.exception.ImageUploadException;
import com.example.server.image.util.ImageSort;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.product.entity.Product;
import com.example.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    private final FileManager fileManager;
    private final UploadImageS3 uploadImageS3;

    public ProductImage uploadProductImage(MultipartFile mf, Product product){
        long time = System.currentTimeMillis();
        String originalFilename = mf.getOriginalFilename();
        String saveFileName = String.format("%d_%s", time, originalFilename.replaceAll(" ", ""));
        String filePath = ImageSort.PRODUCT_IMAGE.getPath();

        String savedPath = createAndUploadFile(mf,saveFileName, filePath);
        log.info("Saved Path : "+savedPath);

        return ProductImage.builder().product(product)
                .imageInfo(new ImageInfo(saveFileName, originalFilename, filePath))
                .build();
    }
    public MealboxImage uploadMealboxImage(MultipartFile mf, Mealbox mealbox){
        long time = System.currentTimeMillis();
        String originalFilename = mf.getOriginalFilename();
        String saveFileName = String.format("%d_%s", time, originalFilename.replaceAll(" ", ""));
        String filePath = ImageSort.MEALBOX_IMAGE.getPath();

        String savedPath = createAndUploadFile(mf,saveFileName, filePath);
        log.info("Saved Path : "+savedPath);

        return MealboxImage.builder().mealbox(mealbox)
                .imageInfo(new ImageInfo(saveFileName, originalFilename, filePath))
                .build();
    }
    public UserImage uploadUserImage (MultipartFile mf, User user){
        long time = System.currentTimeMillis();
        String originalFilename = mf.getOriginalFilename();
        String saveFileName = String.format("%d_%s", time, originalFilename.replaceAll(" ", ""));
        String filePath = ImageSort.USER_IMAGE.getPath();

        String savedPath = createAndUploadFile(mf,saveFileName, filePath);
        log.info("Saved Path : "+savedPath);

        return UserImage.builder().user(user)
                .imageInfo(new ImageInfo(saveFileName, originalFilename, filePath))
                .build();
    }


    // 임시 파일 생성 & 업데이트 & 임시 파일 삭제
    private String createAndUploadFile(MultipartFile mf, String saveFileName, String filePath) {
        // 파일 생성
        File uploadFile = null;
        try {
            Optional<File> uploadFileOpt = fileManager.convertMultipartFileToFile(mf);
            if (uploadFileOpt.isEmpty()) {
                throw new BusinessLogicException(ImageUploadException.IMAGE_NOT_CONVERTED);
            }
            uploadFile = uploadFileOpt.get();

            // 파일 업로드
            String saveFilePath = uploadImageS3.upload(uploadFile, filePath, saveFileName);

            return File.separator + saveFilePath;

        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessLogicException(ImageUploadException.IMAGE_NOT_UPLOADED);
        } finally {
            // 파일 삭제
            if (uploadFile != null) {
                uploadFile.delete();
            }
        }
    }
}