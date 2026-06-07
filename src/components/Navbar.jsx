import React, { useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/coolest_cream_logo2.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="Coolest Cream" />
        </a>
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>Our Story</a>
          <a href="#menu" onClick={() => setIsOpen(false)}>Menu</a>
          <a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a>
          <a href="#reviews" onClick={() => setIsOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;