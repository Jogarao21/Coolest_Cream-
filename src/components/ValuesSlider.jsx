import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/ValuesSlider.css';

import img1 from '../assets/Real Ingredients Only.png';
import img2 from '../assets/Community First.png';
import img3 from '../assets/Sustainable Scoops.png';
import img4 from '../assets/Made with Love.png';

const slides = [
  { id: 1, src: img1, alt: 'Real Ingredients Only' },
  { id: 2, src: img2, alt: 'Community First' },
  { id: 3, src: img3, alt: 'Sustainable Scoops' },
  { id: 4, src: img4, alt: 'Made with Love' },
];

const DURATION = 4000; // ms per slide

export default function ValuesSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [dir, setDir]         = useState('next');
  const [busy, setBusy]       = useState(false);
  const timerRef              = useRef(null);
  const total                 = slides.length;

  const goTo = useCallback((idx, direction = 'next') => {
    if (busy) return;
    setPrev(current);
    setDir(direction);
    setCurrent(idx);
    setBusy(true);
    setTimeout(() => { setPrev(null); setBusy(false); }, 700);
  }, [busy, current]);

  const next = useCallback(() => goTo((current + 1) % total, 'next'), [current, goTo, total]);
  const prev_ = useCallback(() => goTo((current - 1 + total) % total, 'prev'), [current, goTo, total]);

  /* Auto-advance */
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, DURATION);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, DURATION);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const handleDot = (i) => {
    if (i === current) return;
    goTo(i, i > current ? 'next' : 'prev');
    resetTimer();
  };

  return (
    <div className="vs-wrap">

      {/* ── Story-style progress bars ── */}
      <div className="vs-bars">
        {slides.map((_, i) => (
          <div key={i} className="vs-bar-track">
            <div
              className={`vs-bar-fill ${i === current ? 'vs-bar-fill--active' : i < current ? 'vs-bar-fill--done' : ''}`}
              style={{ animationDuration: `${DURATION}ms` }}
            />
          </div>
        ))}
      </div>

      {/* ── Slide track ── */}
      <div className="vs-track">

        {/* Outgoing */}
        {prev !== null && (
          <div key={`out-${prev}`} className={`vs-slide vs-slide--out-${dir}`} aria-hidden="true">
            <img src={slides[prev].src} alt={slides[prev].alt} className="vs-img" draggable="false" />
          </div>
        )}

        {/* Active */}
        <div key={`in-${current}`} className={`vs-slide vs-slide--in-${dir} vs-slide--active`}>
          <img src={slides[current].src} alt={slides[current].alt} className="vs-img" draggable="false" />
        </div>
      </div>

      {/* ── Arrow controls ── */}
      <button className="vs-arrow vs-arrow--left"  onClick={() => { prev_(); resetTimer(); }} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <button className="vs-arrow vs-arrow--right" onClick={() => { next(); resetTimer(); }} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>

      {/* ── Dot navigation ── */}
      <div className="vs-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`vs-dot${i === current ? ' vs-dot--active' : ''}`}
            onClick={() => handleDot(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
