"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section id="section-hero">
        <div className="hero-section">
          <button className="nav-button left">
            <svg viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="hero-content">
            <div className="hero-text">
              <h1 className="ta-left">
                Introduction the New Dell <br />
                Laptops Series
              </h1>
              <p>Unmatched performance in a sleek design.</p>

              <Link href="/products" className="btn">
                Shop Now
              </Link>
            </div>
            <div className="hero-image">
              <div style={{
                width: '400px',
                height: '300px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                fontSize: '16px'
              }}>
                Dell Laptop Image
              </div>
            </div>
          </div>
          <button className="nav-button right">
            <svg viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <section className="arrivals">
        <h2>New Arrivals</h2>
        <div className="products">
          <Link href="/products">
            <div className="product-card">
              <div style={{
                width: '200px',
                height: '150px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                marginBottom: '10px'
              }}>
                Mouse
              </div>
              <h3>Mouse</h3>
              <p className="rating">
                ★★★★★ <span>(3 reviews)</span>
              </p>
              <p className="price">$700</p>
            </div>
          </Link>
          <Link href="/products">
            <div className="product-card">
              <div style={{
                width: '200px',
                height: '150px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                marginBottom: '10px'
              }}>
                Laptop
              </div>
              <h3>Laptop</h3>
              <p className="rating">
                ★★★★★ <span>(10 reviews)</span>
              </p>
              <p className="price">$500</p>
            </div>
          </Link>

          <Link href="/products">
            <div className="product-card">
              <div style={{
                width: '200px',
                height: '150px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                marginBottom: '10px'
              }}>
                Headphones
              </div>
              <h3>Headphones</h3>
              <p className="rating">
                ★★★★★ <span>(15 reviews)</span>
              </p>
              <p className="price">$240</p>
            </div>
          </Link>

          <Link href="/products">
            <div className="product-card">
              <div style={{
                width: '200px',
                height: '150px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                marginBottom: '10px'
              }}>
                Headset
              </div>
              <h3>Headset</h3>
              <p className="rating">
                ★★★★★ <span>(25 reviews)</span>
              </p>
              <p className="price">$230</p>
            </div>
          </Link>
        </div>
      </section>
      <section id="section-popular-categories">
        <div id="home-popular-categories">
          <h1>Popular Categories</h1>
          <div id="popular-catergories-card-container">
            <Link href="/products">
              <div id="card">
                <div id="image-background">
                  <div style={{
                    width: '100px',
                    height: '80px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    color: '#666'
                  }}>
                    💻
                  </div>
                </div>
                <h3>Laptop</h3>
              </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <div style={{
                  width: '100px',
                  height: '80px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  📱
                </div>
              </div>
              <h3>Smart Phones</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <div style={{
                  width: '100px',
                  height: '80px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  📷
                </div>
              </div>
              <h3>Cameras</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <div style={{
                  width: '100px',
                  height: '80px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  🎧
                </div>
              </div>
              <h3>Headphones</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <div style={{
                  width: '100px',
                  height: '80px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  📱
                </div>
              </div>
              <h3>Tablets</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <div style={{
                  width: '100px',
                  height: '80px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  ⌚
                </div>
              </div>
              <h3>Smart Watches</h3>
            </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="promo-banner">
        <div className="promo-text">
          <h1 className="ta-left">Mega Sales Extravaganza!</h1>
          <p>Unbelievable Deals and Discounts Await You At Our Mega Sales</p>
          <Link href="/products" className="btn">
            Start Shopping
          </Link>
        </div>
        <div className="promo-img-code">
          <div style={{
            width: '300px',
            height: '200px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            color: '#666'
          }}>
            Smartphone Image
          </div>

          <div className="promo-code">
            <p>
              Use Code: <strong>FridayDeal</strong>
            </p>
          </div>
        </div>
      </section>
      <section className="offers">
        <div className="offer-box">
          <div className="offer-text">
            <h2>Laptop Surface Pro 4 Microsoft</h2>
            <p className="ta-left">
              Get ready for unbeatable deals and discounts that will leave you
              amazed
            </p>
            <Link href="/products" className="btn">
              Up to 30% Off
            </Link>
          </div>
          <div style={{
            width: '200px',
            height: '150px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            color: '#666'
          }}>
            Laptop
          </div>
        </div>
        <div className="offer-box">
          <div className="offer-text">
            <h2>Gray HP Flat Screen Monitor</h2>
            <p>
              Limited-time Mega Deals you don't want to miss! Shop now and enjoy
              exclusive discounts on a wide range of products.
            </p>
            <Link href="/products" className="btn">
              Up to 30% Off
            </Link>
          </div>
          <div style={{
            width: '200px',
            height: '150px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            color: '#666'
          }}>
            Monitor
          </div>
        </div>
      </section>
      <section id="section-featured-brands">
        <div id="home-featured-brands">
          <h1>Featured Brands</h1>
          <div id="featured-brands-card-container">
            <div id="featured-brands-card">
              <div style={{
                width: '120px',
                height: '80px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                fontWeight: 'bold'
              }}>
                Apple
              </div>
            </div>
            <div id="featured-brands-card">
              <div style={{
                width: '120px',
                height: '80px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                fontWeight: 'bold'
              }}>
                HP
              </div>
            </div>
            <div id="featured-brands-card">
              <div style={{
                width: '120px',
                height: '80px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                fontWeight: 'bold'
              }}>
                Dell
              </div>
            </div>
            <div id="featured-brands-card">
              <div style={{
                width: '120px',
                height: '80px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                fontWeight: 'bold'
              }}>
                Lenovo
              </div>
            </div>
            <div id="featured-brands-card">
              <div style={{
                width: '120px',
                height: '80px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: '#666',
                fontWeight: 'bold'
              }}>
                Samsung
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newsletter">
        <h2>Newsletter</h2>
        <p>Subscribe to our newsletter to get bonuses for your next purchase</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your email" />
          <button className="btn">Subscribe</button>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-logo">
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
        </div>
        <div className="footer-links">
          <div>
            <h3>Get Help</h3>
            <ul>
              <li>
                <Link href="/products">FAQ</Link>
              </li>
              <li>
                <Link href="/products">Shipping</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Get Products</h3>
            <ul>
              <li>
                <Link href="/products">Laptops</Link>
              </li>
              <li>
                <Link href="/products">Headphones</Link>
              </li>
              <li>
                <Link href="/products">Smartphones</Link>
              </li>
              <li>
                <Link href="/products">Cameras</Link>
              </li>
              <li>
                <Link href="/products">Smartwatches</Link>
              </li>
              <li>
                <Link href="/products">Tablets</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Get About Us</h3>
            <ul>
              <li>
                <Link href="/products">Contact Us</Link>
              </li>
              <li>
                <Link href="/products">Our Blogs</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}