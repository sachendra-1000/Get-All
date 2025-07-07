"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:7000/");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem("cartItems", JSON.stringify(existingCart));
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding product to cart");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center">
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id || product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.imageUrl || "https://placehold.co/300x200/CCCCCC/666666?text=Product+Image"}
                alt={product.productName || "Product"}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x200/CCCCCC/666666?text=Image+Not+Available";
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold text-blue-600 mb-2">${product.price}</p>
                <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
                <div className="flex gap-2">
                  <Link 
                    href={`/product/${product._id || product.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}