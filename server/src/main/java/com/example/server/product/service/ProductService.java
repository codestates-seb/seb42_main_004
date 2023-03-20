package com.example.server.product.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.exception.ExceptionCode;
import com.example.server.image.entity.ImageInfo;
import com.example.server.image.entity.ProductImage;
import com.example.server.image.service.ImageService;
import com.example.server.product.entity.Product;
import com.example.server.product.exception.ProductException;
import com.example.server.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ImageService imageService;

    public ProductService(ProductRepository productRepository, ImageService imageService) {
        this.productRepository = productRepository;
        this.imageService = imageService;
    }

    public Product createProduct(Product product, MultipartFile file) {
        //이미지 있으면 업로드
        if(!file.isEmpty()){
            ProductImage image = imageService.uploadProductImage(file, product);
            product.setImage(image);
        }

        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product productPatcher, MultipartFile file){
        Product product = findProductById(productId);
        product.patchProduct(productPatcher.getName(),productPatcher.getWeight(),
                productPatcher.getKcal(), productPatcher.getPrice());
        //이미지 있으면 업로드
        if(file!=null & !file.isEmpty()){
            ProductImage image = imageService.uploadProductImage(file, product);
            product.setImage(image);
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long productId){
        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    public Product findProductById(Long productId){
        Optional<Product> findProduct = productRepository.findById(productId);
        return findProduct.orElseThrow(()->new BusinessLogicException(ProductException.PRODUCT_NOT_FOUND));
    }

    public Page<Product> findProducts(int page, int size, String sort, Sort.Direction direction){
        PageRequest pageRequest = null;
        if(direction.isAscending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).ascending());
        } else if(direction.isDescending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).descending());
        }
        return productRepository.findAll(pageRequest);
    }

    public Page<Product> searchProducts(String search, int page, int size, String sort, Sort.Direction direction){
        PageRequest pageRequest = null;
        if(direction.isAscending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).ascending());
        } else if(direction.isDescending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).descending());
        }
        return productRepository.findAllByNameContains(search, pageRequest);
    }
}
