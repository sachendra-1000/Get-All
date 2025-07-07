"use client"
import Link from "next/link";
import Image from "next/image";
import UserButton from "../components/user-button";
import { SessionProvider } from "next-auth/react"

export default function NavigationBar() {
  return (
    <>
      <section id="navigationBar">
        <div id="upperNavigationBar">
          <div className="logoAndSearch">
            <div id="logo">
              <div style={{ 
                width: '120px', 
                height: '40px', 
                backgroundColor: '#43ad67', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                Get-All
              </div>
            </div>
            <div id="searchBar">
              <input
                id="searchInput"
                type="text"
                placeholder="Search Product"
              />
              <span id="selectMenu">
                <select name="cars" id="cars">
                  <option value="blank">All Categories</option>
                  <option value="saab">Clothes</option>
                  <option value="opel">Accesorries</option>
                  <option value="audi">Groceries</option>
                </select>
              </span>
              <span id="searchButtonSpan">
                <div id="searchButtonDiv">
                  <Link href="/products">
                  <button id="searchButton">Search</button>
                  </Link>
                </div>
              </span>
            </div>
          </div>
          <div>

          </div>
          <div className="loginAndSignup">
            <SessionProvider>
              <UserButton />
            </SessionProvider>
            <div id="cartDiv">
              <Link className="cartDivLink" href="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
              <Link className="cartDivLink" href="/cart">
                <h4>Your Cart</h4>
              </Link>
            </div>
          </div>
        </div>
        <div id="lowerNavigationBar">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/collections">Collections</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>

            <li>
              <Link href="/becomeSellerLogIn">Become Seller</Link>
            </li>
            <li>
              <Link href="/products">Products Page</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}