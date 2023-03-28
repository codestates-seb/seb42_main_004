package com.example.server.product.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.image.entity.ProductImage;
import com.example.server.image.service.ImageService;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.repository.MealboxRepository;
import com.example.server.product.entity.Product;
import com.example.server.product.exception.ProductException;
import com.example.server.product.repository.ProductRepository;
import com.example.server.utils.CustomPageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ImageService imageService;
    private final MealboxRepository mealboxRepository;



    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product productPatcher){
        Product product = findProductById(productId);
        product.patchProduct(productPatcher);
        return productRepository.save(product);
    }

    public void stopSellingProduct(Long productId){
        Product product = findProductById(productId);
        product.deleteProduct();
        productRepository.save(product);

        List<Mealbox> mealboxes = product.getMealboxProducts().stream().map(mealboxProduct ->
                mealboxProduct.getMealbox()).collect(Collectors.toList());
        mealboxes.forEach(mealbox -> mealbox.deleteMealbox());
        mealboxRepository.saveAll(mealboxes);
    }

    public Product findProductById(Long productId){
        Optional<Product> findProduct = productRepository.findById(productId);
        return findProduct.orElseThrow(()->new BusinessLogicException(ProductException.PRODUCT_NOT_FOUND));
    }

    public Page<Product> findProducts(int page, int size, String sort,
                                      Sort.Direction direction, boolean adminPage){
        PageRequest pageRequest = adminPage ?
                makeCustomPageRequest(page, size, sort, direction) : makePageRequest(page, size, sort, direction);
        return productRepository.findAllByForSaleIsTrue(pageRequest);
    }

    public Page<Product> searchProducts(String search, int page, int size, String sort,
                                        Sort.Direction direction){
        if(search.trim().equals("")){
            return new PageImpl<Product>(new ArrayList<>(), PageRequest.ofSize(size),0);
        }

        PageRequest pageRequest = makePageRequest(page, size, sort, direction);
        return productRepository.findAllByForSaleIsTrueAndNameContains(search, pageRequest);
    }

    public void uploadImage(Long productId, MultipartFile file) {
        Product product = findProductById(productId);
        ProductImage image = imageService.uploadProductImage(file, product);
        product.setImage(image);
        productRepository.save(product);
    }

    public void verifyDeletedProduct(Product product) {
        if(product.isForSale() == false){
            throw new BusinessLogicException(ProductException.PRODUCT_NOT_FOR_SALE);
        }
    }

    /* ####### private 메서드 ####### */

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

    private PageRequest makePageRequest(int page, int size, String sort, Sort.Direction direction) {
        PageRequest pageRequest = null;
        if(direction.isAscending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).ascending());
        } else if(direction.isDescending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).descending());
        }
        return pageRequest;
    }

}
