package com.example.server.mealboxSet.entity;

import com.example.server.mealbox.entity.Mealbox;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Getter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MealboxSetter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_SETTER_ID")
    private Long id;

    /* ####### JPA 매핑 ####### */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEALBOX_ID")
    private Mealbox mealbox;
    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEALBOX_SETS_ID")
    private MealboxSet mealboxSet;

    /* ####### 편의 메서드 ####### */

    public static void makeMealboxSetter(Mealbox mealbox, MealboxSet mealboxSet){
        MealboxSetter mealboxSetter = MealboxSetter.builder().mealbox(mealbox).mealboxSet(mealboxSet).build();
        mealbox.addMealboxSetter(mealboxSetter);
        mealboxSet.addMealboxSetter(mealboxSetter);
    }
}
