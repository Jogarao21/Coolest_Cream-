import React from 'react';
import '../styles/Contact.css';

// The user will place the image at src/assets/contact_illustration.png

function Contact() {
    return (
        <section id="contact" className="contact section">
            <div className="container contact-container">

                <div className="about-header text-center" style={{ marginBottom: '60px' }}>
                    <h2 className="section-title text-purple">Get In Touch 📍</h2>
                    <p className="section-subtitle text-muted">
                        We are here for you! Reach out to us or visit our location.
                    </p>
                </div>

                <div className="contact-content-grid">
                    
                    {/* LEFT: Animated Illustration */}
                    <div className="contact-illustration-wrap card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                        <img 
                            src="/src/assets/contact_illustration.png" 
                            alt="Contact Customer Service 24/7" 
                            className="contact-illustration-img"
                            onError={(e) => {
                                // Fallback if image isn't saved yet
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback placeholder visible only if image fails to load */}
                        <div className="img-placeholder" style={{display: 'none'}}>
                            Please save image as: <br/> src/assets/contact_illustration.png
                        </div>
                    </div>

                    {/* RIGHT: Address and Location Details */}
                    <div className="contact-details card">
                        <h3 className="text-purple mb-md">Address & Location</h3>
                        
                        <div className="address-block">
                            <h4 className="text-pink">Coolest Cream</h4>
                            <p className="text-muted">
                                7-8-22/3/1, Harbour Park Road<br />
                                Opposite Ramakrishna Mission, RK Beach<br />
                                Visakhapatnam, Andhra Pradesh 530003
                            </p>
                        </div>

                        <div className="contact-info-block">
                            <h4 className="text-purple mt-sm">Contact</h4>
                            <p className="text-muted">
                                <strong>📞 Phone:</strong> <a href="tel:+91XXXXXXXXXX" className="contact-link">+91-XXXXXXXXXX</a><br />
                                <strong>📧 Email:</strong> <a href="mailto:info@coolestcream.com" className="contact-link">info@coolestcream.com</a>
                            </p>
                        </div>

                        <div className="hours-block">
                            <h4 className="text-purple mt-sm">Hours</h4>
                            <p className="text-muted">
                                <strong>Monday - Sunday</strong><br />
                                9:00 AM - 11:00 PM
                            </p>
                        </div>

                        <div className="action-buttons mt-md">
                            <a 
                                href="https://www.google.com/maps/search/?api=1&query=Patnam+House+Visakhapatnam" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Get Directions 🗺️
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Contact;
