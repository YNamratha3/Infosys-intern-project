package com.ecobazaar.controller;

import com.ecobazaar.dto.*;
import com.ecobazaar.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * POST /api/auth/register
     * Register a new buyer account
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    /**
     * POST /api/auth/login
     * Login with email/phone + password
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse(false, "Invalid credentials"));
        }
    }

    /**
     * GET /api/auth/check
     * Quick health check for auth (useful for debugging)
     */
    @GetMapping("/check")
    public ResponseEntity<ApiResponse> check() {
        return ResponseEntity.ok(new ApiResponse(true, "Auth service is running ✅"));
    }
}
