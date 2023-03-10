package com.example.server.mealbox.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.dto.PageInfo;
import com.example.server.dto.SingleResponseDto;
import com.example.server.mealbox.dto.MealboxResponseDto;
import com.example.server.mealbox.entity.MealboxProduct;
import com.example.server.product.entity.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Validated
@RestController
public class StubMealboxController {

    //관리자가 추천조합 밀박스 만들기
    @PostMapping("/admin/mealboxes")
    public ResponseEntity createAdminMealbox() {
        log.info("------createAdminMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 get (auth를위해서 다른 요청을 했음)
    @GetMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity getAdminMealbox() {
        log.info("------getAdminMealbox------");
        Product product1 = new Product((long) 1,"사과","맛있는 국내산 사과",200,100,1000);
        Product product2 = new Product((long) 2,"배", "맛있는 국내산 배", 150, 100, 1500);
        Product product3 = new Product((long) 3,"고구마", "달달한 고구마", 300, 200, 3000);
        Product product4 = new Product((long) 4, "감자", "강원도 감자",200, 150, 2000);
        List<Product> list1 = new ArrayList<>();
        list1.add(product1); list1.add(product2);
        List<Product> list2 = new ArrayList<>();
        list2.add(product3); list2.add(product4);
        MealboxResponseDto mealboxResponseDto1 = new MealboxResponseDto("과일밀박스", "달달합니다",
                true, list1, 1, 350, 200, 2500);
        MealboxResponseDto mealboxResponseDto2 = new MealboxResponseDto("탄수화물박스", "목막힘주의",
                true, list2, 1, 500, 350, 5000);
        return new ResponseEntity(new SingleResponseDto(mealboxResponseDto1),HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 수정하기
    @PatchMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity updateAdminMealbox() {
        log.info("------updateAdminMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 삭제하기
    @DeleteMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity deleteAdminMealbox() {
        log.info("------deleteAdminMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 리스트 보기(auth를위해서 다른 요청을 했음) + 첫페이지에 +가있어서 1개가 적어야됨
    @GetMapping("/admin/mealboxes")
    public ResponseEntity getAdminMealboxList() {
        log.info("------getAdminMealboxList------");
        Product product1 = new Product((long) 1,"사과","맛있는 국내산 사과",200,100,1000);
        Product product2 = new Product((long) 2,"배", "맛있는 국내산 배", 150, 100, 1500);
        Product product3 = new Product((long) 3,"고구마", "달달한 고구마", 300, 200, 3000);
        Product product4 = new Product((long) 4, "감자", "강원도 감자",200, 150, 2000);
        List<Product> list1 = new ArrayList<>();
        list1.add(product1); list1.add(product2);
        List<Product> list2 = new ArrayList<>();
        list2.add(product3); list2.add(product4);
        MealboxResponseDto mealboxResponseDto1 = new MealboxResponseDto("과일밀박스", "달달합니다",
                true, list1, 1, 350, 200, 2500);
        MealboxResponseDto mealboxResponseDto2 = new MealboxResponseDto("탄수화물박스", "목막힘주의",
                true, list2, 1, 500, 350, 5000);
        List<MealboxResponseDto> response = new ArrayList<>();
        response.add(mealboxResponseDto1);
        response.add(mealboxResponseDto2);
        PageInfo pageInfo = new PageInfo(1,9,1,2);
        return new ResponseEntity(new MultiResponseDto(response,pageInfo), HttpStatus.OK);
    }

    //소비자가 추천조합 밀박스 추천받기
    //그리고나서 requestBody에서 설문조사한 상태를 주면 DB에서 조사해서 뽑아서쓴다
    @GetMapping("/mealboxes/rec/survey")
    public ResponseEntity getSurveyMealbox() {
        log.info("------getRecommendedMealbox------");
        Product product1 = new Product((long) 1,"사과","맛있는 국내산 사과",200,100,1000);
        Product product2 = new Product((long) 2,"배", "맛있는 국내산 배", 150, 100, 1500);
        Product product3 = new Product((long) 3,"고구마", "달달한 고구마", 300, 200, 3000);
        Product product4 = new Product((long) 4, "감자", "강원도 감자",200, 150, 2000);
        List<Product> list1 = new ArrayList<>();
        list1.add(product1); list1.add(product2);
        List<Product> list2 = new ArrayList<>();
        list2.add(product3); list2.add(product4);
        MealboxResponseDto mealboxResponseDto1 = new MealboxResponseDto("과일밀박스", "달달합니다",
                true, list1, 1, 350, 200, 2500);
        MealboxResponseDto mealboxResponseDto2 = new MealboxResponseDto("탄수화물박스", "목막힘주의",
                true, list2, 1, 500, 350, 5000);
        return new ResponseEntity(new SingleResponseDto(mealboxResponseDto2), HttpStatus.OK);
    }

    //개별 추천조합 밀박스 정보 조회 -> 소비자가 추천조합 밀박스의 상품일부를 수정할때 요청(새페이지 띄울때)
    @GetMapping("/mealboxes/rec/{mealboxId}")
    public ResponseEntity getRecMealbox() {
        log.info("------getRecommendedMealbox------");
        Product product1 = new Product((long) 1,"사과","맛있는 국내산 사과",200,100,1000);
        Product product2 = new Product((long) 2,"배", "맛있는 국내산 배", 150, 100, 1500);
        Product product3 = new Product((long) 3,"고구마", "달달한 고구마", 300, 200, 3000);
        Product product4 = new Product((long) 4, "감자", "강원도 감자",200, 150, 2000);
        List<Product> list1 = new ArrayList<>();
        list1.add(product1); list1.add(product2);
        List<Product> list2 = new ArrayList<>();
        list2.add(product3); list2.add(product4);
        MealboxResponseDto mealboxResponseDto1 = new MealboxResponseDto("과일밀박스", "달달합니다",
                true, list1, 1, 350, 200, 2500);
        MealboxResponseDto mealboxResponseDto2 = new MealboxResponseDto("탄수화물박스", "목막힘주의",
                true, list2, 1, 500, 350, 5000);
        return new ResponseEntity(new SingleResponseDto(mealboxResponseDto2), HttpStatus.OK);
    }

    //소비자가 전체 추천조합 밀박스 리스트 조회하기
    @GetMapping("/mealboxes/rec")
    public ResponseEntity getRecMealboxes() {
        log.info("------getRecommendedMealbox------");
        Product product1 = new Product((long) 1,"사과","맛있는 국내산 사과",200,100,1000);
        Product product2 = new Product((long) 2,"배", "맛있는 국내산 배", 150, 100, 1500);
        Product product3 = new Product((long) 3,"고구마", "달달한 고구마", 300, 200, 3000);
        Product product4 = new Product((long) 4, "감자", "강원도 감자",200, 150, 2000);
        List<Product> list1 = new ArrayList<>();
        list1.add(product1); list1.add(product2);
        List<Product> list2 = new ArrayList<>();
        list2.add(product3); list2.add(product4);
        MealboxResponseDto mealboxResponseDto1 = new MealboxResponseDto("과일밀박스", "달달합니다",
                true, list1, 1, 350, 200, 2500);
        MealboxResponseDto mealboxResponseDto2 = new MealboxResponseDto("탄수화물박스", "목막힘주의",
                true, list2, 1, 500, 350, 5000);
        List<MealboxResponseDto> response = new ArrayList<>();
        response.add(mealboxResponseDto1);
        response.add(mealboxResponseDto2);
        PageInfo pageInfo = new PageInfo(1,9,1,2);
        return new ResponseEntity(new MultiResponseDto(response,pageInfo), HttpStatus.OK);
    }
}