import React, { useState, useEffect, useCallback } from 'react';

/**
 * Releases Page — Full-width image slider
 *
 * Content source: WordPress page "Releases" (page_id=11)
 *
 * Slide data below is sourced from the Elementor page builder content in
 * the WordPress database (jacob.sql).
 *
 * CUSTOMIZATION / API NOTES:
 *   To load slides dynamically from an API, replace the static `slides`
 *   array with a fetch() call to ENDPOINTS.releases (src/config/api.js).
 *
 *   Expected API response shape:
 *   [
 *     {
 *       id: 1,
 *       image: '/path/to/image.jpg',
 *       date: 'August 18, 2023',
 *       title: 'DarkSTREETS',
 *       artist: 'Cameron Cooper',
 *     },
 *     ...
 *   ]
 */

// ---------------------------------------------------------------------------
// Static data — extracted from jacob.sql wp_posts content (Elementor markup)
// Replace with API data when your back-end is ready.
// ---------------------------------------------------------------------------
const slides = [
  {
    id: 1,
    image: '/assets/images/slider-1.jpg',
    date: 'August 18, 2023',
    title: 'DarkSTREETS',
    artist: 'Cameron Cooper',
  },
  {
    id: 2,
    image: '/assets/images/slider-2.jpg',
    date: 'Never be the same',
    title: 'Priscilla',
    artist: 'Priscilla Williamson',
    scriptTitle: true, // uses Kristi font like the WP theme
  },
  {
    id: 3,
    image: '/assets/images/slider-3.jpg',
    date: 'Vision',
    title: 'VISION',
    artist: 'Victoria Russell',
  },
];

// Auto-advance interval in ms
const AUTO_INTERVAL = 5000;

function Releases() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const goTo = useCallback((idx) => {
    setCurrent((idx + total) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <div className="page-wrapper">
      {/* Slider */}
      <div className="releases-slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="slide" key={slide.id}>
              <img src={slide.image} alt={slide.title} loading="lazy" />
              <div className="slide-overlay" />
              <div className="slide-content">
                <p className="slide-date">{slide.date}</p>
                <h2
                  className="slide-title"
                  style={
                    slide.scriptTitle
                      ? { fontFamily: "'Kristi', cursive", fontSize: 120, fontWeight: 400, textTransform: 'none' }
                      : undefined
                  }
                >
                  {slide.title}
                </h2>
                <p className="slide-artist">{slide.artist}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow buttons */}
        <button
          className="slider-arrow prev"
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="slider-arrow next"
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dot indicators */}
        <div className="slider-controls">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot${idx === current ? ' active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Releases list section */}
      <section className="section" style={{ background: '#0a0a0a' }}>
        <div className="container">
          <h2 className="section-title">Latest <span>Releases</span></h2>
          <div className="releases-cards">
            {slides.map((slide) => (
              <div key={slide.id} className="release-row" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                padding: '20px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{ width: 80, height: 80, objectFit: 'cover', flexShrink: 0 }}
                  loading="lazy"
                />
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#047eee', marginBottom: 4 }}>
                    {slide.date}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase' }}>
                    {slide.title}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                    {slide.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Releases;
