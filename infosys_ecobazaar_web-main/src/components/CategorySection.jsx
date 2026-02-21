import "./CategorySection.css";

const categories = [
  { icon: "🍎", label: "Grocery", colorClass: "cat-green" },
  { icon: "💧", label: "Personal Care", colorClass: "cat-blue" },
  { icon: "👕", label: "Fashion", colorClass: "cat-purple" },
  { icon: "🏠", label: "Home", colorClass: "cat-amber" },
  { icon: "🍃", label: "Organic", colorClass: "cat-green-dark" },
  { icon: "⚡", label: "Energy Efficient", colorClass: "cat-yellow" },
  { icon: "📺", label: "Electronics", colorClass: "cat-indigo" },
  { icon: "🌱", label: "Organic Food", colorClass: "cat-lime" },
  { icon: "💨", label: "Air & Water", colorClass: "cat-cyan" },
  { icon: "🛍️", label: "Zero Waste", colorClass: "cat-teal" },
  { icon: "🚴", label: "Sports", colorClass: "cat-orange" },
  { icon: "📖", label: "Learning", colorClass: "cat-rose" },
];

function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-container">
        <div className="category-header">
          <h2 className="category-title">Shop by Category</h2>
          <a href="#" className="view-all-link">
            View All →
          </a>
        </div>

        <div className="category-grid">
          {categories.map(({ icon, label, colorClass }) => (
            <button key={label} className="category-item">
              <div className={`category-icon-wrapper ${colorClass}`}>
                <span className="category-icon">{icon}</span>
              </div>
              <span className="category-label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
