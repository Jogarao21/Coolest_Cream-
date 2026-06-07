import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/HeroBannerSlider.css';

import banner1 from '../assets/hero_banner.png';
import banner3 from '../assets/hero_banner_3.png';
import banner7 from '../assets/hero_banner_7.png'; // Unused, can be removed or added back if needed

const banners = [banner1, banner3, banner7];

const AUTO_SCROLL_INTERVAL = 4500;

export default function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const total = banners.length;

  const goTo = useCallback(
    (index, dir = 'next') => {
      if (isAnimating) return;
      setPrev(current);
      setDirection(dir);
      setCurrent(index);
      setIsAnimating(true);
      setTimeout(() => {
        setPrev(null);
        setIsAnimating(false);
      }, 800);
    },
    [current, isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % total, 'next');
  }, [current, goTo, total]);

  const goToPrev = useCallback(() => {
    goTo((current - 1 + total) % total, 'prev');
  }, [current, goTo, total]);

  useEffect(() => {
    intervalRef.current = setInterval(next, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, AUTO_SCROLL_INTERVAL);
  };

  const handlePrev = () => { goToPrev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot  = (i) => {
    if (i === current) return;
    goTo(i, i > current ? 'next' : 'prev');
    resetTimer();
  };

  return (
    <div className="hbs-wrapper" aria-label="Hero Banner Slider">
      {/* Ghost image — invisible, sets container height to match natural image ratio */}
      <img src={banners[current]} alt="" className="hbs-ghost" aria-hidden="true" />

      <div className="hbs-track">

        {/* Outgoing slide */}
        {prev !== null && (
          <div
            key={`prev-${prev}`}
            className={`hbs-slide hbs-slide--exit hbs-slide--exit-${direction}`}
            aria-hidden="true"
          >
            <img src={banners[prev]} alt={`Banner ${prev + 1}`} className="hbs-image" draggable="false" />
          </div>
        )}

        {/* Current slide */}
        <div
          key={`current-${current}`}
          className={`hbs-slide hbs-slide--active hbs-slide--enter-${direction}`}
          aria-label={`Slide ${current + 1} of ${total}`}
        >
          <img src={banners[current]} alt={`Banner ${current + 1}`} className="hbs-image" draggable="false" />
        </div>
      </div>

      {/* Arrow controls */}
      <button className="hbs-arrow hbs-arrow--left" onClick={handlePrev} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="hbs-arrow hbs-arrow--right" onClick={handleNext} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot navigation */}
      <div className="hbs-dots" role="tablist" aria-label="Slide navigation">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`hbs-dot${i === current ? ' hbs-dot--active' : ''}`}
            onClick={() => handleDot(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="hbs-progress" key={current}>
        <div className="hbs-progress-bar" />
      </div>
    </div>
  );
}
