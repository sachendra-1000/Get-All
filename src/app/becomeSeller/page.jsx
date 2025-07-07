"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [activeSection, setActiveSection] = useState("orders");

  // Product form and data
  const [productForm, setProductForm] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });
  const [productData, setProductData] = useState([]);

  // Customer orders and edit state
  const [customerOrders, setCustomerOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch orders from localStorage
  const fetchOrders = () => {
    if (typeof window !== "undefined") {
      try {
        const savedOrders = localStorage.getItem("customerOrders");
        const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
        if (!Array.isArray(parsedOrders)) {
          console.warn("Invalid orders data in localStorage, resetting to empty array.");
          setCustomerOrders([]);
          localStorage.setItem("customerOrders", JSON.stringify([]));
        } else {
          setCustomerOrders(parsedOrders);
        }
      } catch (e) {
        console.error("Failed to parse orders from localStorage:", e);
        setCustomerOrders([]);
        localStorage.setItem("customerOrders", JSON.stringify([]));
      }
    }
  };

  // Fetch product data from backend server
  const getProductData = async () => {
    try {
      const req = await fetch("http://localhost:7000/");
      if (!req.ok) throw new Error(`HTTP error! status: ${req.status}`);
      const products = await req.json();
      setProductData(products);
      setMessage({ type: "success", text: "Products loaded successfully!" });
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      setMessage({
        type: "error",
        text: `Failed to load products: ${error.message}. Ensure your local server is running.`,
      });
    } finally {
      setTimeout(() => setMessage(""), 5000);
    }
  };

  useEffect(() => {
    getProductData();
    fetchOrders();
  }, []);

  // Save orders to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
      } catch (error) {
        console.error("Failed to save orders to localStorage:", error);
        setMessage({ type: "error", text: "Error saving order updates." });
        setTimeout(() => setMessage(""), 5000);
      }
    }
  }, [customerOrders]);

  // Handle product form input change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: name === "price" || name === "stock" ? parseFloat(value) || "" : value,
    });
  };

  // Save or update product via backend
  const saveProduct = async () => {
    try {
      let response;
      let newProductData = [];
      if (productForm.id) {
        response = await fetch(`http://localhost:7000/${productForm.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productForm),
        });
        if (!response.ok) throw new Error("Failed to update product.");
        newProductData = productData.map((p) =>
          p.id === productForm.id ? productForm : p
        );
        setMessage({ type: "success", text: "Product updated successfully!" });
      } else {
        const newProduct = { ...productForm, id: uuidv4() };
        response = await fetch("http://localhost:7000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        if (!response.ok) throw new Error("Failed to add new product.");
        newProductData = [...productData, newProduct];
        setMessage({ type: "success", text: "Product uploaded successfully!" });
      }
      setProductData(newProductData);
    } catch (error) {
      console.error("Failed to save product:", error);
      setMessage({
        type: "error",
        text: `Error saving product: ${error.message}. Ensure your local server is running and configured correctly.`,
      });
    } finally {
      setProductForm({
        productName: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
      });
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    saveProduct();
  };

  // Begin editing a customer order — fill edit form
  const handleEditOrder = (order) => {
    setEditingOrderId(order.id);
    setEditForm({
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      shippingAddress: order.shippingAddress,
      status: order.status,
      items: order.items,
      total: order.total,
      date: order.date,
    });
  };

  // Cancel order edit
  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditForm({});
  };

  // Handle changes in order edit form inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited customer order
  const handleSaveEdit = (orderId) => {
    setCustomerOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, ...editForm } : order
      )
    );
    setEditingOrderId(null);
    setEditForm({});
    setMessage({ type: "success", text: "Order updated successfully." });
    setTimeout(() => setMessage(""), 3000);
  };

  // Delete order
  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setCustomerOrders((prev) => prev.filter((order) => order.id !== orderId));
      setMessage({ type: "success", text: "Order deleted successfully." });
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Status style helper
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#fff3cd", color: "#856404" };
      case "Delivered":
        return { backgroundColor: "#d4edda", color: "#155724" };
      case "Cancelled":
        return { backgroundColor: "#f8d7da", color: "#721c24" };
      default:
        return {};
    }
  };

  // Navigation button styles
  const styles = {
    container: {
      fontFamily: "Inter, sans-serif",
      padding: "20px",
      backgroundColor: "#f8f8f8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: "100%",
      maxWidth: "1200px",
      paddingBottom: "20px",
      borderBottom: "1px solid #eee",
      marginBottom: "20px",
      textAlign: "center",
    },
    nav: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px",
      width: "100%",
      maxWidth: "1200px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      padding: "10px 0",
      flexWrap: "wrap",
    },
    navButton: {
      background: "none",
      border: "none",
      padding: "12px 25px",
      margin: "5px 10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      color: "#555",
      borderRadius: "6px",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    navButtonActive: {
      backgroundColor: "#43ad67",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)",
    },
    section: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "1200px",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "28px",
      marginBottom: "25px",
      color: "#333",
      borderBottom: "2px solid #eee",
      paddingBottom: "10px",
    },

    // Order Card Styles
    orderCard: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "15px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      color: "#444",
      fontSize: "18px",
      flexWrap: "wrap",
    },
    orderItems: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    orderItem: {
      marginBottom: "5px",
      fontSize: "15px",
      color: "#666",
    },
    orderStatus: {
      padding: "5px 10px",
      borderRadius: "5px",
      fontWeight: "bold",
      fontSize: "14px",
    },
    statusPending: { backgroundColor: "#fff3cd", color: "#856404" },
    statusDelivered: { backgroundColor: "#d4edda", color: "#155724" },
    statusCancelled: { backgroundColor: "#f8d7da", color: "#721c24" },
    statusSelect: {
      padding: "5px",
      borderRadius: "5px",
      fontSize: "14px",
      border: "1px solid #ccc",
    },

    // Form styles
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#444",
      fontSize: "16px",
    },
    input: {
      width: "calc(100% - 22px)",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    textarea: {
      width: "calc(100% - 22px)",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      minHeight: "100px",
      resize: "vertical",
      boxSizing: "border-box",
    },
    select: {
      width: "calc(100% - 22px)",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      boxSizing: "border-box",
      backgroundColor: "#fff",
    },

    submitButton: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "15px 30px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      boxShadow: "0 4px 10px rgba(40, 167, 69, 0.2)",
    },

    messageBox: {
      padding: "10px",
      borderRadius: "5px",
      margin: "15px 0",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorMessage: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
    infoText: {
      fontSize: "16px",
      color: "#555",
      lineHeight: "1.6",
    },

    // Buttons in order card
    buttonGroupLeft: {
      marginTop: "15px",
      display: "flex",
      gap: "12px",
      justifyContent: "flex-start",
    },
    editButton: {
      padding: "6px 12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    deleteButton: {
      padding: "6px 12px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },

    // Responsive tweaks
    "@media (max-width: 768px)": {
      nav: {
        flexDirection: "column",
        padding: "10px",
      },
      navButton: {
        margin: "5px 0",
        width: "90%",
        textAlign: "center",
      },
      section: {
        padding: "20px",
      },
      sectionTitle: {
        fontSize: "24px",
      },
      orderHeader: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "5px",
      },
      input: {
        width: "calc(100% - 22px)",
      },
      textarea: {
        width: "calc(100% - 22px)",
      },
      select: {
        width: "calc(100% - 22px)",
      },
    },
  };

  // Nav button style helper
  const getNavButtonStyles = (sectionName) => ({
    ...styles.navButton,
    ...(activeSection === sectionName ? styles.navButtonActive : {}),
    ...(activeSection === sectionName
      ? { backgroundColor: "#43ad67", color: "#fff" }
      : { backgroundColor: "#fff", color: "#555" }),
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: "36px", color: "#333" }}>Seller Dashboard</h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          Manage your store effectively
        </p>
      </header>

      <nav style={styles.nav}>
        <button
          style={getNavButtonStyles("orders")}
          onClick={() => setActiveSection("orders")}
        >
          Customer Orders
        </button>
        <button
          style={getNavButtonStyles("uploadProduct")}
          onClick={() => setActiveSection("uploadProduct")}
        >
          Upload New Product
        </button>
        <button
          style={getNavButtonStyles("inventory")}
          onClick={() => setActiveSection("inventory")}
        >
          Inventory Management
        </button>
        <button
          style={getNavButtonStyles("analytics")}
          onClick={() => setActiveSection("analytics")}
        >
          Sales Analytics
        </button>
      </nav>

      {message && (
        <div
          style={{
            ...styles.messageBox,
            ...(message.type === "success"
              ? styles.successMessage
              : message.type === "error"
              ? styles.errorMessage
              : { backgroundColor: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" }), // info style
          }}
        >
          {message.text}
        </div>
      )}

      {activeSection === "orders" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Customer Orders</h2>
          {customerOrders.length === 0 && (
            <p style={styles.infoText}>No customer orders found.</p>
          )}
          {customerOrders.map((order) => {
            const isEditing = editingOrderId === order.id;
            return (
              <div key={order.id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <strong>Order ID:</strong> {order.id}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="date"
                        name="date"
                        value={editForm.date || ""}
                        onChange={handleEditChange}
                        style={styles.input}
                      />
                    ) : (
                      order.date
                    )}
                  </div>
                  <div
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      ...getStatusStyle(isEditing ? editForm.status : order.status),
                    }}
                  >
                    {isEditing ? (
                      <select
                        name="status"
                        value={editForm.status || ""}
                        onChange={handleEditChange}
                        style={styles.select}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      order.status
                    )}
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Customer Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="customerName"
                      value={editForm.customerName || ""}
                      onChange={handleEditChange}
                      style={styles.input}
                    />
                  ) : (
                    <span>{order.customerName}</span>
                  )}
                </div>

                <div>
                  <label style={styles.label}>Customer Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="customerEmail"
                      value={editForm.customerEmail || ""}
                      onChange={handleEditChange}
                      style={styles.input}
                    />
                  ) : (
                    <span>{order.customerEmail}</span>
                  )}
                </div>

                <div>
                  <label style={styles.label}>Shipping Address:</label>
                  {isEditing ? (
                    <textarea
                      name="shippingAddress"
                      value={editForm.shippingAddress || ""}
                      onChange={handleEditChange}
                      style={styles.textarea}
                    />
                  ) : (
                    <span>{order.shippingAddress}</span>
                  )}
                </div>

                <div>
                  <label style={styles.label}>Items:</label>
                  {isEditing ? (
                    <textarea
                      name="items"
                      value={editForm.items || ""}
                      onChange={handleEditChange}
                      style={styles.textarea}
                      placeholder='List items as JSON string or description'
                    />
                  ) : (
                    <ul style={styles.orderItems}>
                      {typeof order.items === "string" ? (
                        <li style={styles.orderItem}>{order.items}</li>
                      ) : Array.isArray(order.items) ? (
                        order.items.map((item, idx) => (
                          <li key={idx} style={styles.orderItem}>
                            {typeof item === "string" ? item : JSON.stringify(item)}
                          </li>
                        ))
                      ) : (
                        <li style={styles.orderItem}>{JSON.stringify(order.items)}</li>
                      )}
                    </ul>
                  )}
                </div>

                <div>
                  <label style={styles.label}>Total:</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="total"
                      value={editForm.total || ""}
                      onChange={handleEditChange}
                      style={styles.input}
                    />
                  ) : (
                    <span>${order.total}</span>
                  )}
                </div>

                <div style={styles.buttonGroupLeft}>
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(order.id)}
                        style={{ ...styles.editButton, backgroundColor: "#28a745" }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{ ...styles.editButton, backgroundColor: "#6c757d" }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditOrder(order)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {activeSection === "uploadProduct" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Upload New Product</h2>
          <form onSubmit={handleProductSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="productName" style={styles.label}>
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productForm.productName}
                onChange={handleProductChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="description" style={styles.label}>
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={productForm.description}
                onChange={handleProductChange}
                required
                style={styles.textarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="price" style={styles.label}>
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productForm.price}
                onChange={handleProductChange}
                required
                min="0"
                step="0.01"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="stock" style={styles.label}>
                Stock:
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={productForm.stock}
                onChange={handleProductChange}
                required
                min="0"
                step="1"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="category" style={styles.label}>
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={productForm.category}
                onChange={handleProductChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="imageUrl" style={styles.label}>
                Image URL:
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={productForm.imageUrl}
                onChange={handleProductChange}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Upload Product
            </button>
          </form>
        </section>
      )}

      {activeSection === "inventory" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Inventory Management</h2>
          {productData.length === 0 ? (
            <p style={styles.infoText}>No products in inventory.</p>
          ) : (
            <ul style={{ paddingLeft: "20px" }}>
              {productData.map((product) => (
                <li key={product.id} style={{ marginBottom: "12px" }}>
                  <strong>{product.productName}</strong> — Stock: {product.stock} — Price: $
                  {product.price.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {activeSection === "analytics" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Sales Analytics</h2>
          <p style={styles.infoText}>
            {/* Placeholder for future analytics charts */}
            Analytics section coming soon!
          </p>
        </section>
      )}
    </div>
  );
};

export default App;
