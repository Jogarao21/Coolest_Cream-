import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/About.css';

import ValuesGrid from '../components/ValuesGrid';

// Images
import bgImgOrigin from '../assets/background_image_4.jpeg';

import bgImgCraft from '../assets/background_image_3.jpeg';
import bgImgLove from '../assets/background_image_2.png';

// Scroll Progress Indicator Component
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div 
      className="scroll-progress-bar"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
    />
  );
}

// 1. Hero Story
function HeroStory() {
  return (
    <section className="luxury-hero">
      <motion.div 
        className="luxury-hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <span className="luxury-eyebrow">Chapter I</span>
        <h1 className="luxury-title">The Pursuit of Real Ice Cream.</h1>
        <p className="luxury-lead">Born in Vizag. Made with love. No shortcuts.</p>
      </motion.div>
    </section>
  );
}

// 2. Origin Story (Sticky)
// Disable parallax on small screens to prevent mobile jank
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

function StickyChapter({ eyebrow, title, text, image, align = 'left' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scaleImgFull = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yCardFull    = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // On mobile: no scale/translate — static layout, zero GPU cost
  const scaleImg = isMobile ? 1 : scaleImgFull;
  const yCard    = isMobile ? 0 : yCardFull;

  return (
    <section ref={containerRef} className={`sticky-chapter-container${isMobile ? ' mobile-chapter' : ''}`}>
      <div className="sticky-chapter-content">
        <motion.div className="sticky-image-wrap" style={{ scale: scaleImg }}>
          <img src={image} alt={title} className="sticky-image" loading="lazy" />
        </motion.div>
        
        {/* Glassmorphism Card */}
        <div className={`sticky-card-wrapper align-${align}`}>
          <motion.div className="glass-card" style={{ y: yCard }}>
            <span className="luxury-eyebrow">{eyebrow}</span>
            <h2 className="luxury-heading">{title}</h2>
            <p className="luxury-body">{text}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



// 4. Floating Stat Cards over Parallax Background (Why Customers Love Us)
function FloatingStatsChapter() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yBgFull = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yBg = isMobile ? '0%' : yBgFull;

  return (
    <section ref={containerRef} className="floating-stats-chapter">
      <motion.div className="floating-stats-bg" style={{ backgroundImage: `url(${bgImgLove})`, y: yBg }} />
      <div className="floating-stats-content">
        <motion.div 
          className="glass-card stats-card-right"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-eyebrow">The Standard</span>
          <h2 className="luxury-heading">Why Vizag Loves Us</h2>
          <div className="stats-mini-grid">
            <div className="stat-item">
              <span className="stat-num">30+</span>
              <span className="stat-txt">Flavours</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">10K+</span>
              <span className="stat-txt">Smiles</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">3</span>
              <span className="stat-txt">Parlours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function About() {
  return (
    <div id="about" className="luxury-about-page">
      <ScrollProgress />
      
      <HeroStory />
      
      <StickyChapter 
        eyebrow="The Beginning"
        title="Started From a Cart"
        text="In 2019, we set out with a simple cart in Vizag. Our mission? Bring back the lost art of real, uncompromised ice cream."
        image={bgImgOrigin}
        align="left"
      />



      <StickyChapter 
        eyebrow="The Craft"
        title="Tested at Every Step"
        text="From sourcing raw ingredients to the final swirl in your cup, we monitor every stage. Perfection takes patience."
        image={bgImgCraft}
        align="right"
      />

      <FloatingStatsChapter />

      {/* WHAT WE STAND FOR - Lightweight CSS grid (replaced heavy Three.js) */}
      <section className="values-section">
        <div className="values-header-wrap">
          <h3 className="values-heading">What We Stand For</h3>
          <p className="values-lead">Every scoop carries our promise to you</p>
        </div>
        <ValuesGrid />
      </section>

    </div>
  );
}
