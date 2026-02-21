import "./Footer.css";

const footerLinks = {
  "About EcoBazaar": [
    "Our Story",
    "Sustainability Pledge",
    "Eco Certification",
    "Press Room",
    "Careers",
    "Blog",
  ],
  "Customer Service": [
    "Help Center",
    "Track Your Order",
    "Returns & Exchanges",
    "Shipping Policy",
    "FAQ",
    "Contact Us",
  ],
  Shop: [
    "New Arrivals",
    "Best Sellers",
    "Eco Deals",
    "Gift Cards",
    "Bulk Orders",
    "Become a Seller",
  ],
  Policies: [
    "Privacy Policy",
    "Terms of Use",
    "Cookie Policy",
    "Refund Policy",
    "Carbon Offset Policy",
  ],
};

function Footer() {
  return (
    <footer className="footer-main">
      {/* Seller / App CTA strip */}
      <div className="footer-cta-strip">
        <div className="footer-cta-container">
          {[
            {
              emoji: "🏪",
              title: "Sell on EcoBazaar",
              sub: "Reach millions of eco-conscious buyers",
            },
            {
              emoji: "📱",
              title: "Get the App",
              sub: "Download for Android & iOS",
            },
            {
              emoji: "🎁",
              title: "Gift Cards",
              sub: "Perfect for the eco-lover in your life",
            },
          ].map(({ emoji, title, sub }) => (
            <div key={title} className="cta-item">
              <span className="cta-emoji">{emoji}</span>
              <p className="cta-title">{title}</p>
              <p className="cta-sub">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="brand-text">
                Eco<span className="brand-highlight">Bazaar</span>
              </span>
              <span className="brand-icon">🌱</span>
            </div>
            <p className="brand-description">
              India's largest eco-friendly marketplace. Committed to making
              sustainable living accessible, affordable, and beautiful for
              everyone.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span> +91 98765 43210
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span> hello@ecobazaar.in
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span> Bengaluru, Karnataka,
                India
              </div>
            </div>
            <div className="social-links">
              {["📘", "🐦", "📷", "▶️"].map((icon, i) => (
                <a key={i} href="#" className="social-icon">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-links-section">
              <h4 className="footer-section-title">{title}</h4>
              <ul className="footer-links-list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      <span className="link-arrow">›</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <p className="newsletter-title">Subscribe to Eco Newsletter</p>
            <p className="newsletter-subtitle">
              Weekly deals, eco tips & sustainability news
            </p>
          </div>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="copyright">
            <span className="leaf-icon">🍃</span>© 2024 EcoBazaar. All rights
            reserved. Made with 💚 for the planet.
          </div>
          <div className="payment-info">
            <div className="secure-badge">
              <span className="shield-icon">🛡️</span> 100% Secure Payments
            </div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/72px-Mastercard-logo.svg.png"
              alt="Mastercard"
              className="payment-logo"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
              alt="Visa"
              className="payment-logo"
            />
            <span className="payment-method">UPI</span>
            <span className="payment-method">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
