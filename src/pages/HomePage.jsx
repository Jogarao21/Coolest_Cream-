import React from 'react';
import Hero from './Hero';
import About from './About';
import Menu from './Menu';
import Gallery from './Gallery';
import Reviews from './Reviews';
import Contact from './Contact';

function HomePage() {
    return (
        <div>
            <Hero />
            <About />
            <Menu />
            <Gallery />
            <Reviews />
            <Contact />
        </div>
    );
}

export default HomePage;
