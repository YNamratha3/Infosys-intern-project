package com.ecobazaar.repository;

import com.ecobazaar.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    @Query("SELECT p FROM Product p WHERE p.ecoScore >= :minScore ORDER BY p.ecoScore DESC")
    List<Product> findByEcoScoreGreaterThanEqual(@Param("minScore") Double minScore);

    @Query("SELECT p FROM Product p ORDER BY p.rating DESC, p.reviewCount DESC")
    List<Product> findTopRated();

    @Query("SELECT p FROM Product p ORDER BY p.createdAt DESC")
    List<Product> findLatest();
}
