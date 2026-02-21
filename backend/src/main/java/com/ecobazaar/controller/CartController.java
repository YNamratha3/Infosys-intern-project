package com.ecobazaar.controller;

import com.ecobazaar.dto.ApiResponse;
import com.ecobazaar.dto.CartRequest;
import com.ecobazaar.model.CartItem;
import com.ecobazaar.security.UserDetailsImpl;
import com.ecobazaar.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * GET /api/cart
     * Get current user's cart
     */
    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(cartService.getCart(userDetails.getId()));
    }

    /**
     * POST /api/cart
     * Add item to cart
     */
    @PostMapping
    public ResponseEntity<CartItem> addToCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody CartRequest request) {
        CartItem item = cartService.addToCart(userDetails.getId(), request);
        return ResponseEntity.ok(item);
    }

    /**
     * PUT /api/cart/{productId}
     * Update quantity of item in cart
     */
    @PutMapping("/{productId}")
    public ResponseEntity<?> updateQuantity(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long productId,
            @RequestBody Map<String, Integer> body) {
        Integer quantity = body.get("quantity");
        CartItem item = cartService.updateQuantity(userDetails.getId(), productId, quantity);
        if (item == null) {
            return ResponseEntity.ok(new ApiResponse(true, "Item removed from cart"));
        }
        return ResponseEntity.ok(item);
    }

    /**
     * DELETE /api/cart/{productId}
     * Remove specific item from cart
     */
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse> removeItem(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long productId) {
        cartService.removeFromCart(userDetails.getId(), productId);
        return ResponseEntity.ok(new ApiResponse(true, "Item removed from cart"));
    }

    /**
     * DELETE /api/cart
     * Clear entire cart
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse> clearCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        cartService.clearCart(userDetails.getId());
        return ResponseEntity.ok(new ApiResponse(true, "Cart cleared"));
    }

    /**
     * GET /api/cart/total
     * Get cart total price
     */
    @GetMapping("/total")
    public ResponseEntity<Map<String, Double>> getTotal(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        double total = cartService.getCartTotal(userDetails.getId());
        return ResponseEntity.ok(Map.of("total", total));
    }
}
