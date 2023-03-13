package com.example.server.image.entity;

import com.example.server.mealbox.entity.Mealbox;
import com.example.server.user.entity.User;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MealboxImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_IMAGE_ID")
    private Long id;

    @Embedded
    private Image image;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEALBOX_ID")
    @Setter
    private Mealbox mealbox;
}
