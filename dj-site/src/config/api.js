/**
 * ============================================================
 * CONFIGURATION FILE — API & Database Integration
 * ============================================================
 *
 * This file centralizes all configuration needed for connecting
 * the React front-end to a back-end API or database.
 *
 * SETUP INSTRUCTIONS:
 * 1. Copy this file to src/config/api.js (already done).
 * 2. Create a .env file in the project root (see .env.example).
 * 3. Replace placeholder values below with your actual endpoints.
 *
 * ============================================================
 */

// ---------------------------------------------------------------------------
// BASE API URL
// ---------------------------------------------------------------------------
// Point this to your back-end REST API (Node/Express, Django, WP REST API, etc.)
// In .env set: REACT_APP_API_BASE_URL=https://your-backend.com/api
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// ---------------------------------------------------------------------------
// WORDPRESS REST API (if you keep WordPress as a headless CMS)
// ---------------------------------------------------------------------------
// Set REACT_APP_WP_API_URL to your WordPress site's REST API root, e.g.:
// https://your-wordpress-site.com/wp-json/wp/v2
export const WP_API_URL =
  process.env.REACT_APP_WP_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

// ---------------------------------------------------------------------------
// CONTACT FORM ENDPOINT
// ---------------------------------------------------------------------------
// POST requests from the Contact page are sent here.
// Expected request body: { name, email, subject, message }
// Expected response:     { success: true, message: 'Your message was sent.' }
export const CONTACT_FORM_ENDPOINT =
  process.env.REACT_APP_CONTACT_ENDPOINT || `${API_BASE_URL}/contact`;

// ---------------------------------------------------------------------------
// ENDPOINTS — replace with your actual routes
// ---------------------------------------------------------------------------
export const ENDPOINTS = {
  // GET list of artists
  artists:      `${API_BASE_URL}/artists`,
  // GET single artist by slug, e.g. /artists/victoria-russell
  artist:       (slug) => `${API_BASE_URL}/artists/${slug}`,

  // GET list of releases (albums/singles)
  releases:     `${API_BASE_URL}/releases`,
  // GET single release by slug
  release:      (slug) => `${API_BASE_URL}/releases/${slug}`,

  // GET list of events (upcoming gigs)
  events:       `${API_BASE_URL}/events`,

  // GET list of blog posts
  posts:        `${API_BASE_URL}/posts`,
  // GET single post by slug
  post:         (slug) => `${API_BASE_URL}/posts/${slug}`,

  // GET photo albums
  photoAlbums:  `${API_BASE_URL}/photo-albums`,
  // GET photos in an album by album id
  photos:       (albumId) => `${API_BASE_URL}/photo-albums/${albumId}/photos`,

  // POST contact form submission
  contact:      CONTACT_FORM_ENDPOINT,
};

// ---------------------------------------------------------------------------
// DATABASE NOTES (if using a direct DB / Supabase / Firebase / etc.)
// ---------------------------------------------------------------------------
// If you are using Supabase:
//   REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
//   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
//
// If you are using Firebase:
//   REACT_APP_FIREBASE_API_KEY=...
//   REACT_APP_FIREBASE_AUTH_DOMAIN=...
//   REACT_APP_FIREBASE_PROJECT_ID=...
//
// Tables / Collections you will need (mirrored from jacob.sql):
//   - artists        (id, name, slug, bio, image_url, social_links)
//   - releases       (id, title, artist, date, image_url, type)
//   - events         (id, day, month_year, artist, venue, city, ticket_url, status)
//   - posts          (id, title, slug, content, date, image_url, author)
//   - photo_albums   (id, title, artist, year, cover_image, photo_count)
//   - photos         (id, album_id, image_url, caption)
//   - contacts       (id, name, email, subject, message, created_at)

const config = {
  API_BASE_URL,
  WP_API_URL,
  CONTACT_FORM_ENDPOINT,
  ENDPOINTS,
};

export default config;
