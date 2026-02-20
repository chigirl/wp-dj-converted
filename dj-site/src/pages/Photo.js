import React, { useState } from 'react';

/**
 * Photo Page — Photo Albums gallery with lightbox
 *
 * Content source: WordPress page "Photo" (page_id=15)
 * Images from uploads/2019/11 (img-6.jpg through img-18.jpg shown as albums)
 *
 * CUSTOMIZATION / API NOTES:
 *   To load albums dynamically from an API, replace the static `albums`
 *   array with a fetch() call to ENDPOINTS.photoAlbums (src/config/api.js).
 *
 *   Expected API response shape:
 *   [
 *     {
 *       id: 1,
 *       title: 'Cameron Cooper 2023',
 *       artist: 'Cameron Cooper',
 *       year: '2023',
 *       cover: '/assets/images/img-6.jpg',
 *       photoCount: 25,
 *       photos: ['/assets/images/img-6.jpg', '/assets/images/img-7.jpg', ...],
 *     },
 *     ...
 *   ]
 */

// ---------------------------------------------------------------------------
// Static data — extracted from jacob.sql wp_posts (page_id=15)
// Replace with API data when your back-end is ready.
// ---------------------------------------------------------------------------
const albums = [
  {
    id: 1,
    title: 'Cameron Cooper 2023',
    artist: 'Cameron Cooper',
    year: '2023',
    cover: '/assets/images/img-6.jpg',
    photoCount: 25,
    photos: [
      '/assets/images/img-6.jpg',
      '/assets/images/img-7.jpg',
      '/assets/images/img-8.jpg',
      '/assets/images/img-9.jpg',
      '/assets/images/img-10.jpg',
    ],
  },
  {
    id: 2,
    title: 'Victoria Russell — Live',
    artist: 'Victoria Russell',
    year: '2023',
    cover: '/assets/images/img-11.jpg',
    photoCount: 12,
    photos: [
      '/assets/images/img-11.jpg',
      '/assets/images/img-12.jpg',
      '/assets/images/img-13.jpg',
      '/assets/images/img-14.jpg',
    ],
  },
  {
    id: 3,
    title: 'Priscilla Williamson',
    artist: 'Priscilla Williamson',
    year: '2023',
    cover: '/assets/images/img-15.jpg',
    photoCount: 18,
    photos: [
      '/assets/images/img-15.jpg',
      '/assets/images/img-16.jpg',
      '/assets/images/img-17.jpg',
      '/assets/images/img-18.jpg',
    ],
  },
  {
    id: 4,
    title: 'Shawn Robertson — Session',
    artist: 'Shawn Robertson',
    year: '2022',
    cover: '/assets/images/img-1.jpg',
    photoCount: 14,
    photos: [
      '/assets/images/img-1.jpg',
      '/assets/images/img-2.jpg',
      '/assets/images/img-3.jpg',
      '/assets/images/img-4.jpg',
      '/assets/images/img-5.jpg',
    ],
  },
];

function Photo() {
  const [lightbox, setLightbox] = useState(null); // { albumIdx, photoIdx }

  function openLightbox(albumIdx, photoIdx = 0) {
    setLightbox({ albumIdx, photoIdx });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = '';
  }

  function prevPhoto() {
    if (!lightbox) return;
    const album = albums[lightbox.albumIdx];
    setLightbox({
      ...lightbox,
      photoIdx: (lightbox.photoIdx - 1 + album.photos.length) % album.photos.length,
    });
  }

  function nextPhoto() {
    if (!lightbox) return;
    const album = albums[lightbox.albumIdx];
    setLightbox({
      ...lightbox,
      photoIdx: (lightbox.photoIdx + 1) % album.photos.length,
    });
  }

  const currentPhoto =
    lightbox
      ? albums[lightbox.albumIdx].photos[lightbox.photoIdx]
      : null;

  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <div className="page-hero" style={{ background: '#0a0a0a' }}>
        <div className="page-hero-content">
          <h1>Photo</h1>
        </div>
      </div>

      {/* Albums Grid */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 32 }}>
            Photo <span>Albums</span>
          </h2>
          <div className="photo-albums-grid">
            {albums.map((album, albumIdx) => (
              <div
                key={album.id}
                className="photo-album-card"
                onClick={() => openLightbox(albumIdx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(albumIdx)}
                aria-label={`Open album: ${album.title}`}
              >
                <img src={album.cover} alt={album.title} loading="lazy" />
                <div className="photo-album-overlay">
                  <div className="photo-album-label">{album.title}</div>
                  <div className="photo-album-meta">
                    <span>📷</span>
                    <span>{album.photoCount} photos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* Stop click propagation inside so clicking image doesn't close */}
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={prevPhoto}
              style={{
                background: 'none', border: 'none', color: '#fff', fontSize: 40,
                cursor: 'pointer', padding: '0 16px',
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <img
              className="lightbox-img"
              src={currentPhoto}
              alt="Gallery"
            />

            <button
              onClick={nextPhoto}
              style={{
                background: 'none', border: 'none', color: '#fff', fontSize: 40,
                cursor: 'pointer', padding: '0 16px',
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>

          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default Photo;
