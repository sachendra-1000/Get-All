

export default function Features() {
    return(
        <>
        
           <section id="features-section" className="container">
        <h1 id="features-title">Our Features</h1>

        <div id="features-grid">
         
            <div className="feature-card">
                <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75l7.5-7.5-7.5-7.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12l-7.5 7.5-7.5-7.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-3-3m3 3l3-3m-3 3V3m0 0l-3 3m3-3l3 3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-3-3m3 3l3-3m-3 3V3m0 0l-3 3m3-3l3 3" />
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                    </svg>
                </div>
                <h2 className="feature-title">Fast Delivery</h2>
                <p className="feature-description">Get your orders delivered to your doorstep quickly and efficiently.</p>
            </div>

          
            <div className="feature-card">
                <div className="feature-icon">
                    <i className="fa-solid fa-credit-card"></i>
                </div>
                <h2 className="feature-title">Secure Payments</h2>
                <p className="feature-description">Shop with confidence using our secure and encrypted payment gateways.</p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">
                    <i className="fa-solid fa-user-tie"></i>
                </div>
                <h2 className="feature-title">Admin Control Panel</h2>
                <p className="feature-description">Shop with confidence using our secure and encrypted payment gateways.</p>
            </div>

           
            <div className="feature-card">
                <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.79 9-8.5S16.97 3.5 12 3.5 3 7.29 3 12c0 1.2.22 2.36.63 3.45L3 21l5.5-1.5c1.09.41 2.25.63 3.45.63z" />
                    </svg>
                </div>
                <h2 className="feature-title">24/7 Customer Support</h2>
                <p className="feature-description">Our dedicated support team is always here to assist you.</p>
            </div>

           
            <div className="feature-card">
                <div className="feature-icon">
                    <i className="fa-solid fa-file-invoice"></i>
                </div>
                <h2 className="feature-title">Seller Account Seo Optimization</h2>
                <p className="feature-description">Shop with confidence using our secure and encrypted payment gateways.</p>
            </div>

            
            <div className="feature-card">
                <div className="feature-icon">
                    <i className="fa-solid fa-star"></i>
                </div>
                <h2 className="feature-title">Quality Products</h2>
                <p className="feature-description">We offer only the best quality products from trusted brands.</p>
            </div>

          
            <div className="feature-card">
                <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </div>
                <h2 className="feature-title">Easy Returns</h2>
                <p className="feature-description">Hassle-free returns and exchanges for a worry-free shopping experience.</p>
            </div>

            
            <div className="feature-card">
                <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l-.75.682A.75.75 0 0010.5 19.5h3a.75.75 0 00.563-1.818l-.75-.682m-2.25-1.5V12.75l-4.5 9V5.25a2.25 2.25 0 013-2.121M12 6V3m0 3V2.25A2.25 2.25 0 0015 4.5V21l-4.5-9L12 6zm-3-2.818L6.75 6.682A.75.75 0 005.25 7.5h-3a.75.75 0 00-.563-1.818l-.75-.682" />
                    </svg>
                </div>
                <h2 className="feature-title">Price Match Guarantee</h2>
                <p className="feature-description">We ensure you get the best value with our price match policy.</p>
            </div>
        </div>
    </section>
        </>
    );
}