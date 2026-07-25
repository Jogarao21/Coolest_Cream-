import React from 'react';
import '../styles/ValuesGrid.css';

import img1 from '../assets/Real Ingredients Only.png';
import img2 from '../assets/Community First.png';
import img3 from '../assets/Sustainable Scoops.png';
import img4 from '../assets/Made with Love.png';

const CARDS = [
  { id: 1, src: img1, title: 'Real Ingredients Only' },
  { id: 2, src: img2, title: 'Community First' },
  { id: 3, src: img3, title: 'Sustainable Scoops' },
  { id: 4, src: img4, title: 'Made with Love' },
];

export default function ValuesGrid() {
  return (
    <div className="values-grid">
      {CARDS.map((card) => (
        <div key={card.id} className="values-grid-card">
          <img src={card.src} alt={card.title} className="values-grid-img" loading="lazy" />
          <p className="values-grid-label">{card.title}</p>
        </div>
      ))}
    </div>
  );
}
