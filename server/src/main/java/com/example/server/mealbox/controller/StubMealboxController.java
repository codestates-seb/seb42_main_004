package com.example.server.mealbox.controller;

//@Slf4j
//@Validated
//@RestController
//public class StubMealboxController {
//
//    //관리자가 추천조합 밀박스 만들기
//    @PostMapping("/admin/mealboxes")
//    public ResponseEntity createAdminMealbox() {
//        log.info("------createAdminMealbox------");
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
//    //관리자가 추천조합 밀박스 리스트 보기(auth를위해서 다른 요청을 했음) + 첫페이지에 +가있어서 1개가 적어야됨
//    @GetMapping("/admin/mealboxes")
//    public ResponseEntity getAdminMealboxList() {
//        log.info("------getAdminMealboxList------");
//        ProductResponseDto product1 = new ProductResponseDto( 1,1,"사과","맛있는 국내산 사과",200,100,1000,1);
//        ProductResponseDto product2 = new ProductResponseDto(2,2,"배", "맛있는 국내산 배", 150, 100, 1500,1);
//        ProductResponseDto product3 = new ProductResponseDto( 3,3,"고구마", "달달한 고구마", 300, 200, 3000,1);
//        ProductResponseDto product4 = new ProductResponseDto( 4,4, "감자", "강원도 감자",200, 150, 2000,1);
//        List<ProductResponseDto> list1 = new ArrayList<>();
//        list1.add(product1); list1.add(product2);
//        List<ProductResponseDto> list2 = new ArrayList<>();
//        list2.add(product3); list2.add(product4);
//        OnlyMealboxResponseDto mealboxResponseDto1 = new OnlyMealboxResponseDto(1,1,1,"과일밀박스", "달달합니다",
//                true, list1, 1, 350, 200, 2500);
//        OnlyMealboxResponseDto mealboxResponseDto2 = new OnlyMealboxResponseDto(2,2,2,"탄수화물박스", "목막힘주의",
//                true, list2, 1, 500, 350, 5000);
//        List<OnlyMealboxResponseDto> response = new ArrayList<>();
//        response.add(mealboxResponseDto1);
//        response.add(mealboxResponseDto2);
//        PageInfo pageInfo = new PageInfo(1,9,1,2);
//        return new ResponseEntity(new MultiResponseDto(response,pageInfo), HttpStatus.OK);
//    }
//
//    //소비자가 추천조합 밀박스 추천받기
//    //그리고나서 requestBody에서 설문조사한 상태를 주면 DB에서 조사해서 뽑아서쓴다
//    @GetMapping("/mealboxes/rec/survey")
//    public ResponseEntity getSurveyMealbox() {
//        log.info("------getRecommendedMealbox------");
//        ProductResponseDto product1 = new ProductResponseDto( 1,1,"사과","맛있는 국내산 사과",200,100,1000,1);
//        ProductResponseDto product2 = new ProductResponseDto(2,2,"배", "맛있는 국내산 배", 150, 100, 1500,1);
//        ProductResponseDto product3 = new ProductResponseDto( 3,3,"고구마", "달달한 고구마", 300, 200, 3000,1);
//        ProductResponseDto product4 = new ProductResponseDto( 4,4, "감자", "강원도 감자",200, 150, 2000,1);
//        List<ProductResponseDto> list1 = new ArrayList<>();
//        list1.add(product1); list1.add(product2);
//        List<ProductResponseDto> list2 = new ArrayList<>();
//        list2.add(product3); list2.add(product4);
//        OnlyMealboxResponseDto mealboxResponseDto1 = new OnlyMealboxResponseDto(1,1,1,"과일밀박스", "달달합니다",
//                true, list1, 1, 350, 200, 2500);
//        OnlyMealboxResponseDto mealboxResponseDto2 = new OnlyMealboxResponseDto(2,2,2,"탄수화물박스", "목막힘주의",
//                true, list2, 1, 500, 350, 5000);
//        SurveyMealboxResponseDto response = new SurveyMealboxResponseDto(mealboxResponseDto1,mealboxResponseDto2,mealboxResponseDto1);
//        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
//    }
//
//
//
//    //소비자가 전체 추천조합 밀박스 리스트 조회하기
//    @GetMapping("/mealboxes/rec")
//    public ResponseEntity getRecMealboxes() {
//        log.info("------getRecommendedMealbox------");
//        ProductResponseDto product1 = new ProductResponseDto( 1,1,"사과","맛있는 국내산 사과",200,100,1000,1);
//        ProductResponseDto product2 = new ProductResponseDto(2,2,"배", "맛있는 국내산 배", 150, 100, 1500,1);
//        ProductResponseDto product3 = new ProductResponseDto( 3,3,"고구마", "달달한 고구마", 300, 200, 3000,1);
//        ProductResponseDto product4 = new ProductResponseDto( 4,4, "감자", "강원도 감자",200, 150, 2000,1);
//        List<ProductResponseDto> list1 = new ArrayList<>();
//        list1.add(product1); list1.add(product2);
//        List<ProductResponseDto> list2 = new ArrayList<>();
//        list2.add(product3); list2.add(product4);
//        OnlyMealboxResponseDto mealboxResponseDto1 = new OnlyMealboxResponseDto(1,1,1,"과일밀박스", "달달합니다",
//                true, list1, 1, 350, 200, 2500);
//        OnlyMealboxResponseDto mealboxResponseDto2 = new OnlyMealboxResponseDto(2,2,2,"탄수화물박스", "목막힘주의",
//                true, list2, 1, 500, 350, 5000);
//        List<OnlyMealboxResponseDto> response = new ArrayList<>();
//        response.add(mealboxResponseDto1);
//        response.add(mealboxResponseDto2);
//        PageInfo pageInfo = new PageInfo(1,9,1,2);
//        return new ResponseEntity(new MultiResponseDto(response,pageInfo), HttpStatus.OK);
//    }
//}