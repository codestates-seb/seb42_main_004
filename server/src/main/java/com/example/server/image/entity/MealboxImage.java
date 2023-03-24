package com.example.server.image.entity;

import com.example.server.mealbox.entity.Mealbox;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@Entity
public class MealboxImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_IMAGE_ID")
    private Long id;

    @Embedded
    private ImageInfo imageInfo;

    /* ####### JPA 매핑 ####### */

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEALBOX_ID")
    @Setter
    private Mealbox mealbox;
}
