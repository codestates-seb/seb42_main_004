package com.example.server.init;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.cart.entity.Cart;
import com.example.server.image.entity.ImageInfo;
import com.example.server.image.entity.MealboxImage;
import com.example.server.image.entity.ProductImage;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.entity.MealboxProduct;
import com.example.server.mealbox.repository.MealboxRepository;
import com.example.server.mealbox.service.MealboxService;
import com.example.server.mealboxSet.entity.MealboxSet;
import com.example.server.mealboxSet.entity.MealboxSetter;
import com.example.server.mealboxSet.repository.MealboxSetRepository;
import com.example.server.product.entity.Product;
import com.example.server.product.repository.ProductRepository;
import com.example.server.product.service.ProductService;
import com.example.server.user.data.Address;
import com.example.server.user.data.DeliveryInformation;
import com.example.server.user.data.UserStatus;
import com.example.server.user.entity.User;
import com.example.server.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.matcher.FilterableList;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InitDB {

  private final InitUser initUser;
  private final InitProduct initProduct;
  private final InitMealbox initMealbox;
  private final InitMealboxSet initMealboxSet;

  // @PostConstruct
  public void init() {
    initUser.UserInit();
    initProduct.ProductInit();
    initMealbox.MealboxInit();
    initMealboxSet.MealboxSetInit();
  }

}

@Component
@Transactional
@RequiredArgsConstructor
class InitUser {

  private final CustomAuthorityUtils authorityUtils;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public void UserInit() {
    List<User> userList = new ArrayList<>();

    User admin = User.builder().id(1L).email("admin@gmail.com").password(
        passwordEncoder.encode("admin")).name("관리자").roles(
            authorityUtils.createRoles("admin@gmail.com"))
        .address(new Address())
        .deliveryInformation(new DeliveryInformation()).status(UserStatus.USER_ADMIN)
        .phoneNumber("010-1234-1234").build();
    Cart cart = Cart.builder().user(admin).build();
    admin.setCart(cart);
    userList.add(admin);
    User user1 = User.builder().id(2L).email("baram2449@naver.com").password(
        passwordEncoder.encode("qwe123")).name("위준성").roles(
            authorityUtils.createRoles("qwe@gmail.com"))
        .address(new Address())
        .deliveryInformation(new DeliveryInformation()).mailKey("QWERQWERQW")
        .phoneNumber("010-1234-1234").build();
    Cart cart2 = Cart.builder().user(user1).build();
    user1.setCart(cart2);
    userList.add(user1);
    User user2 = User.builder().id(3L).email("asd@gmail.com").password(
        passwordEncoder.encode("asd123")).name("진태양").roles(
            authorityUtils.createRoles("asd@gmail.com"))
        .address(new Address())
        .deliveryInformation(new DeliveryInformation())
        .phoneNumber("010-1234-1234").build();
    Cart cart3 = Cart.builder().user(user2).build();
    user2.setCart(cart3);
    userList.add(user2);

    userRepository.saveAll(userList);
  }
}

@Component
@Transactional
@RequiredArgsConstructor
class InitProduct {

  private final ProductRepository productRepository;
  private final String imagePath = "product/default/";

  public void ProductInit() {
    List<Product> products = new ArrayList<>();

    List<String> name = new ArrayList<>(
        Arrays.asList("오트밀", "저지방우유", "닭가슴살", "현미밥", "찐고구마", "상추", "쌈장", "구운 돼지고기(뒷다리)",
            "구운 돼지고기(목살)", "삶은 돼지고기(안심)", "연두부", "양상추샐러드", "아몬드", "무가당 플레인요거트", "블루베리", "닭가슴살샐러드",
            "두유", "계란야채볶음밥", "바나나", "참치샌드위치", "방울토마토", "두부구이", "단호박찜", "삶은달걀", "케일주스", "참치캔",
            "채소샐러드", "양파", "구운양파", "그릭요거트", "위트빅스 시리얼", "단백질쉐이크", "양배추찜", "스크램블에그", "시금치 스크램블에그",
            "닭가슴살만두", "찐감자", "고추장", "바나나쉐이크", "시금치나물", "파프리카", "통밀빵", "사과", "달걀프라이", "익힌 브로콜리",
            "팽이버섯", "쇠고기주먹밥", "병아리콩", "오이", "두부샐러드", "미트리 닭가슴살 소세지", "닭가슴살 샌드위치", "리코타치즈 샐러드",
            "체다치즈"));
    List<Integer> price = new ArrayList<>(
        Arrays.asList(1500, 1200, 1200, 1000, 2000, 1000, 500, 1800, 4000, 4500, 2000, 2000, 500,
            1800, 1600, 2700, 1200, 2800, 1300, 1500, 2000, 1300, 1900, 400, 2000, 2300, 1400, 700,
            700, 1600, 1000, 800, 1000, 1000, 1200, 1200, 500, 200, 3000, 1100, 800, 500, 800, 800,
            1400, 1000, 2200, 1100, 1600, 1700, 2000, 2200, 2300, 800));
    List<Integer> weight = new ArrayList<>(
        Arrays.asList(40, 200, 100, 105, 151, 70, 22, 50, 100, 100, 100, 100, 6, 100, 100, 200, 190,
            225, 118, 160, 300, 110, 125, 50, 240, 50, 100, 100, 100, 120, 16, 100, 70, 100, 105,
            180, 130, 15, 260, 95, 150, 26, 138, 92, 100, 100, 250, 100, 280, 150, 100, 215, 100,
            40));
    List<Integer> kcal = new ArrayList<>(
        Arrays.asList(150, 85, 109, 160, 193, 9, 39, 122, 265, 154, 45, 68, 34, 70, 57, 201, 95,
            360, 105, 323, 54, 118, 48, 77, 114, 105, 78, 42, 42, 140, 54, 102, 19, 200, 144, 250,
            110, 33, 205, 65, 37, 67, 71, 178, 35, 45, 308, 164, 33, 140, 135, 570, 130, 130));

    for (int i = 0; i < 54; i++) {
      int id = i + 1;
      Product product = Product.builder().id((long) id)
          .name(name.get(i))
          .price(price.get(i))
          .weight(weight.get(i))
          .kcal(kcal.get(i))
          .mealboxProducts(new ArrayList<>())
          .build();

      ProductImage image = ProductImage.builder()
          .id((long) id)
          .imageInfo(
              new ImageInfo(String.format("%03d", id) + name.get(i).replace(" ", "") + ".png",
                  name.get(i), imagePath))
          .product(product)
          .build();
      product.setImage(image);

      products.add(product);
    }
    productRepository.saveAll(products);
  }
}

@Component
@Transactional
@RequiredArgsConstructor
class InitMealbox {

  private final MealboxRepository mealboxRepository;
  private final ProductService productService;
  private final String imagePath = "mealbox/default/";

  public void MealboxInit() {
    List<Mealbox> mealboxes = new ArrayList<>();
    long[][] productIdList = { { 30, 15, 2, 32, 16 }, { 37, 21, 12, 51, 41, 54 }, { 4, 10, 27, 6, 29 },
        { 39, 48, 24, 27 }, { 27, 52 }, { 4, 32, 53, 22, 21 }, { 11, 12, 42, 32, 21 }, { 36, 50, 5 },
        { 4, 9, 12 },
        { 30, 31, 15, 1 }, { 42, 3, 12, 32 }, { 47, 27, 21, 28 }, { 1, 2, 15, 25, 43, 12 },
        { 50, 37, 48, 21 }, { 4, 9, 6, 38 }, { 30, 43, 2, 32 }, { 37, 21, 12, 51, 41 }, { 4, 10, 50, 6, 29 },
        { 42, 50, 24, 2 }, { 30, 48, 19 }, { 5, 26, 12, 25 }, { 1, 15, 32 }, { 50, 5, 48, 28 },
        { 4, 26, 6, 38 }, { 19, 2, 27, 24 }, { 37, 16, 11, 49, 42 }, { 32, 35, 21, 53 },
        { 42, 44, 45, 21 }, { 5, 3, 27, 13, 33 }, { 4, 10, 27, 46 }, { 42, 44, 45, 17 }, { 37, 26, 13, 32 },
        { 4, 3, 27, 25 }, { 25, 34, 31 }, { 36, 12, 37 }, { 39, 40, 24 }, { 23, 3, 41, 21, 11 },
        { 4, 9, 6, 28 }, { 25, 34, 42, 43 }, { 26, 27, 37, 41 }, { 4, 22, 6, 38 },
        { 17, 19, 25 }, { 27, 21, 28, 24 }, { 30, 1 }, { 14, 31, 19 }, { 24, 21, 32, 11 }, { 4, 12, 26 },
        { 1, 2, 19 }, { 3, 4, 6, 7, 23 }, { 8, 11, 12, 13, 41 }, { 2, 19, 15 }, { 20, 21 }, { 4, 22, 12, 23 },
        { 14, 15, 24 }, { 20, 25, 33 }, { 4, 22, 12 },
        { 2, 19 }, { 24, 12, 23 }, { 11, 9, 28 }, { 14, 15, 33 }, { 16, 17 }, { 18 }, { 1, 2 }, { 26, 4, 6, 7 },
        { 8, 11, 12, 13 }, { 14, 15 }, { 3, 17, 26 } };

    int[][] quantityList = { { 1, 1, 1, 2, 1 }, { 2, 1, 2, 1, 1, 1 }, { 2, 1, 1, 1, 1 }, { 1, 1, 2, 2 },
        { 1, 1 }, { 1, 2, 1, 1, 1 }, { 1, 1, 2, 2, 1 }, { 1, 1, 2 }, { 2, 1, 2 },
        { 1, 2, 1, 1 }, { 2, 1, 2, 2 }, { 1, 2, 1, 1 }, { 1, 1, 1, 1, 1, 1 }, { 1, 2, 1, 1 }, { 1, 1, 1, 1 },
        { 1, 1, 1, 2 }, { 2, 1, 2, 1, 1 }, { 1, 1, 1, 1, 1 },
        { 1, 1, 2, 1 }, { 1, 1, 1 }, { 1, 1, 2, 1 }, { 2, 1, 1 }, { 1, 1, 1, 1 }, { 1, 2, 1, 1 }, { 1, 1, 2, 1 },
        { 1, 1, 1, 1, 1 }, { 2, 1, 1, 1 },
        { 1, 1, 1, 1 }, { 1, 1, 1, 1, 1 }, { 1, 1, 1, 1 }, { 1, 1, 1, 1 }, { 1, 1, 1, 1 }, { 1, 1, 1, 1 },
        { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 2 }, { 1, 1, 1, 1, 1 }, { 1, 1, 1, 1 }, { 1, 1, 1, 1 }, { 2, 1, 1, 1 },
        { 1, 1, 1, 1 },
        { 1, 1, 1 }, { 2, 1, 1, 2 }, { 1, 1 }, { 1, 1, 1 }, { 2, 1, 2, 1 }, { 1, 1, 1 }, { 1, 1, 1 },
        { 1, 1, 1, 1, 1 }, { 1, 1, 1, 1, 1 }, { 1, 1, 1 }, { 1, 1 }, { 1, 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 },
        { 1, 1, 1 },
        { 1, 1 }, { 2, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1 }, { 1 }, { 1, 1 }, { 1, 1, 1, 1 }, { 1, 1, 1, 1 },
        { 1, 1 }, { 1, 1, 1 } };

    String[] nameList = { "닭가슴살 샐러드 세트", "닭가슴살 소세지 세트A", "삶은 돼지고기(안심) 세트", "고단백질 아침 세트",
        "닭가슴살샌드위치&샐러드 세트", "리코타치즈샐러드&두부구이세트", "연두부 세트", "닭가슴살 만두 세트", "구운 돼지고기(목살) 세트A",
        "시리얼&오트밀 간단 아침 세트", "닭가슴살&단백질쉐이크 세트", "쇠고기주먹밥 세트", "과일&샐러드 아침 세트", "두부샐러드 세트A",
        "구운 돼지고기(목살) 세트B", "드링킹 간단 아침 세트", "닭가슴살 소세지 세트B", "삶은 돼지고기(안심) 세트B",
        "두부샐러드 세트B", "병아리콩&바나나식단세트", "참치&샐러드 세트", "오트밀&단백질쉐이크 세트", "두부샐러드&고구마 세트", "참치 현미밥 세트A",
        "샐러드&달걀 세트", "닭가슴살샐러드&연두부 세트", "리코타치즈샐러드&쉐이크 세트",
        "통밀빵&달걀 프라이 세트", "샐러드&고구마 세트", "샐러드&돼지고기 세트", "통밀빵&두유 세트", "감자&쉐이크 세트", "샐러드&케일주스 세트",
        "시리얼&스크램블에그 세트", "닭가슴살만두&감자 세트", "달걀&쉐이크 세트", "단호박찜&닭가슴살 세트", "구운 돼지고기(목살) 세트C",
        "스크램블에그&케일주스 세트", "샐러드&파프리카 세트", "두부구이 세트", "바나나&케일주스 세트", "달걀&토마토 세트", "요거트&오트밀 세트",
        "시리얼&바나나 세트", "달걀&연두부 세트", "샐러드&참치 세트", "오트밀&바나나 세트", "닭가슴살&단호박찜 세트", "돼지고기뒷다리&샐러드 세트",
        "바나나&우유 세트", "참치샌드위치세트", "단호박찜&두부구이 세트", "요거트&삶은 달걀 세트", "참치 샌드위치&케일주스 세트", "두부구이&샐러드 세트",
        "바나나 우유 세트", "단호박찜&샐러드", "구운 돼지고기(목살) 세트D",
        "장 튼튼 세트", "닭가슴살 두유 세트", "계란야채볶음밥", "오트밀우유 세트", "참치 현미밥 세트B", "구운 돼지 뒷다리살&연두부 세트",
        "블루베리 요거트 세트", "육해공 단백질 세트" };

    for (int i = 0; i < productIdList.length; i++) {
      int id = i + 1;
      Mealbox mealbox = makeMealbox(id, nameList[i], productIdList[i], quantityList[i]);
      if (mealbox != null) {
        mealboxes.add(mealbox);
      }
    }

    mealboxRepository.saveAll(mealboxes);
  }

  private Mealbox makeMealbox(long id, String name, long[] productId, int[] quantity) {
    if (mealboxRepository.existsMealboxByName(name)) {
      return null;
    }

    Mealbox.MealboxInfo mealboxInfo = null;
    switch ((int) id % 3) {
      case 1:
        mealboxInfo = Mealbox.MealboxInfo.BREAKFAST_REC_MEALBOX;
        break;
      case 2:
        mealboxInfo = Mealbox.MealboxInfo.LUNCH_REC_MEALBOX;
        break;
      case 0:
        mealboxInfo = Mealbox.MealboxInfo.DINNER_REC_MEALBOX;
        break;
    }
    Mealbox mealbox = Mealbox.builder().id(id)
        .name(name)
        .mealboxInfo(mealboxInfo)
        .build();

    for (int i = 0; i < productId.length; i++) {
      Product product = productService.findProductById(productId[i]);
      MealboxProduct.makeMealboxProduct(quantity[i], product, mealbox);
    }

    mealbox.calculateDetails();

    MealboxImage image = MealboxImage.builder()
        .id(id)
        .imageInfo(new ImageInfo(String.format("%03d", id) + name.replace(" ", "") + ".png", name,
            imagePath))
        .mealbox(mealbox)
        .build();
    mealbox.setImage(image);

    return mealbox;
  }
}

@Component
@Transactional
@RequiredArgsConstructor
@Slf4j
class InitMealboxSet {
  private final MealboxSetRepository mealboxSetRepository;
  private final MealboxService mealboxService;

  public void MealboxSetInit() {
    List<MealboxSet> mealboxSetList = new ArrayList<>();

    for (int i = 1; i <= 23; i++) {
      MealboxSet mealboxSet = MealboxSet.builder().id((long) i).build();
      for (int j = 0; j < 3; j++) {
        long id = i * 3 - 2 + j;
        if (id == 36)
          id = 24;
        if (id >= 36)
          id--;
        if (id == 68)
          id = 62;

        Mealbox mealbox = mealboxService.findMealboxById(id);
        log.info(mealbox.toString());
        MealboxSetter.makeMealboxSetter(mealbox, mealboxSet);

        mealboxSet.calculateKcal();
      }
      mealboxSetList.add(mealboxSet);
    }

    mealboxSetRepository.saveAll(mealboxSetList);
  }
}