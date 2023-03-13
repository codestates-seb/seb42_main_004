package com.example.server.image.service;

import com.example.server.image.entity.Image;
import com.example.server.image.entity.UserImage;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;

@Transactional
@Service
public class ImageService {

    public UserImage updateImage(MultipartFile file){
        try{
            String sourceFileName = file.getOriginalFilename();
            String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
            String fileUrl = "C:\\Users\\윤상혁\\Desktop\\java project\\projectImage";
            String destinationFileName = RandomStringUtils.randomAlphabetic(32) + "." + sourceFileNameExtension;
            File destinationFile = new File(fileUrl + destinationFileName);
            destinationFile.getParentFile().mkdirs();
            file.transferTo(destinationFile);
            Image image = new Image(destinationFileName, sourceFileName, fileUrl);
            return null;
        } catch (Exception e){
            return null;
        }
    }
//    public userImage getImage()
}
