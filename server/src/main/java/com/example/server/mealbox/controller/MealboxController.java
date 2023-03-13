package com.example.server.mealbox.controller;

import com.example.server.product.entity.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//@Slf4j
//@Validated
//@RestController
//public class MealboxController {
//
//    //관리자가 추천조합 밀박스 만들기
//    @PostMapping("/admin/mealboxes")
//    public ResponseEntity createAdminMealbox() {
//        log.info("------createAdminMealbox------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //관리자가 추천조합 밀박스 get (auth를위해서 다른 요청을 했음)
//    @GetMapping("/admin/mealboxes/{mealboxId}")
//    public ResponseEntity getAdminMealbox() {
//        log.info("------getAdminMealbox------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //관리자가 추천조합 밀박스 수정하기
//    @PatchMapping("/admin/mealboxes/{mealboxId}")
//    public ResponseEntity updateAdminMealbox() {
//        log.info("------updateAdminMealbox------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //관리자가 추천조합 밀박스 삭제하기
//    @DeleteMapping("/admin/mealboxes/{mealboxId}")
//    public ResponseEntity deleteAdminMealbox() {
//        log.info("------deleteAdminMealbox------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //관리자가 추천조합 밀박스 리스트 보기
//    @GetMapping("/admin/mealboxes")
//    public ResponseEntity getAdminMealboxList() {
//        log.info("------getAdminMealboxList------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //소비자가 추천조합 밀박스 추천받기
//    //그리고나서 requestBody에서 설문조사한 상태를 주면 DB에서 조사해서 뽑아서쓴다
//    @GetMapping("/mealboxes/rec/survey")
//    public ResponseEntity getSurveyMealbox() {
//        log.info("------getRecommendedMealbox------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //개별 추천조합 밀박스 정보 조회 -> 추천조합 밀박스의 상품일부를 수정할때 요청
//    @GetMapping("/mealboxes/rec/{mealboxId}")
//    public ResponseEntity getRecMealbox() {
//        log.info("------getRecommendedMealbox------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //소비자가 전체 추천조합 밀박스 리스트 조회하기
//    @GetMapping("/mealboxes/rec")
//    public ResponseEntity getRecMealboxes() {
//        log.info("------getRecommendedMealbox------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//}