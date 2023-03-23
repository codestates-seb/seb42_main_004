package com.example.server.mealbox.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.image.entity.MealboxImage;
import com.example.server.image.service.ImageService;
import com.example.server.mealbox.dto.MealboxDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.entity.MealboxProduct;
import com.example.server.mealbox.exception.MealboxException;
import com.example.server.mealbox.repository.MealboxRepository;

import com.example.server.product.entity.Product;
import com.example.server.product.service.ProductService;
import com.example.server.utils.CustomPageRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Mealbox createMealboxAndMealboxProduct(Mealbox mealbox, List<MealboxDto.Product> mealboxDtoProducts,
                                                  MultipartFile file){
        createMealboxProducts(mealbox, mealboxDtoProducts);

        uploadImage(mealbox, file);

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
                                 List<MealboxDto.Product> mealboxDtoProducts,
                                 MultipartFile file){
        Mealbox mealbox = findMealboxById(mealboxId);
        mealbox.patchMealbox(mealboxPatcher);

        createMealboxProducts(mealbox, mealboxDtoProducts);

        uploadImage(mealbox, file);

        return mealboxRepository.save(mealbox);
    }

    public Page<Mealbox> findAdminMadeMealboxes(int page, int size, String sort, Sort.Direction dir){
        CustomPageRequest pageRequest = makeCustomPageRequest(page, size, sort, dir);
        return mealboxRepository.findAllByMealboxInfoIsNot(pageRequest, Mealbox.MealboxInfo.CUSTOM_MEALBOX);
    }

    public Page<Mealbox> getSearchedMealboxes(int page, int size, String search) {
        CustomPageRequest pageRequest = CustomPageRequest.of(page-1, size);
        return mealboxRepository.findAllByMealboxInfoIsNotAndNameContains(pageRequest,
                Mealbox.MealboxInfo.CUSTOM_MEALBOX, search);
    }

    /* ####### private 메서드 ####### */

    private void createMealboxProducts(Mealbox mealbox, List<MealboxDto.Product> mealboxDtoProducts){
        mealboxDtoProducts.forEach(mealboxDtoProduct -> {
            Product product = productService.findProductById(mealboxDtoProduct.getProductId());
            MealboxProduct.makeMealboxProduct(mealboxDtoProduct.getQuantity(), product, mealbox);
        });
    }

    private void uploadImage(Mealbox mealbox, MultipartFile file){
        if(file!=null & !file.isEmpty()){
            MealboxImage mealboxImage = imageService.uploadMealboxImage(file,mealbox);
            mealbox.setImage(mealboxImage);
        }
    }

    private CustomPageRequest makeCustomPageRequest(int page, int size, String sort, Sort.Direction direction) {
        CustomPageRequest pageRequest = null;
        if(direction.isAscending()){
            pageRequest =
                    CustomPageRequest.of(page-1, size, Sort.by(sort).ascending());
        } else if(direction.isDescending()){
            pageRequest =
                    CustomPageRequest.of(page-1, size, Sort.by(sort).descending());
        }
        return pageRequest;
    }

}
