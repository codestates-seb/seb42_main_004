package com.example.server.mealbox.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.dto.SingleResponseDto;
import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.dto.MealboxResponseDto;
import com.example.server.mealbox.dto.OnlyMealboxResponseDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.mapper.MealboxMapper;
import com.example.server.mealbox.service.MealboxService;
import com.example.server.product.entity.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@RestController
public class MealboxController {
    private final MealboxService mealboxService;
    private final MealboxMapper mapper;

    public MealboxController(MealboxService mealboxService, MealboxMapper mapper) {
        this.mealboxService = mealboxService;
        this.mapper = mapper;
    }

    //관리자가 추천조합 밀박스 만들기
    @PostMapping("/admin/mealboxes")
    public ResponseEntity createAdminMealbox(@RequestBody MealboxPostDto mealboxPostDto) {
        log.info("------createAdminMealbox------");
        Mealbox mealbox = mapper.mealboxPostDtoToMealbox(mealboxPostDto,true);
        mealboxService.createMealboxAndMealboxProduct(mealbox, mealboxPostDto.getProducts());
        return new ResponseEntity(HttpStatus.CREATED);
    }

    //관리자가 추천조합 밀박스 get (auth를위해서 다른 요청을 했음)
    @GetMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity getAdminMealbox(@Positive @PathVariable("mealboxId") Long mealboxId) {
        log.info("------getAdminMealbox------");
        Mealbox mealbox = mealboxService.findMealboxById(mealboxId);
        OnlyMealboxResponseDto response = mapper.mealboxToMealboxResponseDto(mealbox);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 수정하기
    @PatchMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity updateAdminMealbox() {
        log.info("------updateAdminMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 삭제하기 -> productMealbox까지 전이
    @DeleteMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity deleteAdminMealbox(@PathVariable("mealboxId") Long mealboxId) {
        log.info("------deleteAdminMealbox------");
        mealboxService.deleteMealbox(mealboxId);
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 리스트 보기
    @GetMapping("/admin/mealboxes")
    public ResponseEntity getAdminMealboxList(@Positive @RequestParam int page,
                                              @Positive @RequestParam int size) {
        log.info("------getAdminMealboxList------");
        Page<Mealbox> mealboxPage = mealboxService.findMealboxes(page,size);
        List<Mealbox> mealboxes = mealboxPage.getContent();
        List<OnlyMealboxResponseDto> response = mapper.mealboxListToMealboxResponseDtoList(mealboxes);

        return new ResponseEntity(new MultiResponseDto(response, mealboxPage), HttpStatus.OK);
    }

    //소비자가 추천조합 밀박스 추천받기
    //그리고나서 requestBody에서 설문조사한 상태를 주면 DB에서 조사해서 뽑아서쓴다
    @GetMapping("/mealboxes/rec/survey")
    public ResponseEntity getSurveyMealbox() {
        log.info("------getRecommendedMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    //소비자가 전체 추천조합 밀박스 리스트 조회하기
    @GetMapping("/mealboxes/rec")
    public ResponseEntity getRecMealboxes(@Positive @RequestParam int page,
                                          @Positive @RequestParam int size) {
        log.info("------getRecommendedMealbox------");
        Page<Mealbox> mealboxPage = mealboxService.findMealboxes(page,size);
        List<Mealbox> mealboxes = mealboxPage.getContent();
        List<OnlyMealboxResponseDto> response = mapper.mealboxListToMealboxResponseDtoList(mealboxes);

        return new ResponseEntity(new MultiResponseDto(response, mealboxPage), HttpStatus.OK);
    }
}