import React from 'react';
import '../styles/Hero.css';
import HeroBannerSlider from '../components/HeroBannerSlider';


function Hero() {
    return (
        <section id="hero" className="hero section">

            <div className="container hero-container">
                <div className="hero-slider-wrap">
                    <HeroBannerSlider />
                </div>
            </div>
        </section>
    );
}

export default Hero;
