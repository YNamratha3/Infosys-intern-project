package com.ecobazaar.controller;

import com.ecobazaar.model.Product;
import com.ecobazaar.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * GET /api/products
     * Get all products (optionally filter by category or search keyword)
     */
    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double minEcoScore) {

        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(productService.searchProducts(search));
        }
        if (category != null && !category.isBlank()) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }
        if (minEcoScore != null) {
            return ResponseEntity.ok(productService.getEcoFriendlyProducts(minEcoScore));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    /**
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * GET /api/products/top-rated
     */
    @GetMapping("/top-rated")
    public ResponseEntity<List<Product>> getTopRated() {
        return ResponseEntity.ok(productService.getTopRatedProducts());
    }

    /**
     * GET /api/products/latest
     */
    @GetMapping("/latest")
    public ResponseEntity<List<Product>> getLatest() {
        return ResponseEntity.ok(productService.getLatestProducts());
    }
}
