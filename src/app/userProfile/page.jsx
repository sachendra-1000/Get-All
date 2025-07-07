"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import UserName from "../components/user-name";
import UserEmail from "../components/user-email";
import UserAvatar from "../components/user-avatar";
import { SessionProvider } from "next-auth/react";

export default function UserProfile() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
    
    // Load orders from localStorage
    if (typeof window !== "undefined") {
      try {
        const savedOrders = localStorage.getItem("customerOrders");
        const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
        setOrders(parsedOrders);
      } catch (e) {
        console.error("Failed to parse orders from localStorage:", e);
        setOrders([]);
      }
    }
  }, [searchParams]);

  return (
    <SessionProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeTab === "profile" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("order-history")}
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeTab === "order-history" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeTab === "settings" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <UserAvatar />
                      <div>
                        <h3 className="text-lg font-medium">
                          <UserName />
                        </h3>
                        <p className="text-gray-600">
                          <UserEmail />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "order-history" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                  {orders.length === 0 ? (
                    <p className="text-gray-600">No orders found.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">Order #{order.id}</h3>
                              <p className="text-sm text-gray-600">Date: {order.date}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-sm ${
                              order.status === "Delivered" ? "bg-green-100 text-green-800" :
                              order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Items: {Array.isArray(order.items) ? order.items.length : "N/A"}
                          </p>
                          <p className="font-semibold">Total: ${order.total}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Settings</h2>
                  <p className="text-gray-600">Settings panel coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}