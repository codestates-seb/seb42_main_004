package com.example.server.mealbox.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/mealboxes")
public class MealboxController {

    @PostMapping
    public ResponseEntity createMealbox() {
        log.info("------createMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{mealboxId}")
    public ResponseEntity getMealbox() {
        log.info("------getMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PatchMapping("/{mealboxId")
    public ResponseEntity updateMealbox() {
        log.info("------updateMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{mealboxId}")
    public ResponseEntity deleteMealbox() {
        log.info("------deleteMealbox------");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMealboxList() {
        log.info("------getMealboxList------");
        return new ResponseEntity(HttpStatus.OK);
    }
}