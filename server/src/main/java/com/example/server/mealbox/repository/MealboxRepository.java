package com.example.server.mealbox.repository;

import com.example.server.mealbox.entity.Mealbox;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MealboxRepository extends JpaRepository<Mealbox, Long> {
    Page<Mealbox> findAllByForSaleIsTrueAndMealboxInfoIsNot(Pageable pageable, Mealbox.MealboxInfo mealboxInfo);

    Page<Mealbox> findAllByForSaleIsTrueAndMealboxInfoIsNotAndNameContains
            (Pageable pageable, Mealbox.MealboxInfo mealboxInfo, String search);

    @Query("SELECT DISTINCT m FROM Mealbox m JOIN m.mealboxProducts mp JOIN mp.product p "
            + "WHERE (m.forSale IS TRUE AND m.mealboxInfo <> :mealboxInfo AND m.name LIKE %:name%) "
            + "Or (p.forSale IS TRUE AND m.mealboxInfo <> :mealboxInfo AND p.name LIKE %:name%)")
    Page<Mealbox> findAllByMealboxNameAndProductName(@Param("mealboxInfo") Mealbox.MealboxInfo mealboxInfo,
                                                     @Param("name") String name,
                                                     Pageable pageable);
//    Page<Mealbox> findAllDistinctByForSaleIsTrueAndMealboxInfoIsNotAndNameContainingOrForSaleIsTrueAndMealboxProductsProductNameContains
//            (Pageable pageable, Mealbox.MealboxInfo mealboxInfo, String mealboxName, String productName);

    boolean existsMealboxByName(String name);
}
