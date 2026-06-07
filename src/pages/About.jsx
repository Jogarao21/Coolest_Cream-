import React, { useEffect, useRef } from 'react';
import '../styles/About.css';

import ThreeValues from '../components/ThreeValues';

/* ─────────────────────────────────────────
   Scroll-reveal hook
───────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ─────────────────────────────────────────
   Stat Card
───────────────────────────────────────── */
function StatCard({ value, label, gradient, delay }) {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className="stat-card reveal" style={{ background: gradient }}>
      <div className="stat-card-glow" />
      <span className="stat-card-value">{value}</span>
      <span className="stat-card-label">{label}</span>
    </div>
  );
}

// Images for Story Blocks
import imgProcess from '../assets/Fresh Churning.png';
import imgQuality from '../assets/Made with Love.png';
import imgCrafted from '../assets/Happy Customers.png';

/* ─────────────────────────────────────────
   Story Block
───────────────────────────────────────── */
function StoryBlock({ layout = 'left', bgColor, title, highlight, lead, text, image, bgClass = '', year }) {
  const ref = useReveal(0.1);
  return (
    <div ref={ref} className={`story-block reveal ${bgClass}`} style={{ backgroundColor: bgColor }}>
      <div className={`container story-block-container ${layout}`}>
        {year && <div className="story-year-bg">{year}</div>}
        <div className="story-content">
          <h2 className="story-title">
            {title} <span className="story-highlight">{highlight}</span>
          </h2>
          {lead && <p className="story-lead">{lead}</p>}
          {text && <p className="story-text">{text}</p>}
        </div>
        {image && (
          <div className="story-image-wrap">
            <img src={image} alt="Story visual" className="story-image" />
          </div>
        )}
      </div>
    </div>
  );
}



/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function About() {
  const headerRef     = useReveal(0);
  const valuesHeadRef = useReveal(0);

  return (
    <section id="about" className="about-section">
      <div className="blob blob--pink"   aria-hidden="true" />
      <div className="blob blob--purple" aria-hidden="true" />

      <div className="container about-wrap">

        {/* ── Header ── */}
        <div ref={headerRef} className="about-header reveal">
          <span className="about-badge">Our Story</span>
          <h2 className="about-heading">
            Born in Vizag,<br />
            Made with <span className="accent-pink">Love</span> 🍨
          </h2>
          <p className="about-lead">
            Coolest Cream started in 2019 with one small cart and a big obsession —
            making ice cream the way it used to be.
          </p>
        </div>

        <div className="about-main-centered">
          <div className="cards-stack-row">
            <StatCard value="30+"  label="Handcrafted Flavours"
              gradient="linear-gradient(135deg,#EC008C 0%,#9B00CF 100%)" delay={0} />
            <StatCard value="10K+" label="Happy Customers"
              gradient="linear-gradient(135deg,#7B00BF 0%,#3F007F 100%)" delay={0.12} />
            <StatCard value="3"    label="Parlours in Vizag"
              gradient="linear-gradient(135deg,#3F007F 0%,#1A0040 100%)" delay={0.24} />
          </div>
        </div>

        {/* ══════════════════════════════════════
            STORY BLOCKS (Corner House Style)
        ══════════════════════════════════════ */}
        <div className="story-sections-wrapper">
          <StoryBlock 
            bgColor="var(--color-purple)" 
            bgClass="story-bg-purple"
            year="2019"
            title="WHERE IT ALL"
            highlight="BEGAN"
            layout="center"
          />

          <StoryBlock 
            bgColor="var(--color-background-light)"
            bgClass="story-bg-wavy-1"
            title="So, what makes us Vizag's"
            highlight="favourite guilty pleasure?"
            image={imgProcess}
            layout="left"
          />

          <StoryBlock 
            bgColor="#ffffff"
            bgClass="story-bg-wavy-2"
            title="As our customers expect,"
            highlight="we serve high-quality ice cream"
            lead="desserts, something sweet and delectable for everyone's palate."
            image={imgQuality}
            layout="right"
          />

          <StoryBlock 
            bgColor="var(--color-background-light)"
            bgClass="story-bg-wavy-3"
            title="Our recipes are not only specially crafted, but also"
            highlight="monitored and tested"
            lead="at each stage, from the production line to the sales counter at every parlour."
            image={imgCrafted}
            layout="left"
          />
        </div>

        {/* ══════════════════════════════════════
            WHAT WE STAND FOR — Image carousel
        ══════════════════════════════════════ */}
        <div ref={valuesHeadRef} className="values-header reveal">
          <h3 className="values-heading">What We Stand For</h3>
          <p className="values-lead">Every scoop carries our promise to you</p>
        </div>

        <ThreeValues />

      </div>
    </section>
  );
}
