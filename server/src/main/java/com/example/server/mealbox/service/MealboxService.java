package com.example.server.mealbox.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.image.entity.MealboxImage;
import com.example.server.image.service.ImageService;
import com.example.server.mealbox.dto.MealboxPatchDto;
import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.entity.MealboxProduct;
import com.example.server.mealbox.exception.MealboxException;
import com.example.server.mealbox.repository.MealboxRepository;

import com.example.server.product.entity.Product;
import com.example.server.product.repository.ProductRepository;
import com.example.server.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Transactional
@Service
@Slf4j
public class MealboxService {
    private final MealboxRepository mealboxRepository;
    private final ProductService productService;
    private final ImageService imageService;

    public MealboxService(MealboxRepository mealboxRepository, ProductService productService, ImageService imageService) {
        this.mealboxRepository = mealboxRepository;
        this.productService = productService;
        this.imageService = imageService;
    }

    public Mealbox createMealboxAndMealboxProduct(Mealbox mealbox, List<MealboxPostDto.Product> mealboxDtoProducts,
                                                  MultipartFile file){
        mealboxDtoProducts.forEach(mealboxDtoProduct -> {
            Product product = productService.findProductById(mealboxDtoProduct.getProductId());

            MealboxProduct.makeMealboxProduct(mealboxDtoProduct.getQuantity(), product, mealbox);

//            productRepository.save(product);

//            log.info(productService.findProductById(mealboxDtoProduct.getProductId()).getMealboxProducts().get(0).getId().toString());
        });

        if(file!=null && !file.isEmpty()){
            MealboxImage mealboxImage = imageService.uploadMealboxImage(file,mealbox);
            mealbox.setImage(mealboxImage);
        }

        return mealboxRepository.save(mealbox);
    }

    public Mealbox findMealboxById(Long mealboxId) {
        Optional<Mealbox> findMealbox = mealboxRepository.findById(mealboxId);
        return findMealbox.orElseThrow(()->new BusinessLogicException(MealboxException.MEALBOX_NOT_FOUND));
    }

    public void deleteMealbox(Long mealboxId){
        Mealbox mealbox = findMealboxById(mealboxId);
        mealboxRepository.delete(mealbox);
    }

    //안됨 -> 수정해야됨
    public Mealbox updateMealbox(Mealbox mealboxPatcher, Long mealboxId,
                                 List<MealboxPatchDto.Product> mealboxDtoProducts,
                                 MultipartFile file){
        Mealbox mealbox = findMealboxById(mealboxId);
        mealbox.patchMealbox(mealboxPatcher.getName(), mealboxPatcher.getPrice(),
                mealboxPatcher.getKcal(), mealboxPatcher.getWeight());

        mealboxDtoProducts.forEach(mealboxDtoProduct -> {
            Product product = productService.findProductById(mealboxDtoProduct.getProductId());
            MealboxProduct.makeMealboxProduct(mealboxDtoProduct.getQuantity(), product, mealbox);
        });

        if(!file.isEmpty()){
            MealboxImage mealboxImage = imageService.uploadMealboxImage(file,mealbox);
            mealbox.setImage(mealboxImage);
        }

        return mealboxRepository.save(mealbox);
    }

    public Page<Mealbox> findAdminMadeMealboxes(int page, int size){
        PageRequest pageRequest = PageRequest.of(page-1, size);
        return mealboxRepository.findAllByMealboxInfoIsNot(pageRequest, Mealbox.MealboxInfo.CUSTOM_MEALBOX);
    }

    public Page<Mealbox> getSearchedMealboxes(int page, int size, String search) {
        PageRequest pageRequest = PageRequest.of(page-1, size);
        return mealboxRepository.findAllByMealboxInfoIsNotAndNameContains(pageRequest,
                Mealbox.MealboxInfo.CUSTOM_MEALBOX, search);
    }

}
