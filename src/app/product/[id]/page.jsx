"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/product/${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingItemIndex = existingCart.findIndex(item => item.id === product._id || item.id === product.id);
      
      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push({ 
          ...product, 
          id: product._id || product.id,
          quantity: quantity 
        });
      }
      
      localStorage.setItem("cartItems", JSON.stringify(existingCart));
      alert("Product added to cart!");
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding product to cart");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <Link href="/products" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl || "https://placehold.co/500x400/CCCCCC/666666?text=Product+Image"}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "https://placehold.co/500x400/CCCCCC/666666?text=Image+Not+Available";
            }}
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 mb-4">${product.price}</p>
          <p className="text-lg mb-4">Category: {product.category}</p>
          <p className="text-lg mb-6">Stock: {product.stock} available</p>
          
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="text-lg font-medium">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <Link
              href="/cart"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}