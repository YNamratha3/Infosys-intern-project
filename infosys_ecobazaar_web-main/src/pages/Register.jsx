import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const API_BASE = "http://localhost:8080/api";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });

  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState("");
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiError("");
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim())       newErrors.name     = "Enter your name";
    if (!formData.phone)             newErrors.phone    = "Enter mobile number";
    else if (!/^\d{10}$/.test(formData.phone))
                                     newErrors.phone    = "Mobile number must be 10 digits";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
                                     newErrors.email    = "Invalid email address";
    if (!formData.password)          newErrors.password = "Enter password";
    else if (formData.password.length < 6)
                                     newErrors.password = "Password must be at least 6 characters";
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
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     formData.name,
          phone:    formData.phone,
          email:    formData.email || undefined,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
          id: data.id, name: data.name, email: data.email,
          phone: data.phone, role: data.role,
        }));
        setSuccess("Account Created ✅ Redirecting...");
        setTimeout(() => navigate("/"), 1500);
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
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>

        {success && <p className="success-msg">{success}</p>}
        {apiError && <p className="error api-error">{apiError}</p>}

        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Mobile Number</label>
          <div className="phone-group">
            <span>IN +91</span>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label>Email (optional)</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          <p className="hint">Passwords must be at least 6 characters.</p>
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        <p className="signin-text">
          Already have an account? <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default Register;