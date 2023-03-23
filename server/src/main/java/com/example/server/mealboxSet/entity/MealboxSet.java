package com.example.server.mealboxSet.entity;


import com.example.server.mealbox.entity.Mealbox;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
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

    /* ####### JPA 매핑 ####### */

    @OneToMany(mappedBy = "mealboxSet", cascade = CascadeType.ALL)
    @Builder.Default
    private List<MealboxSetter> mealboxSetters = new ArrayList<>();

    /* ####### 편의 메서드 ####### */

    public void calculateKcal() {
        this.kcal = this.getMealboxSetters().stream()
                .mapToInt(mealboxSetter->mealboxSetter.getMealbox().getKcal())
                .sum();
    }

    public void addMealboxSetter(MealboxSetter mealboxSetter) {
        this.mealboxSetters.add(mealboxSetter);
    }
}
