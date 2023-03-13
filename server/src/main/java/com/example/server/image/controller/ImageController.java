package com.example.server.image.controller;

import com.example.server.image.dto.ImageDto;
import com.example.server.image.entity.Image;
import com.example.server.image.service.ImageService;
import lombok.Getter;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@RestController
public class ImageController {
//    @Value("${propertyTest}")
//    private final String fileUrl;
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

//    @PostMapping("users/images/{userId}")
//    public ResponseEntity postUserImage(@PathVariable("userId") Long userId, @RequestBody MultipartFile file) {
//        ImageDto imageDto = updateProfile(file);
//        if(imageDto.getContent()==null) {
//            return new ResponseEntity(imageDto,HttpStatus.BAD_REQUEST);
//        }
//        imageService.updateImage(imageDto);
//        return new ResponseEntity(imageDto, HttpStatus.CREATED);
    }

//    public ImageDto updateProfile(MultipartFile file)  {
//        try {
//            String sourceFileName = file.getOriginalFilename();
//            String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
//            @Value(${image.path})
//            String fileUrl;
//            String destinationFileName = RandomStringUtils.randomAlphabetic(32) + "." + sourceFileNameExtension;
//            File destinationFile = new File(fileUrl + destinationFileName);
//            destinationFile.getParentFile().mkdirs();
//            file.transferTo(destinationFile);
//            Image image = new Image(destinationFileName, sourceFileName, fileUrl);
//            return ImageDto.builder()
//                    .isFileInserted(true)
//                    .uploadStatus("FileIsUploaded")
//                    .content(image)
//                    .build();
//        } catch (Exception e) {
//            return ImageDto.builder()
//                    .isFileInserted(false)
//                    .uploadStatus("FileISNotUploaded")
//                    .content(null)
//                    .build();
//        }
//    }
//
//
//    @GetMapping("users/images/{userId}")
//    public ResponseEntity getUserImage(@PathVariable("userId") Long userId){
//        try {
//            String path = "실제 이미지가 있는 위치";
//            FileSystemResource resource = new FileSystemResource(path+fileName);
//            if (!resource.exists()) {
////                throw new NotFoundImageException();
//            }
//            HttpHeaders header = new HttpHeaders();
//            Path filePath = null;
//            filePath = Paths.get(path+fileName);
//            header.add("Content-Type", Files.probeContentType(filePath));
//            return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
//        } catch (Exception e) {
////            throw new NotFoundImageException();
//        }
//        return new ResponseEntity(HttpStatus.OK);
//    }

    @PostMapping
    public ResponseEntity postProductImage(){

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getProductImage(){

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postMealboxImage() {

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getMealboxImage() {

        return new ResponseEntity(HttpStatus.OK);
    }
}
