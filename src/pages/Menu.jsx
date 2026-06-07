import React, { useState } from 'react';
import '../styles/Menu.css';

// Import images
import imgStrawberry from '../assets/Strawberry Cloud.jpeg';
import imgCacao from '../assets/Dark Cacao.jpeg';
import imgMango from '../assets/Alphonso Mango.jpeg';
import imgRose from '../assets/Rose Cardamom.jpeg';
import imgMatcha from '../assets/Matcha Yuzu.jpeg';
import imgPeanut from '../assets/Salted Peanut.jpeg';
import imgCoconut from '../assets/Coconut Lychee.jpeg';
import imgGuava from '../assets/Guava Chilli.jpeg';
import imgVanilla from '../assets/Vanilla Bean Zero.jpeg';

const flavors = [
    { name: 'Strawberry Cloud', desc: 'Fresh strawberries, mascarpone cream, light as air', price: 120, tags: ['Classic', 'Seasonal'], image: imgStrawberry },
    { name: 'Dark Cacao', desc: '70% Belgian chocolate, bittersweet and intense', price: 130, tags: ['Classic'], image: imgCacao },
    { name: 'Alphonso Mango', desc: 'Ratnagiri mangoes, nothing else. Pure summer', price: 125, tags: ['Seasonal', 'Vegan'], image: imgMango },
    { name: 'Rose Cardamom', desc: 'Persian rose water, green cardamom, honey swirl', price: 135, tags: ['Classic'], image: imgRose },
    { name: 'Matcha Yuzu', desc: 'Ceremonial grade matcha, bright yuzu citrus zing', price: 140, tags: ['Seasonal', 'Vegan'], image: imgMatcha },
    { name: 'Salted Peanut', desc: 'Roasted peanut butter, sea salt, caramel ribbons', price: 120, tags: ['Classic'], image: imgPeanut },
    { name: 'Coconut Lychee', desc: 'Creamy coconut base with fresh lychee chunks', price: 130, tags: ['Vegan', 'Seasonal'], image: imgCoconut },
    { name: 'Guava Chilli', desc: 'Sweet guava with a bold chilli kick — unforgettable', price: 125, tags: ['Seasonal', 'Vegan'], image: imgGuava },
    { name: 'Vanilla Bean Zero', desc: 'Classic vanilla, zero sugar, full flavour', price: 115, tags: ['Sugar-Free', 'Classic'], image: imgVanilla },
];

function Menu() {
    const [filter, setFilter] = useState('All');

    const tabs = ['All', 'Classic', 'Seasonal', 'Vegan', 'Sugar-Free'];

    const filteredFlavors = filter === 'All'
        ? flavors
        : flavors.filter(f => f.tags.includes(filter));

    return (
        <section id="menu" className="menu section">
            <div className="container menu-container">

                <div className="about-header text-center">
                    <span className="about-badge">Our Menu</span>
                    <h2 className="about-heading">This Week's Picks 🍨</h2>
                    <p className="about-lead">
                        Our menu rotates with the seasons. Every scoop is made fresh that morning.
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

                <div className="menu-grid">
                    {filteredFlavors.map((item, idx) => (
                        <div key={idx} className="menu-item card">
                            <div className="menu-item-image-wrapper">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="menu-item-image" />
                                ) : (
                                    <div className="menu-item-image-placeholder"></div>
                                )}
                            </div>
                            <div className="menu-item-content">
                                <div className="menu-item-tags">
                                    {item.tags.map((tag, i) => (
                                        <React.Fragment key={tag}>
                                            <span className="menu-item-tag">{tag}</span>
                                            {i < item.tags.length - 1 && <span className="tag-separator">•</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <h3 className="menu-item-name">{item.name}</h3>
                                <p className="menu-item-desc">{item.desc}</p>
                                <div className="menu-item-footer">
                                    <span className="menu-item-price">₹{item.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="menu-footer text-center">
                    <p className="text-muted">
                        🌿 All flavours available in cup or cone. Vegan options made in a dedicated dairy-free churn. Allergen info available at the counter.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Menu;
