import React, { useEffect, useRef } from 'react';

/**
 * Home Page — Hero section
 *
 * Content source: WordPress page "Home" (page_id=103)
 * Original content: '<h1>JacobBlack</h1> producer'
 *
 * The hero uses the Live-Music.mp4 video as a background.
 * Replace the video src in public/assets/images/ with your own file if desired.
 *
 * CUSTOMIZATION / API NOTES:
 *   To load hero content dynamically from a CMS or API, replace the
 *   static JSX below with a fetch() call to ENDPOINTS.pages or similar.
 *   See src/config/api.js for endpoint configuration.
 */
function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure autoplay on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy — that's OK;
        // the poster/fallback image will show instead.
      });
    }
  }, []);

  return (
    <section className="hero">
      {/* Background video (muted + loop so autoplay is allowed) */}
      <video
        ref={videoRef}
        className="hero-bg-video"
        src="/assets/images/Live-Music.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/images/Live-Music.jpg"
        aria-hidden="true"
      />

      <div className="hero-content">
        {/* Site name / artist name — CUSTOMIZATION: update as needed */}
        <h1 className="hero-name">
          <span className="first">Jacob</span>
          <span className="last">Black</span>
        </h1>

        {/* Tagline — CUSTOMIZATION: update as needed */}
        <p className="hero-subtitle">Producer &amp; DJ</p>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}

export default Home;
