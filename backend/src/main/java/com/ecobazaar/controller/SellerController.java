package com.ecobazaar.controller;

import com.ecobazaar.dto.ApiResponse;
import com.ecobazaar.dto.SellerRegisterRequest;
import com.ecobazaar.dto.SellerProductRequest;
import com.ecobazaar.model.Seller;
import com.ecobazaar.service.SellerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/seller")
public class SellerController {

    private final SellerService sellerService;

    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    /**
     * POST /api/seller/register (public)
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SellerRegisterRequest request) {
        try {
            Seller seller = sellerService.register(request);
            return ResponseEntity.ok(
                    new ApiResponse(true,
                            "Seller registration successful! Welcome to EcoBazaar! 🌱", seller));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    /**
     * GET /api/seller/all (admin only)
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    /**
     * GET /api/seller/{id} (admin only)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) {
        return ResponseEntity.ok(sellerService.getSellerById(id));
    }

    /**
     * POST /api/seller/{sellerId}/add-product (seller only)
     */
    @PostMapping("/{sellerId}/add-product")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> addProduct(
            @PathVariable Long sellerId,
            @Valid @RequestBody SellerProductRequest request) {

        try {
            return ResponseEntity.ok(
                    new ApiResponse(
                            true,
                            "Product added successfully",
                            sellerService.addProduct(sellerId, request)
                    )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
}