import React, { useState } from 'react';
import '../styles/Gallery.css';

// Flavour Shot images
import imgStrawberry from '../assets/Strawberry Cloud.jpeg';
import imgVanilla    from '../assets/Vanilla Bean Zero.jpeg';
import imgRose       from '../assets/Rose Cardamom.jpeg';
import imgMango      from '../assets/Alphonso Mango.jpeg';
import imgCacao      from '../assets/Dark Cacao.jpeg';
import imgCoconut    from '../assets/Coconut Lychee.jpeg';
import imgMatcha     from '../assets/Matcha Yuzu.jpeg';

// Store / Event / Behind-the-Scenes images
import imgParlour   from '../assets/Parlour Vibes.png';
import imgChurning  from '../assets/Fresh Churning.png';
import imgBirthday  from '../assets/Birthday Event.png';
import imgCustomers from '../assets/Happy Customers.png';
import imgFarmMilk  from '../assets/Farm Fresh Milk.png';

const galleryItems = [
    { image: imgStrawberry, label: 'Strawberry Cloud',    category: 'Flavour Shot' },
    { image: imgVanilla,    label: 'Classic Vanilla Cone', category: 'Flavour Shot' },
    { image: imgRose,       label: 'Rose Cardamom Bowl',   category: 'Flavour Shot' },
    { image: imgParlour,    label: 'Indiranagar Parlour',  category: 'Store Vibes' },
    { image: imgMango,      label: 'Mango Drip',           category: 'Flavour Shot' },
    { image: imgChurning,   label: 'Fresh Churning',       category: 'Behind the Scenes' },
    { image: imgCacao,      label: 'Dark Cacao Stack',     category: 'Flavour Shot' },
    { image: imgBirthday,   label: 'Birthday Party Setup', category: 'Events' },
    { image: imgCoconut,    label: 'Coconut Lychee',       category: 'Flavour Shot' },
    { image: imgFarmMilk,   label: 'Farm Fresh Milk',      category: 'Behind the Scenes' },
    { image: imgMatcha,     label: 'Matcha Yuzu Close-up', category: 'Flavour Shot' },
    { image: imgCustomers,  label: 'Happy Customers',      category: 'Store Vibes' },
];

function Gallery() {
    const [filter, setFilter] = useState('All');
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const tabs = ['All', 'Flavour Shot', 'Store Vibes', 'Behind the Scenes', 'Events'];

    const filteredItems = filter === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    return (
        <section id="gallery" className="gallery section bg-gray-light">
            <div className="container gallery-container">

                <div className="luxury-header-wrap">
                    <span className="luxury-eyebrow">Gallery</span>
                    <h2 className="luxury-heading">A Feast for the Eyes 📸</h2>
                    <p className="luxury-lead">
                        From behind-the-scenes churning to those perfect scoop shots — follow us on Instagram @coolestcream for more.
                    </p>
                </div>

                <div className="filter-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`filter-btn ${filter === tab ? 'active' : ''}`}
                            onClick={() => setFilter(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="gallery-grid">
                    {filteredItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`gallery-item ${hoveredIdx === idx ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            <img
                                src={item.image}
                                alt={item.label}
                                className="gallery-item-img"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="gallery-overlay" />
                            <div className="gallery-content">
                                <span className="gallery-category-badge">{item.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="gallery-cta text-center mt-lg">
                    <p className="text-lg text-purple mb-md">Love what you see? Tag us in your scoop shots!</p>
                    <a href="#" className="btn btn-primary">📸 Follow @coolestcream</a>
                </div>

            </div>
        </section>
    );
}

export default Gallery;
