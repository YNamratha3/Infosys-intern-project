import { useState } from "react";

export default function SellerAddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    stockQuantity: ""
  });

  // TEMPORARY: replace with real sellerId after login
  const sellerId = localStorage.getItem("sellerId");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      alert("Seller not logged in");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/seller/${sellerId}/add-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      alert("Backend not reachable");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seller – Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" onChange={handleChange} />
        <br /><br />

        <input name="price" type="number" placeholder="Price" onChange={handleChange} />
        <br /><br />

        <input name="category" placeholder="Category" onChange={handleChange} />
        <br /><br />

        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
        <br /><br />

        <input
          name="stockQuantity"
          type="number"
          placeholder="Stock Quantity"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}