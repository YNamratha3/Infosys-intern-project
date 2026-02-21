package com.ecobazaar.service;

import com.ecobazaar.dto.*;
import com.ecobazaar.model.User;
import com.ecobazaar.repository.UserRepository;
import com.ecobazaar.security.JwtTokenProvider;
import com.ecobazaar.security.UserDetailsImpl;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Validate uniqueness
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new IllegalArgumentException("Phone number already registered");
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()
                && userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        // Create user
        User user = new User();
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail() != null && !request.getEmail().isBlank()
                ? request.getEmail()
                : null);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.BUYER);

        user = userRepository.save(user);

        // Generate token
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail() != null ? user.getEmail() : user.getPhone(),
                        request.getPassword()));
        String token = jwtTokenProvider.generateToken(auth);

        return new AuthResponse(token, user.getId(), user.getName(),
                user.getEmail(), user.getPhone(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmailOrPhone(),
                        request.getPassword()));
        String token = jwtTokenProvider.generateToken(auth);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        return new AuthResponse(token, userDetails.getId(), userDetails.getName(),
                userDetails.getEmail(), userDetails.getPhone(), userDetails.getRole());
    }
}
