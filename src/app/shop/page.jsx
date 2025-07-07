"use client";
import React from "react";
import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Electronics</h2>
          <p className="text-gray-600 mb-4">Discover the latest in technology</p>
          <Link href="/products" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Shop Electronics
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Fashion</h2>
          <p className="text-gray-600 mb-4">Trendy clothing and accessories</p>
          <Link href="/products" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Shop Fashion
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Home & Garden</h2>
          <p className="text-gray-600 mb-4">Everything for your home</p>
          <Link href="/products" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Shop Home & Garden
          </Link>
        </div>
      </div>
    </div>
  );
}