import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerRegister from "./pages/SellerRegister";
import SellerAddProduct from "./pages/SellerAddProduct";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/seller/add-product" element={<SellerAddProduct />} />
      </Routes>
    </div>
  );
}

export default App;