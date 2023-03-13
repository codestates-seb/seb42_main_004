package com.example.server.image.entity;

import com.example.server.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class UserImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_IMAGE_ID")
    private Long id;

    @Embedded
    private Image image;

    @OneToOne(mappedBy = "user_image")
    private User user;


}
