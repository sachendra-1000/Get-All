
import email from "../images/email.jpg";

export default function Contact() {
    return (
        <>
        
       <main id="contact-us-main" className="container">
        <h1 id="contact-page-title">Get In Touch With Get-All</h1>
        <p id="contact-intro-text">
            We're always here to help! Whether you have a question about our products, need assistance with an order, or just want to share your feedback, please don't hesitate to reach out. Our dedicated team is eager to connect with you.
        </p>

        <div id="contact-container">
           
            <section id="contact-form-section">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below with your details and message, and we'll get back to you as soon as possible.</p>
                <form action="#" method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" placeholder="John Doe" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" name="email" placeholder="john.doe@example.com" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="Inquiry about an order, product question, feedback, etc." required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea id="message" name="message" placeholder="Please describe your query or feedback in detail here..." required></textarea>
                    </div>
                    <button type="submit" id="submit-button">Send Message</button>
                </form>
            </section>

           
            <section id="contact-info-section">
                <h2>Reach Us Directly</h2>
                <p>
                    <i className="fas fa-envelope"></i>
                    Email: <a href="mailto:support@getall.com">support@getall.com</a>
                </p>
                <p>
                    <i className="fas fa-phone-alt"></i>
                    Phone: <a href="tel:+18001234567">+1 (800) 123-4567</a>
                </p>
                <p>
                    <i className="fas fa-map-marker-alt"></i>
                    Address: 123 E-commerce Lane, Digital City, DC 90210
                </p>
                <p>
                    <i className="fas fa-clock"></i>
                    Hours: Mon-Fri, 9:00 AM - 6:00 PM EST (Excluding holidays)
                </p>
                <p>For common questions, please visit our <a href="#">FAQ page</a>.</p>
            </section>
        </div>

        <section id="social-media-section" className="container">
            <h2>Connect With Us on Social Media</h2>
            <p>Follow us to stay updated on the latest products, deals, and news from Get-All!</p>
            <div className="social-icons">
                <a href="https://www.facebook.com/getall" target="_blank" className="social-icon-link">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com/getall" target="_blank" className="social-icon-link">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/getall" target="_blank" className="social-icon-link">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/getall" target="_blank" className="social-icon-link">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </section>

    </main>
        </>
    );
}