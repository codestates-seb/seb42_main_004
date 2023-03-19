package com.example.server.image.repository;

import com.example.server.image.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
}
