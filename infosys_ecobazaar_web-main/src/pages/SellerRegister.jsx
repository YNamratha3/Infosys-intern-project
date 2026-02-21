import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerRegister.css";

const API_BASE = "http://localhost:8080/api";

function SellerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: "",
    sellerName: "",
    email: "",
    mobile: "",
    businessAddress: "",
    sustainabilityCategory: "",
    carbonFootprint: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const sustainabilityCategories = [
    "Organic", "Recycled", "Low Carbon", "Eco Certified", "Sustainable Products",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setApiError("");
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.storeName.trim()) newErrors.storeName = "Store/Business name is required";
    if (!formData.sellerName.trim()) newErrors.sellerName = "Seller full name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business address is required";
    if (!formData.sustainabilityCategory) newErrors.sustainabilityCategory = "Please select a sustainability category";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setApiError("");

    try {
      const res = await fetch(`${API_BASE}/seller/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: formData.storeName,
          sellerName: formData.sellerName,
          email: formData.email,
          mobile: formData.mobile,
          businessAddress: formData.businessAddress,
          sustainabilityCategory: formData.sustainabilityCategory,
          carbonFootprint: formData.carbonFootprint ? parseFloat(formData.carbonFootprint) : null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ STORE sellerId for later use (Add Product)
        localStorage.setItem("sellerId", data.data.id);
        setSuccess("Seller Registration Successful! ✅ Welcome to EcoBazaar! 🌱");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setApiError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setApiError("Cannot connect to server. Please ensure the backend is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-register-page">
      <div className="seller-register-container">
        <div className="seller-header">
          <h1>🏪 Become a Seller</h1>
          <p className="seller-subtitle">Join India's largest eco-friendly marketplace</p>
        </div>

        {success && <p style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}>{success}</p>}
        {apiError && <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{apiError}</p>}

        <form onSubmit={handleSubmit} className="seller-form">
          {/* Store Name */}
          <div className="form-group">
            <label className="form-label">1️⃣ Store / Business Name <span className="required">*</span></label>
            <input type="text" name="storeName" value={formData.storeName}
              onChange={handleChange} placeholder="e.g., GreenLife Organics" className="form-input" />
            {errors.storeName && <p className="error-text">{errors.storeName}</p>}
            <p className="helper-text">This will be your store name on EcoBazaar</p>
          </div>

          {/* Seller Name */}
          <div className="form-group">
            <label className="form-label">2️⃣ Seller Full Name <span className="required">*</span></label>
            <input type="text" name="sellerName" value={formData.sellerName}
              onChange={handleChange} placeholder="Enter your full name" className="form-input" />
            {errors.sellerName && <p className="error-text">{errors.sellerName}</p>}
            <p className="helper-text">Responsible contact person</p>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">3️⃣ Email Address <span className="required">*</span></label>
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="your.email@example.com" className="form-input" />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <p className="helper-text">For login and communication</p>
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label className="form-label">4️⃣ Mobile Number <span className="required">*</span></label>
            <input type="tel" name="mobile" value={formData.mobile}
              onChange={handleChange} placeholder="10-digit mobile number"
              className="form-input" maxLength="10" />
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            <p className="helper-text">For verification and support</p>
          </div>

          {/* Business Address */}
          <div className="form-group">
            <label className="form-label">5️⃣ Business Address <span className="required">*</span></label>
            <textarea name="businessAddress" value={formData.businessAddress}
              onChange={handleChange} placeholder="Enter your complete business address"
              className="form-textarea" rows="3" />
            {errors.businessAddress && <p className="error-text">{errors.businessAddress}</p>}
            <p className="helper-text">Your operational address</p>
          </div>

          {/* Sustainability Category */}
          <div className="form-group highlight-field">
            <label className="form-label">
              6️⃣ Sustainability Category 🌱 <span className="required">*</span>
              <span className="badge-special">EcoBazaar Differentiator</span>
            </label>
            <select name="sustainabilityCategory" value={formData.sustainabilityCategory}
              onChange={handleChange} className="form-select">
              <option value="">Select a category</option>
              {sustainabilityCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.sustainabilityCategory && (
              <p className="error-text">{errors.sustainabilityCategory}</p>
            )}
            <p className="helper-text">Choose the primary sustainability focus of your products</p>
          </div>

          {/* Carbon Footprint */}
          <div className="form-group highlight-field">
            <label className="form-label">
              7️⃣ Estimated Carbon Footprint (CO₂e) ⭐
              <span className="badge-special">Core Feature</span>
            </label>
            <input type="number" name="carbonFootprint" value={formData.carbonFootprint}
              onChange={handleChange} placeholder="e.g., 2.5" className="form-input"
              step="0.1" min="0" />
            <p className="helper-text">Estimated carbon footprint per product (kg CO₂e) — Optional but highly valued</p>
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" className="btn-submit-seller" disabled={loading}>
              {loading ? "Registering..." : "🚀 Register as Seller"}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>

        {/* Benefits Section */}
        <div className="seller-benefits">
          <h3>Why Sell on EcoBazaar?</h3>
          <div className="benefits-grid">
            <div className="benefit-item"><span className="benefit-icon">🌍</span><p>Reach eco-conscious customers</p></div>
            <div className="benefit-item"><span className="benefit-icon">📈</span><p>Grow your sustainable business</p></div>
            <div className="benefit-item"><span className="benefit-icon">💚</span><p>Make a positive impact</p></div>
            <div className="benefit-item"><span className="benefit-icon">🎯</span><p>Zero listing fees</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerRegister;
