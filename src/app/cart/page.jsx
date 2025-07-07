"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

export default function CartSection({ cartItems = [], setCartItems }) {
    // Initialize cartItems from localStorage if not provided via props
    const [localCartItems, setLocalCartItems] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            try {
                return savedCart ? JSON.parse(savedCart) : [];
            } catch (e) {
                console.error("Failed to parse cart items from localStorage:", e);
                return [];
            }
        }
        return [];
    });

    const router = useRouter();

    // Use cartItems from props if provided, otherwise use localCartItems
    const effectiveCartItems = Array.isArray(cartItems) && cartItems.length > 0 ? cartItems : localCartItems;

    // Sync localCartItems with localStorage when they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cartItems', JSON.stringify(effectiveCartItems));
            } catch (error) {
                console.error('Failed to save cart items to localStorage:', error);
            }
        }
        // If setCartItems is provided, update the parent component's state
        if (setCartItems) {
            setCartItems(effectiveCartItems);
        }
    }, [effectiveCartItems, setCartItems]);

    // Sync localCartItems with cartItems prop when it changes
    useEffect(() => {
        if (Array.isArray(cartItems) && cartItems.length > 0) {
            setLocalCartItems(cartItems);
        }
    }, [cartItems]);

    // Function to increase item quantity
    const increaseQuantity = (id, selectedColor = '', selectedSize = '', selectedStorage = '') => {
        setLocalCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize &&
                item.selectedStorage === selectedStorage
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Function to decrease item quantity
    const decreaseQuantity = (id, selectedColor = '', selectedSize = '', selectedStorage = '') => {
        setLocalCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize &&
                item.selectedStorage === selectedStorage
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    // Function to remove an item from the cart
    const removeItem = (id, selectedColor = '', selectedSize = '', selectedStorage = '') => {
        setLocalCartItems(prevItems =>
            prevItems.filter(item =>
                !(item.id === id &&
                  item.selectedColor === selectedColor &&
                  item.selectedSize === selectedSize &&
                  item.selectedStorage === selectedStorage)
            )
        );
    };

    // Calculate order summary
    const subtotal = Array.isArray(effectiveCartItems)
        ? effectiveCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        : 0;
    const shipping = subtotal > 0 ? 5.00 : 0;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    // Handle Proceed to Checkout
    const handleCheckout = () => {
        if (effectiveCartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Show confirmation dialog for Cash on Delivery
        if (window.confirm('Confirm your order with Cash on Delivery?')) {
            try {
                const order = {
                    id: `ORD${uuidv4().slice(0, 8).toUpperCase()}`,
                    customerName: 'John Doe', // Replace with actual user data from next-auth if available
                    customerEmail: 'john.doe@example.com',
                    shippingAddress: '123 Main Street, Springfield, IL 62701',
                    date: new Date().toISOString().split('T')[0],
                    status: 'Pending',
                    items: effectiveCartItems.map(item => ({
                        id: item.id,
                        name: item.productName,
                        price: item.price,
                        quantity: item.quantity,
                        selectedColor: item.selectedColor || '',
                        selectedSize: item.selectedSize || '',
                        selectedStorage: item.selectedStorage || ''
                    })),
                    total: parseFloat(total.toFixed(2))
                };

                // Save order to localStorage for both user and seller
                if (typeof window !== 'undefined') {
                    const savedOrders = localStorage.getItem('customerOrders');
                    const orders = savedOrders ? JSON.parse(savedOrders) : [];
                    orders.push(order);
                    localStorage.setItem('customerOrders', JSON.stringify(orders));
                }

                // Clear cart
                setLocalCartItems([]);
                localStorage.setItem('cartItems', JSON.stringify([]));
                if (setCartItems) {
                    setCartItems([]);
                }

                // Redirect to userProfile.jsx Order History tab
                router.push('/userProfile?tab=order-history');
            } catch (error) {
                console.error('Failed to process checkout:', error);
                alert('Error placing order. Please try again.');
            }
        }
    };

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <h1 className="text-center text-3xl font-bold my-6">Your Shopping Cart</h1>

            <div className="cart-container max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8">
                <div className="cart-items flex-grow md:w-2/3">
                    {effectiveCartItems.length === 0 ? (
                        <p id="myproduct_no_products_message" className="text-center text-gray-600">
                            Your cart is empty. Start shopping!
                        </p>
                    ) : (
                        effectiveCartItems.map((item, index) => (
                            <div
                                className="cart-item bg-white rounded-lg shadow-md p-4 mb-4 flex items-center space-x-4"
                                key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}-${item.selectedStorage || ''}-${index}`}
                            >
                                <img
                                    src={item.imageUrl || item.image || 'https://placehold.co/200x200/CCCCCC/666666?text=Product+Image'}
                                    alt={item.productName || item.name || 'Product Image'}
                                    className="cart-item-image w-24 h-24 object-cover rounded-md"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/200x200/CCCCCC/666666?text=Image+Not+Available';
                                    }}
                                />
                                <div className="cart-item-details flex-grow">
                                    <h3 className="text-lg font-semibold">{item.productName || item.name || 'Unnamed Product'}</h3>
                                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                                    {item.selectedColor && <p className="text-gray-600 text-sm">Color: {item.selectedColor}</p>}
                                    {item.selectedSize && <p className="text-gray-600 text-sm">Size: {item.selectedSize}</p>}
                                    {item.selectedStorage && <p className="text-gray-600 text-sm">Storage: {item.selectedStorage}</p>}
                                    <div className="cart-item-quantity flex items-center mt-2">
                                        <button
                                            onClick={() => decreaseQuantity(item.id, item.selectedColor, item.selectedSize, item.selectedStorage)}
                                            className="decrease-quantity bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            readOnly
                                            className="w-12 text-center border-t border-b border-gray-300 py-1"
                                        />
                                        <button
                                            onClick={() => increaseQuantity(item.id, item.selectedColor, item.selectedSize, item.selectedStorage)}
                                            className="increase-quantity bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-subtotal text-lg font-bold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    onClick={() => removeItem(item.id, item.selectedColor, item.selectedSize, item.selectedStorage)}
                                    className="cart-item-remove text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    <i className="fas fa-times-circle"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-summary bg-white rounded-lg shadow-md p-6 md:w-1/3">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    <div className="summary-row flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-row flex justify-between mb-4">
                        <span>Tax ({taxRate * 100}%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total flex justify-between items-center text-xl font-bold border-t pt-4">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="cart-actions mt-6 flex flex-col space-y-3">
                        <Link href="/products" >
                        <button className="continue-shopping bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">
                            Continue Shopping
                        </button>
                        </Link>
                        <button 
                            className="checkout bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}