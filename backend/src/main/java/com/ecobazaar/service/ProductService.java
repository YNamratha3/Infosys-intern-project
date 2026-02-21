package com.ecobazaar.service;

import com.ecobazaar.model.Product;
import com.ecobazaar.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getTopRatedProducts() {
        return productRepository.findTopRated();
    }

    public List<Product> getLatestProducts() {
        return productRepository.findLatest();
    }

    public List<Product> getEcoFriendlyProducts(Double minEcoScore) {
        return productRepository.findByEcoScoreGreaterThanEqual(minEcoScore);
    }
}
