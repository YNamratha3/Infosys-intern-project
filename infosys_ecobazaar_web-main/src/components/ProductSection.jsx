import { useState } from "react";
import "./ProductSection.css";

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set (Pack of 4)",
    price: 299,
    originalPrice: 499,
    rating: 4.7,
    reviews: 2341,
    ecoScore: 9.2,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&q=80",
    badge: "Best Seller",
    badgeColor: "badge-amber",
    category: "Personal Care",
    assured: true,
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag - Natural Beige",
    price: 449,
    originalPrice: 699,
    rating: 4.9,
    reviews: 1876,
    ecoScore: 9.8,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&q=80",
    badge: "Eco Pick",
    badgeColor: "badge-green",
    category: "Bags",
    assured: true,
  },
  {
    id: 3,
    name: "Solar-Powered Desk Lamp with USB",
    price: 1299,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 934,
    ecoScore: 8.9,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&q=80",
    badge: "Top Rated",
    badgeColor: "badge-primary",
    category: "Energy Efficient",
    assured: false,
  },
  {
    id: 4,
    name: "Reusable Beeswax Food Wraps (6 pack)",
    price: 599,
    originalPrice: 899,
    rating: 4.8,
    reviews: 3012,
    ecoScore: 9.6,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop&q=80",
    badge: "Zero Waste",
    badgeColor: "badge-teal",
    category: "Home",
    assured: true,
  },
  {
    id: 5,
    name: "Plant-Based Laundry Detergent 2L",
    price: 399,
    originalPrice: 599,
    rating: 4.5,
    reviews: 1543,
    ecoScore: 8.7,
    image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400&h=400&fit=crop&q=80",
    badge: "Natural",
    badgeColor: "badge-lime",
    category: "Home Essentials",
    assured: false,
  },
  {
    id: 6,
    name: "Recycled Aluminum Water Bottle 750ml",
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 4521,
    ecoScore: 9.5,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&q=80",
    badge: "Fan Fave",
    badgeColor: "badge-purple",
    category: "Sustainable",
    assured: true,
  },
  {
    id: 7,
    name: "Compostable Kitchen Bin Bags (100pcs)",
    price: 349,
    originalPrice: 499,
    rating: 4.4,
    reviews: 876,
    ecoScore: 9.1,
    image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&h=400&fit=crop&q=80",
    badge: "New",
    badgeColor: "badge-orange",
    category: "Home Essentials",
    assured: false,
  },
  {
    id: 8,
    name: "Hemp Seed Face Moisturizer SPF 30",
    price: 649,
    originalPrice: 999,
    rating: 4.7,
    reviews: 2109,
    ecoScore: 9.3,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&q=80",
    badge: "Organic",
    badgeColor: "badge-green-dark",
    category: "Personal Care",
    assured: true,
  },
];

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= Math.floor(rating) ? "star-filled" : "star-empty"}
        >
          ★
        </span>
      ))}
      <span className="rating-text">({rating})</span>
    </div>
  );
}

function EcoScoreBadge({ score }) {
  let cls = "eco-badge-amber";
  if (score >= 9) cls = "eco-badge-green";
  else if (score >= 8) cls = "eco-badge-lime";

  return (
    <span className={`eco-badge ${cls}`}>
      🌱 Eco {score}
    </span>
  );
}

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="product-card-featured">
      {/* Wishlist */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="wishlist-btn"
      >
        {wishlisted ? "❤️" : "🤍"}
      </button>

      {/* Image Area */}
      <div className="product-image-area">
        <img src={product.image} alt={product.name} className="product-img-real" />
        
        {/* Badge */}
        <div className={`product-badge ${product.badgeColor}`}>
          {product.badge}
        </div>

        {/* Assured badge */}
        {product.assured && (
          <div className="assured-badge">
            ⚡ Assured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="product-info-featured">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.name}</h3>

        <div className="rating-section">
          <StarRating rating={product.rating} />
          <p className="reviews-count">
            {product.reviews.toLocaleString()} ratings
          </p>
        </div>

        <div className="price-section">
          <span className="current-price">₹{product.price}</span>
          <span className="original-price">₹{product.originalPrice}</span>
          <span className="discount-percent">-{discount}%</span>
        </div>

        <div className="eco-section">
          <EcoScoreBadge score={product.ecoScore} />
        </div>

        <button
          onClick={handleAddToCart}
          className={`add-cart-btn ${addedToCart ? "added" : ""}`}
        >
          <span className="cart-icon">🛒</span>
          {addedToCart ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function ProductSection() {
  return (
    <section className="featured-products-section">
      <div className="featured-container">
        {/* Section Header */}
        <div className="featured-header">
          <div>
            <h2 className="featured-title">Featured Products</h2>
            <p className="featured-subtitle">
              Handpicked eco-friendly bestsellers
            </p>
          </div>
          <a href="#" className="view-all-link-featured">
            View All →
          </a>
        </div>

        <div className="featured-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
