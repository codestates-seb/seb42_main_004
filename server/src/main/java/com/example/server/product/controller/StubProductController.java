package com.example.server.product.controller;

//@Slf4j
//@Validated
//@RestController
//@RequestMapping
//public class StubProductController {
//
//    //관리자가 개별상품 생성하기
//    @PostMapping("/admin/products")
//    public ResponseEntity createAdminProduct(){
//        log.info("--------createAdminProduct-------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //관리자가 개별상품 수정하기
//    @PatchMapping("/admin/products/{productId}")
//    public ResponseEntity updateAdminProduct(){
//        log.info("--------updateAdminProduct-------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //관리자가 개별상품 삭제하기
//    @DeleteMapping("/admin/products/{productId}")
//    public ResponseEntity deleteAdminProduct(){
//        log.info("--------deleteAdminProduct-------");
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    //관리자가 개별상품리스트 얻기 (추천조합 밀박스 만들때)
//    @GetMapping("/admin/products")
//    public ResponseEntity getAdminProductList (@Positive @RequestParam int page,
//                                               @Positive @RequestParam int size) {
//        log.info("------getAdminProductList-------");
//        ProductResponseDto productResponseDto1 = ProductResponseDto.builder()
//                .productId(1)
//                .productName("사과")
//                .details("국산")
//                .unitKcal(100)
//                .unitPrice(1000)
//                .unitWeight(200)
//                .quantity(1)
//                .build();
//        ProductResponseDto productResponseDto2 = ProductResponseDto.builder()
//                .productId(2)
//                .productName("배")
//                .details("국산")
//                .unitKcal(150)
//                .unitPrice(1500)
//                .unitWeight(200)
//                .quantity(1)
//                .build();
//        List<ProductResponseDto> list = new ArrayList<>();
//        list.add(productResponseDto1);
//        list.add(productResponseDto2);
//        PageInfo pageInfo = new PageInfo(1,9,1,2);
//        return new ResponseEntity(new MultiResponseDto(list, pageInfo), HttpStatus.OK);
//    }
//
//    //소비자가 개별상품리스트 얻기 (커스텀밀박스 만들때)
//    @GetMapping("/products")
//    public ResponseEntity getProductList() {
//        log.info("------getProductList-------");
//        ProductResponseDto productResponseDto1 = ProductResponseDto.builder()
//                .productId(1)
//                .productName("사과")
//                .details("국산")
//                .unitKcal(100)
//                .unitPrice(1000)
//                .unitWeight(200)
//                .build();
//        ProductResponseDto productResponseDto2 = ProductResponseDto.builder()
//                .productId(2)
//                .productName("배")
//                .details("국산")
//                .unitKcal(150)
//                .unitPrice(1500)
//                .unitWeight(200)
//                .build();
//        List<ProductResponseDto> list = new ArrayList<>();
//        list.add(productResponseDto1);
//        list.add(productResponseDto2);
//        PageInfo pageInfo = new PageInfo(1,9,1,2);
//        return new ResponseEntity(new MultiResponseDto(list, pageInfo), HttpStatus.OK);
//    }
//}