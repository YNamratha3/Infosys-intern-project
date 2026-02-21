import { useEffect, useState } from "react";
import "./HeroBanner.css";
import heroBannerImg from "../assets/hero-banner.jpg";

const slides = [
  {
    id: 1,
    tag: "🌱 Eco Certified",
    headline: "Shop Green,",
    highlight: "Live Clean",
    sub: "Thousands of sustainable products, delivered to your door.",
    cta1: "Shop Now",
    cta2: "Explore Eco Deals",
    bg: "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.45), transparent)",
    accentColor: "#fbbf24",
  },
  {
    id: 2,
    tag: "⚡ Flash Sale",
    headline: "Up to 60% Off",
    highlight: "Organic Range",
    sub: "Today only — biggest eco deals of the year on natural products.",
    cta1: "Grab Deals",
    cta2: "All Offers",
    bg: "linear-gradient(to right, rgba(30,58,138,0.85), rgba(30,64,175,0.5), transparent)",
    accentColor: "#fbbf24",
  },
  {
    id: 3,
    tag: "🏡 Home Essentials",
    headline: "Zero Waste",
    highlight: "Kitchen Range",
    sub: "Compostable, reusable & eco-friendly products for your home.",
    cta1: "Shop Range",
    cta2: "View All",
    bg: "linear-gradient(to right, rgba(20,83,45,0.85), rgba(22,101,52,0.5), transparent)",
    accentColor: "#fbbf24",
  },
];

function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <div className="hero-wrapper">
      {/* Main Slider */}
      <section className="hero-slider">
        <div className="slider-container">
          <div 
            className="slider-bg" 
            style={{ backgroundImage: `url(${heroBannerImg})` }}
          />
          <div className="slider-overlay" style={{ background: slide.bg }} />

          {/* Content */}
          <div className="slider-content">
            <div className="content-wrapper">
              <span className="tag-badge">{slide.tag}</span>
              <h1 className="hero-headline">
                {slide.headline}
                <br />
                <span style={{ color: slide.accentColor }}>{slide.highlight}</span>
              </h1>
              <p className="hero-sub">{slide.sub}</p>
              <div className="cta-buttons">
                <button className="btn-primary">
                  {slide.cta1} <span>→</span>
                </button>
                <button className="btn-secondary">{slide.cta2}</button>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button onClick={prev} className="arrow-btn arrow-left">
            ‹
          </button>
          <button onClick={next} className="arrow-btn arrow-right">
            ›
          </button>

          {/* Dots */}
          <div className="dots-container">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`dot ${i === current ? "dot-active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Info strip */}
        <div className="info-strip">
          <div className="info-content">
            <span>🚚 Free delivery above ₹499</span>
            <span className="divider">|</span>
            <span>♻️ Every purchase plants a tree</span>
            <span className="divider">|</span>
            <span>🌱 10,000+ eco-certified products</span>
            <span className="divider desktop-only">|</span>
            <span className="desktop-only">⭐ 4.8/5 from 50k+ customers</span>
          </div>
        </div>
      </section>

      {/* Side Promo Banners
      <aside className="side-banners">
        <div className="promo-card promo-green">
          <div>
            <p className="promo-title">Organic Food</p>
            <p className="promo-sub">Up to 40% off</p>
          </div>
          <span className="promo-emoji">🥦</span>
          <button className="promo-link">Shop Now →</button>
        </div>
        <div className="promo-card promo-orange">
          <div>
            <p className="promo-title">Solar Gadgets</p>
            <p className="promo-sub">Save ₹500+</p>
          </div>
          <span className="promo-emoji">☀️</span>
          <button className="promo-link">Shop Now →</button>
        </div>
      </aside> */}
    </div>
  );
}

export default HeroBanner;
