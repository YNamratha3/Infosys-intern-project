import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = "http://localhost:8080/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setApiError("");
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Enter your email or mobile number";
    if (!formData.password) newErrors.password = "Enter your password";
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
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrPhone: formData.email,
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
        navigate("/");
      } else {
        setApiError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setApiError("Cannot connect to server. Please ensure the backend is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign In</h2>

        {apiError && <p className="error api-error">{apiError}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email or Mobile Phone Number</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="password-header">
            <label>Password</label>
            <span>Forgot Password?</span>
          </div>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>

          <div className="remember">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label>Keep me signed in</label>
          </div>
        </form>

        <div className="divider">
          <span>New to EcoBazaar?</span>
        </div>

        <button className="secondary-btn" onClick={() => navigate("/register")}>
          Create your EcoBazaar account
        </button>
      </div>
    </div>
  );
}

export default Login;