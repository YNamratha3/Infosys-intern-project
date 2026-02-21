package com.ecobazaar.dto;

import jakarta.validation.constraints.*;

public class SellerRegisterRequest {

    @NotBlank(message = "Store name is required")
    @Size(max = 200)
    private String storeName;

    @NotBlank(message = "Seller name is required")
    @Size(max = 100)
    private String sellerName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    private String mobile;

    @NotBlank(message = "Business address is required")
    private String businessAddress;

    @NotBlank(message = "Sustainability category is required")
    private String sustainabilityCategory;

    private Double carbonFootprint;

    // Getters & Setters
    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getSustainabilityCategory() {
        return sustainabilityCategory;
    }

    public void setSustainabilityCategory(String sustainabilityCategory) {
        this.sustainabilityCategory = sustainabilityCategory;
    }

    public Double getCarbonFootprint() {
        return carbonFootprint;
    }

    public void setCarbonFootprint(Double carbonFootprint) {
        this.carbonFootprint = carbonFootprint;
    }
}
