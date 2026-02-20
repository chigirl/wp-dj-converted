import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * Artist Single Page
 *
 * Content source: WordPress page "Artists single" (page_id=21, parent: 8)
 * Default data: Victoria Russell — img-2.jpg
 *
 * CUSTOMIZATION / API NOTES:
 *   To load artist data dynamically, replace the static `artistData` map
 *   with a fetch() call to ENDPOINTS.artist(slug) (src/config/api.js).
 *
 *   Expected API response shape:
 *   {
 *     name: 'Victoria Russell',
 *     image: '/assets/images/img-2.jpg',
 *     bio: ['<paragraph 1>', '<paragraph 2>'],
 *     socialLinks: [
 *       { platform: 'facebook',  url: '#' },
 *       { platform: 'instagram', url: '#' },
 *       { platform: 'youtube',   url: '#' },
 *     ],
 *   }
 */

// ---------------------------------------------------------------------------
// Static data — extracted from jacob.sql wp_posts (page_id=21)
// Replace with API data when your back-end is ready.
// ---------------------------------------------------------------------------
const artistData = {
  'victoria-russell': {
    name: 'Victoria Russell',
    image: '/assets/images/img-2.jpg',
    bio: [
      'Duis et neque a urna feugiat facilisis. Aliquamir blandit aliquam mi, non auctor turpis interdum eget. Aenean augue nisi, condimentum non tempus at, commodo.',
      'Vestibulum vulputate erat. Donec finibus malesuada enim, id gravida neque bibendum sit amet.',
    ],
    socialLinks: [
      { platform: 'facebook',  url: '#' /* TODO: add real URL */ },
      { platform: 'instagram', url: '#' /* TODO: add real URL */ },
      { platform: 'youtube',   url: '#' /* TODO: add real URL */ },
    ],
  },
  'priscilla-williamson': {
    name: 'Priscilla Williamson',
    image: '/assets/images/img-3.jpg',
    bio: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus augue, finibus eget condimentum in, rutrum ac metus.',
      'Nulla non ullamcorper libero, et gravida urna. Aliquam tincidunt tempus velit a tincidunt.',
    ],
    socialLinks: [
      { platform: 'facebook',  url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'youtube',   url: '#' },
    ],
  },
  'cameron-cooper': {
    name: 'Cameron Cooper',
    image: '/assets/images/img-4.jpg',
    bio: [
      'Condimentum in, rutrum ac metus. Nulla non ullamcorper libero et gravida urna. Aliquam tincidunt tempus velit.',
      'Sed tellus augue, finibus eget condimentum in, rutrum ac metus.',
    ],
    socialLinks: [
      { platform: 'facebook',  url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'youtube',   url: '#' },
    ],
  },
  'shawn-robertson': {
    name: 'Shawn Robertson',
    image: '/assets/images/img-5.jpg',
    bio: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non ullamcorper libero, et gravida urna.',
      'Aliquam tincidunt tempus velit a tincidunt. Condimentum in, rutrum ac metus.',
    ],
    socialLinks: [
      { platform: 'facebook',  url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'youtube',   url: '#' },
    ],
  },
};

function ArtistSingle() {
  const { slug } = useParams();
  const artist = artistData[slug];

  if (!artist) {
    return (
      <div className="page-wrapper" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h2>Artist not found</h2>
        <Link to="/artists" style={{ color: '#047eee', display: 'inline-block', marginTop: 16 }}>
          ← Back to Artists
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="artist-single">
            {/* Portrait image */}
            <div className="artist-single-image">
              <img src={artist.image} alt={artist.name} />
            </div>

            {/* Info */}
            <div className="artist-single-info">
              <h1 className="artist-single-name">{artist.name}</h1>

              <div className="artist-single-bio">
                {artist.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-links">
                {artist.socialLinks.map(({ platform, url }) => (
                  <a
                    key={platform}
                    href={url}
                    className="social-link"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={platform}
                  >
                    {platform.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>

              {/* Back link */}
              <Link
                to="/artists"
                style={{
                  display: 'inline-block',
                  marginTop: 32,
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  paddingBottom: 2,
                }}
              >
                ← All Artists
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArtistSingle;
