package com.example.server.mealbox.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.mealbox.dto.MealboxPatchDto;
import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.entity.MealboxProduct;
import com.example.server.mealbox.exception.MealboxException;
import com.example.server.mealbox.repository.MealboxRepository;

import com.example.server.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Transactional
@Service
public class MealboxService {
    private final MealboxRepository mealboxRepository;
    private final ProductService productService;

    public MealboxService(MealboxRepository mealboxRepository, ProductService productService) {
        this.mealboxRepository = mealboxRepository;
        this.productService = productService;
    }

    public Mealbox createMealboxAndMealboxProduct(Mealbox mealbox, List<MealboxPostDto.Product> mealboxDtoProducts){
        mealboxDtoProducts.forEach(mealboxDtoProduct -> {
            new MealboxProduct(mealboxDtoProduct.getQuantity(),
                            productService.findProductById(mealboxDtoProduct.getProductId()),
                            mealbox);
        });
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

    public Mealbox updateMealbox(Mealbox mealboxPatcher, Long mealboxId,
                                 List<MealboxPatchDto.Product> mealboxDtoProducts){
        Mealbox mealbox = findMealboxById(mealboxId);
        mealbox.patchMealbox(mealboxPatcher.getName(), mealboxPatcher.getTotalPrice(),
                mealboxPatcher.getTotalKcal(), mealboxPatcher.getTotalWeight());

        mealboxDtoProducts.forEach(mealboxDtoProduct -> {
            new MealboxProduct(mealboxDtoProduct.getQuantity(),
                    productService.findProductById(mealboxDtoProduct.getProductId()),
                    mealbox);
        });

        return mealboxRepository.save(mealbox);
    }

    public Page<Mealbox> findAdminMadeMealboxes(int page, int size){
        PageRequest pageRequest = PageRequest.of(page-1, size);
        return mealboxRepository.findAllByMealboxInfoIsNot(pageRequest, Mealbox.MealboxInfo.CUSTOM_MEALBOX);
    }

}
