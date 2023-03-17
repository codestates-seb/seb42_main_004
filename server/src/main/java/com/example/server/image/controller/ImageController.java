package com.example.server.image.controller;

import com.example.server.image.dto.ImageDto;
import com.example.server.image.entity.Image;
import com.example.server.image.service.ImageService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
public class ImageController {
    @Value("${image.path}")
    private String path;
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("users/images/{userId}")
    public ResponseEntity postUserImage(@PathVariable("userId") Long userId, @RequestBody MultipartFile file) {
        ImageDto imageDto = updateProfile(file,"Profile");
        if(imageDto.getContent()==null) {
            return new ResponseEntity(imageDto,HttpStatus.BAD_REQUEST);
        }
//        imageService.updateImage(imageDto);
        return new ResponseEntity(imageDto, HttpStatus.CREATED);
    }

    private ImageDto updateProfile(MultipartFile file, String lastFile)  {
        try {
            String sourceFileName = file.getOriginalFilename();
            String fileUrl = path+"\\"+lastFile+"\\";
            String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
            String destinationFileName = RandomStringUtils.randomAlphabetic(32) + "." + sourceFileNameExtension;
            File destinationFile = new File(fileUrl + destinationFileName);
            destinationFile.getParentFile().mkdirs();
            file.transferTo(destinationFile);
            Image image = new Image(destinationFileName, sourceFileName, fileUrl);
            return ImageDto.builder()
                    .isFileInserted(true)
                    .uploadStatus("FileIsUploaded")
                    .content(image)
                    .build();
        } catch (Exception e) {
            return ImageDto.builder()
                    .isFileInserted(false)
                    .uploadStatus("FileISNotUploaded")
                    .content(null)
                    .build();
        }
    }


    @GetMapping("users/images/{userId}")
    public ResponseEntity getUserImage(@PathVariable("userId") Long userId){
        try {

            String fileName = "C:\\Users\\윤상혁\\Downloads\\leaves-g18e083645_640.jpeg";//userId에서 userImage로 들어간후 임베디드인 image에서 fileName찾기
            FileSystemResource resource = new FileSystemResource(fileName);
            if (!resource.exists()) {
//                throw new NotFoundImageException();
            }
            HttpHeaders header = new HttpHeaders();
            Path filePath = null;
            filePath = Paths.get(fileName);
            header.add("Content-Type", Files.probeContentType(filePath));
            return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
        } catch (Exception e) {
//            throw new NotFoundImageException();
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

//    @ResponseBody
//    @GetMapping("/images/{filename}")
//    public List<Resource> showImage(@PathVariable String filename) throws
//            MalformedURLException {
//        List<Resource> list = new ArrayList<>();
//        list.add(new FileSystemResource("C:\\Users\\윤상혁\\Pictures\\Screenshots\\스크린샷 2023-03-09 144200.png"));
//        list.add(new FileSystemResource("C:\\Users\\윤상혁\\Pictures\\Screenshots\\스크린샷 2023-03-09 144226.png"));
//        return list;
//    }

//    @PostMapping
//    public ResponseEntity postProductImage(){
//
//        return new ResponseEntity(HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity getProductImage(){
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @PostMapping
//    public ResponseEntity postMealboxImage() {
//
//        return new ResponseEntity(HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity getMealboxImage() {
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
}
