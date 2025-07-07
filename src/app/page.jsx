"use client";
import Image from "next/image";
import laptop from "./images/laptop.png";
import smartphones from "./images/smartphones.png";
import cameras from "./images/cameras.png";
import headphone from "./images/headphone.png";
import tablets from "./images/tablets.png";
import smartwatches from "./images/smartwatches.png";
import apple from "./images/apple.png";
import hp from "./images/hp.png";
import dell from "./images/dell.png";
import lenevo from "./images/lenevo.png";
import samsung from "./images/samsung.png";
import heroImage1 from "./images/herosectionImage1.png";
import newArrivalsImageMouse from "./images/newArrivalsImageMouse.png";
import newArrivalsImageHeadset from "./images/newArrivalsImageHeadset.png";
import logo from "./images/logo.png";
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
              <Image src={heroImage1} alt="Dell Laptop" />
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
              <Image src={newArrivalsImageMouse} alt="Mouse" />
              <h3>Mouse</h3>
              <p className="rating">
                ★★★★★ <span>(3 reviews)</span>
              </p>
              <p className="price">$700</p>
            </div>
          </Link>
          <Link href="/products">
            <div className="product-card">
              <Image src={laptop} alt="Laptop" />
              <h3>Laptop</h3>
              <p className="rating">
                ★★★★★ <span>(10 reviews)</span>
              </p>
              <p className="price">$500</p>
            </div>
          </Link>

          <Link href="/products">
            <div className="product-card">
              <Image src={headphone} alt="Headphones" />
              <h3>Headphones</h3>
              <p className="rating">
                ★★★★★ <span>(15 reviews)</span>
              </p>
              <p className="price">$240</p>
            </div>
          </Link>

          <Link href="/products">
            <div className="product-card">
              <Image src={newArrivalsImageHeadset} alt="Headset" />
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
                  <Image src={laptop} alt="laptop" />
                </div>
                <h3>Laptop</h3>
              </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <Image src={smartphones} alt="laptop" />
              </div>
              <h3>Smart Phones</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <Image src={cameras} alt="laptop" />
              </div>
              <h3>Cameras</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <Image src={headphone} alt="laptop" />
              </div>
              <h3>Headphones</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <Image src={tablets} alt="laptop" />
              </div>
              <h3>Tablets</h3>
            </div>
            </Link>
            <Link href="/products">
            <div id="card">
              <div id="image-background">
                <Image src={smartwatches} alt="laptop" />
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
          <Image src={smartphones} alt="smartphone" />

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
          <Image src={laptop} alt="Laptop" />
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
          <Image src={tablets} alt="Monitor" />
        </div>
      </section>
      <section id="section-featured-brands">
        <div id="home-featured-brands">
          <h1>Featured Brands</h1>
          <div id="featured-brands-card-container">
            <div id="featured-brands-card">
              <Image src={apple} alt="apple" />
            </div>
            <div id="featured-brands-card">
              <Image src={hp} alt="apple" />
            </div>
            <div id="featured-brands-card">
              <Image src={dell} alt="apple" />
            </div>
            <div id="featured-brands-card">
              <Image src={lenevo} alt="apple" />
            </div>
            <div id="featured-brands-card">
              <Image src={samsung} alt="apple" />
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
            <Image src={logo} alt="logo" />
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
