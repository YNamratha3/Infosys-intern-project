package com.ecobazaar.service;

import com.ecobazaar.dto.SellerRegisterRequest;
import com.ecobazaar.dto.SellerProductRequest;
import com.ecobazaar.model.Product;
import com.ecobazaar.model.Seller;
import com.ecobazaar.repository.ProductRepository;
import com.ecobazaar.repository.SellerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;

    public SellerService(SellerRepository sellerRepository,
                         ProductRepository productRepository) {
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
    }

    // ───────────────── SELLER REGISTER ─────────────────

    @Transactional
    public Seller register(SellerRegisterRequest request) {

        if (sellerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered as seller");
        }
        if (sellerRepository.existsByMobile(request.getMobile())) {
            throw new IllegalArgumentException("Mobile number already registered as seller");
        }

        Seller seller = new Seller();
        seller.setStoreName(request.getStoreName());
        seller.setSellerName(request.getSellerName());
        seller.setEmail(request.getEmail());
        seller.setMobile(request.getMobile());
        seller.setBusinessAddress(request.getBusinessAddress());
        seller.setSustainabilityCategory(request.getSustainabilityCategory());
        seller.setCarbonFootprint(request.getCarbonFootprint());
        seller.setStatus(Seller.Status.PENDING);

        return sellerRepository.save(seller);
    }

    // ───────────────── ADMIN METHODS ─────────────────

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Seller not found: " + id));
    }

    // ───────────────── SELLER ADD PRODUCT ─────────────────

    @Transactional
    public Product addProduct(Long sellerId, SellerProductRequest request) {

        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new IllegalArgumentException("Seller not found"));

        Product product = new Product();

        product.setName(request.getName());
        product.setPrice(request.getPrice());

        // REQUIRED FIELDS (nullable = false)
        product.setOriginalPrice(request.getPrice()); // default same as price
        product.setEcoScore(0.0);                     // default eco score

        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        product.setStockQuantity(request.getStockQuantity());

        product.setSeller(seller);

        return productRepository.save(product);
    }
}