import React from 'react';
import '../styles/Hero.css';
import HeroBannerSlider from '../components/HeroBannerSlider';
import ThreeBackground from '../components/ThreeBackground';

function Hero() {
    return (
        <section id="hero" className="hero section">
            <ThreeBackground />
            <div className="container hero-container">
                <div className="hero-slider-wrap">
                    <HeroBannerSlider />
                </div>
            </div>
        </section>
    );
}

export default Hero;
