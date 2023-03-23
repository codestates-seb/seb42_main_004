package com.example.server.mealbox.controller;

import com.example.server.dto.MultiResponseDto;
import com.example.server.dto.PageInfo;
import com.example.server.mealbox.dto.MealboxDto;
import com.example.server.mealbox.dto.OnlyMealboxResponseDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.mapper.MealboxMapper;
import com.example.server.mealbox.service.MealboxService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@RestController
public class MealboxController {
    private final MealboxService mealboxService;
    private final MealboxMapper mapper;
    private final int mealboxListSize = 6;

    public MealboxController(MealboxService mealboxService, MealboxMapper mapper) {
        this.mealboxService = mealboxService;
        this.mapper = mapper;
    }

    //관리자가 추천조합 밀박스 만들기
    @PostMapping("/admin/mealboxes")
    public ResponseEntity createAdminMealbox(@RequestPart (value = "mealboxDto") MealboxDto mealboxDto,
                                             @RequestPart (value = "file", required = false) MultipartFile file) {
        log.info("------createAdminMealbox------");
        Mealbox mealbox = mapper.mealboxDtoToMealbox(mealboxDto, Mealbox.MealboxInfo.NO_REC_MEALBOX);
        log.info(mealbox.toString());
        mealboxService.createMealboxAndMealboxProduct(mealbox, mealboxDto.getProducts(), file);
        log.info(mealbox.toString());
        return new ResponseEntity(HttpStatus.CREATED);
    }

    //관리자가 추천조합 밀박스 수정하기
    @PatchMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity updateAdminMealbox(@Positive @PathVariable("mealboxId") Long mealboxId,
                                             @RequestPart(value = "mealboxDto") MealboxDto mealboxDto,
                                             @RequestPart(value = "file", required = false) MultipartFile file) {
        log.info("------updateAdminMealbox------");
        Mealbox mealboxPatcher = mapper.mealboxDtoToMealboxPatcher(mealboxDto);
        mealboxService.updateMealbox(mealboxPatcher, mealboxId, mealboxDto.getProducts(), file);
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 추천조합 밀박스 삭제하기 -> productMealbox까지 전이
    @DeleteMapping("/admin/mealboxes/{mealboxId}")
    public ResponseEntity deleteAdminMealbox(@PathVariable("mealboxId") Long mealboxId) {
        log.info("------deleteAdminMealbox------");
        mealboxService.deleteMealbox(mealboxId);
        return new ResponseEntity(HttpStatus.OK);
    }

    //추천조합 밀박스 리스트 보기
    @GetMapping("/mealboxes")
    public ResponseEntity getMealboxList(@Positive @RequestParam int page,
                                         @RequestParam String sort,
                                         @RequestParam Sort.Direction dir) {
        log.info("------getMealboxList------");
        Page<Mealbox> mealboxPage = mealboxService.findAdminMadeMealboxes(page,mealboxListSize, sort, dir);
        List<Mealbox> mealboxes = mealboxPage.getContent();
        List<OnlyMealboxResponseDto> response = mapper.mealboxListToMealboxResponseDtoList(mealboxes);

        PageInfo pageInfo = new PageInfo(mealboxPage.getNumber()+1, mealboxPage.getSize(),
                (int) mealboxPage.getTotalElements());
        return new ResponseEntity(new MultiResponseDto(response, pageInfo), HttpStatus.OK);
    }

    //추천조합 밀박스 검색하기
    @GetMapping("/mealboxes/search")
    public ResponseEntity getSearchedMealboxes(@Positive @RequestParam int page,
                                               @RequestParam String name) {
        log.info("------getSearchedMealboxList------");
        Page<Mealbox> mealboxPage = mealboxService.getSearchedMealboxes(page,mealboxListSize, name);
        List<Mealbox> mealboxes = mealboxPage.getContent();
        List<OnlyMealboxResponseDto> response = mapper.mealboxListToMealboxResponseDtoList(mealboxes);

        PageInfo pageInfo = new PageInfo(mealboxPage.getNumber()+1, mealboxPage.getSize(),
                (int) mealboxPage.getTotalElements());
        return new ResponseEntity(new MultiResponseDto(response, pageInfo), HttpStatus.OK);
    }

    @GetMapping("/mealboxes/search/detail")
    public ResponseEntity getDetailSearchedMealboxes(@Positive @RequestParam int page,
                                                     @RequestParam String name) {
        log.info("------getDetailSearchedMealboxList------");
        Page<Mealbox> mealboxPage = mealboxService.getDetailSearchedMealboxes(page, mealboxListSize, name);
        List<Mealbox> mealboxes = mealboxPage.getContent();
        List<OnlyMealboxResponseDto> response = mapper.mealboxListToMealboxResponseDtoList(mealboxes);

        PageInfo pageInfo = new PageInfo(mealboxPage.getNumber()+1, mealboxPage.getSize(),
                (int) mealboxPage.getTotalElements());
        return new ResponseEntity(new MultiResponseDto(response, pageInfo), HttpStatus.OK);
    }
}