import React, { useEffect, useRef } from 'react';

/**
 * Home Page — Hero section
 *
 * Content source: WordPress page "Home" (page_id=103)
 * Original Elementor layout: full-screen video background, artist name,
 * tagline "producer", and an inline social-links icon-list widget.
 *
 * Social links (Facebook, Twitter, Instagram, YouTube, Telegram) were part
 * of the original Elementor hero widget (widgetType: "icon-list", view: "inline").
 * Styling: Red Hat Display, bold, uppercase, white / #047eee hover, 30px gap.
 *
 * CUSTOMIZATION / API NOTES:
 *   Replace the '#' href values in heroSocialLinks below with your real URLs,
 *   or fetch them from ENDPOINTS.settings / a site-config API endpoint.
 *   See src/config/api.js for endpoint configuration.
 */

// ---------------------------------------------------------------------------
// Social links data — sourced from Elementor icon-list widget on Home page
// CUSTOMIZATION: replace '#' with your actual social profile URLs
// ---------------------------------------------------------------------------
const heroSocialLinks = [
  { label: 'Facebook',  href: '#' /* TODO: your Facebook URL  */ },
  { label: 'Twitter',   href: '#' /* TODO: your Twitter URL   */ },
  { label: 'Instagram', href: '#' /* TODO: your Instagram URL */ },
  { label: 'YouTube',   href: '#' /* TODO: your YouTube URL   */ },
  { label: 'Telegram',  href: '#' /* TODO: your Telegram URL  */ },
];

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

        {/* Social links — sourced from original Elementor icon-list widget */}
        <ul className="hero-social">
          {heroSocialLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}

export default Home;
