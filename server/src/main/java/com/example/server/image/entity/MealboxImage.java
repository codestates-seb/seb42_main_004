package com.example.server.image.entity;

import com.example.server.mealbox.entity.Mealbox;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MealboxImage extends JpaBase{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_IMAGE_ID")
    private Long id;

    @Embedded
    private Image image;

    @OneToOne(mappedBy = "mealbox_image")
    private Mealbox mealbox;
}
