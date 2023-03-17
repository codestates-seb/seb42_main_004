package com.example.server.mealboxSet.entity;


import com.example.server.mealbox.entity.Mealbox;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MealboxSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_SETS_ID")
    private Long id;
    @Column(nullable = false)
    private int kcal;
    @OneToMany(mappedBy = "mealboxSet")
    private List<Mealbox> mealboxes;
}
