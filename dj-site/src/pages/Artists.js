import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Artists Page — Artist roster grid
 *
 * Content source: WordPress page "Artists" (page_id=8)
 *
 * CUSTOMIZATION / API NOTES:
 *   To load artists dynamically from an API, replace the static `artists`
 *   array with a fetch() call to ENDPOINTS.artists (src/config/api.js).
 *
 *   Expected API response shape:
 *   [
 *     {
 *       id: 1,
 *       name: 'Victoria Russell',
 *       slug: 'victoria-russell',
 *       image: '/assets/images/img-2.jpg',
 *     },
 *     ...
 *   ]
 */

// ---------------------------------------------------------------------------
// Static data — extracted from jacob.sql wp_posts (page_id=8)
// Replace with API data when your back-end is ready.
// ---------------------------------------------------------------------------
const artists = [
  {
    id: 1,
    name: 'Victoria Russell',
    slug: 'victoria-russell',
    image: '/assets/images/img-2.jpg',
  },
  {
    id: 2,
    name: 'Priscilla Williamson',
    slug: 'priscilla-williamson',
    image: '/assets/images/img-3.jpg',
  },
  {
    id: 3,
    name: 'Cameron Cooper',
    slug: 'cameron-cooper',
    image: '/assets/images/img-4.jpg',
  },
  {
    id: 4,
    name: 'Shawn Robertson',
    slug: 'shawn-robertson',
    image: '/assets/images/img-5.jpg',
  },
];

function Artists() {
  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <div className="page-hero" style={{ background: '#0a0a0a' }}>
        <div className="page-hero-content">
          <h1>Artists</h1>
        </div>
      </div>

      {/* Artists Grid */}
      <section className="section" style={{ background: '#000', padding: '40px 0' }}>
        <div className="container">
          <div className="artists-grid">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                to={`/artists/${artist.slug}`}
                className="artist-card"
              >
                <img src={artist.image} alt={artist.name} loading="lazy" />
                <div className="artist-card-overlay">
                  <span className="artist-card-name">{artist.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Artists;
