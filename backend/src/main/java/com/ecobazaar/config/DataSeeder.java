package com.ecobazaar.config;

import com.ecobazaar.model.Product;
import com.ecobazaar.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the H2 database with the same products shown in ProductSection.jsx
 * so the frontend can immediately fetch real data from the backend.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    private final ProductRepository productRepository;

    public DataSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            logger.info("Database already seeded — skipping.");
            return;
        }

        List<Product> products = List.of(
                product("Bamboo Toothbrush Set (Pack of 4)", 299.0, 499.0, 9.2,
                        "Personal Care",
                        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&q=80",
                        "Best Seller", "badge-amber", true, 4.7, 2341, 500,
                        "Eco-friendly bamboo toothbrushes — biodegradable handles, BPA-free bristles."),

                product("Organic Cotton Tote Bag - Natural Beige", 449.0, 699.0, 9.8,
                        "Bags",
                        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&q=80",
                        "Eco Pick", "badge-green", true, 4.9, 1876, 300,
                        "100% GOTS certified organic cotton. Reusable, durable and stylish."),

                product("Solar-Powered Desk Lamp with USB", 1299.0, 1999.0, 8.9,
                        "Energy Efficient",
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&q=80",
                        "Top Rated", "badge-primary", false, 4.6, 934, 150,
                        "Charge via solar panel or USB. Perfect for eco-conscious workspaces."),

                product("Reusable Beeswax Food Wraps (6 pack)", 599.0, 899.0, 9.6,
                        "Home",
                        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop&q=80",
                        "Zero Waste", "badge-teal", true, 4.8, 3012, 400,
                        "Natural alternative to plastic wrap. Keeps food fresh & reduces waste."),

                product("Plant-Based Laundry Detergent 2L", 399.0, 599.0, 8.7,
                        "Home Essentials",
                        "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400&h=400&fit=crop&q=80",
                        "Natural", "badge-lime", false, 4.5, 1543, 200,
                        "Vegan, cruelty-free formula. Tough on stains, gentle on the planet."),

                product("Recycled Aluminum Water Bottle 750ml", 799.0, 1199.0, 9.5,
                        "Sustainable",
                        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&q=80",
                        "Fan Fave", "badge-purple", true, 4.9, 4521, 600,
                        "Made from 100% recycled aluminum. BPA-free, keeps drinks cold 24hrs."),

                product("Compostable Kitchen Bin Bags (100pcs)", 349.0, 499.0, 9.1,
                        "Home Essentials",
                        "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&h=400&fit=crop&q=80",
                        "New", "badge-orange", false, 4.4, 876, 800,
                        "100% compostable and biodegradable bin bags. No plastic guilt!"),

                product("Hemp Seed Face Moisturizer SPF 30", 649.0, 999.0, 9.3,
                        "Personal Care",
                        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&q=80",
                        "Organic", "badge-green-dark", true, 4.7, 2109, 250,
                        "Hemp-derived moisturizer with SPF 30. Vegan, cruelty-free skincare."));

        productRepository.saveAll(products);
        logger.info("✅ Seeded {} products into database.", products.size());
    }

    private Product product(String name, Double price, Double originalPrice, Double ecoScore,
            String category, String imageUrl, String badge, String badgeColor,
            boolean assured, Double rating, Integer reviewCount, Integer stock,
            String description) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setOriginalPrice(originalPrice);
        p.setEcoScore(ecoScore);
        p.setCategory(category);
        p.setImageUrl(imageUrl);
        p.setBadge(badge);
        p.setBadgeColor(badgeColor);
        p.setAssured(assured);
        p.setRating(rating);
        p.setReviewCount(reviewCount);
        p.setStockQuantity(stock);
        p.setDescription(description);
        return p;
    }
}
