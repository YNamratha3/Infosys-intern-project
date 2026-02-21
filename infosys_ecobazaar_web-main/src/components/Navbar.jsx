import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-header">
      {/* Main Navbar */}
      <nav className="navbar-main">
        <div className="navbar-container">
          {/* Logo */}
          <a href="/" className="navbar-logo">
            <span className="logo-text">
              Eco<span className="logo-highlight">Bazaar</span>
            </span>
            <span className="logo-subtitle">Explore Plus 🌱</span>
          </a>

          {/* Search Bar */}
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search for eco-friendly products, brands and more"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn-main">
              🔍
            </button>
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Login */}
            <button className="login-btn" onClick={() => navigate("/login")}>
              <span className="user-icon">👤</span>
              Login
              <span className="chevron-icon">▼</span>
            </button>

            {/* Become a Seller */}
            <button className="seller-btn" onClick={() => navigate("/seller-register")}>
              <span className="seller-label">Become a</span>
              <span className="seller-text">
                <span className="store-icon">🏪</span> Seller
              </span>
            </button>

            {/* More */}
            <button className="more-btn">
              <span className="more-label">More</span>
              <span className="more-text">▼</span>
            </button>

            {/* Divider */}
            <div className="navbar-divider" />

            {/* Cart */}
            <button className="cart-btn">
              <div className="cart-icon-wrapper">
                <span className="cart-icon">🛒</span>
                <span className="cart-badge">{cartCount}</span>
              </div>
              <span className="cart-text">Cart</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Nav */}
      <div className="navbar-secondary">
        <div className="secondary-container">
          {[
            "🛒 Grocery",
            "📱 Mobiles",
            "👗 Fashion",
            "🏠 Home",
            "🌿 Organic",
            "⚡ Electronics",
            "🌱 Eco Certified",
            "♻️ Zero Waste",
            "🎁 Gift Ideas",
            "🔥 Top Deals",
          ].map((item) => (
            <a key={item} href="#" className="secondary-link">
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-item" onClick={() => navigate("/login")}>
            👤 Login
          </button>
          <button className="mobile-menu-item">🏪 Become a Seller</button>
          <button className="mobile-menu-item">📦 More</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
