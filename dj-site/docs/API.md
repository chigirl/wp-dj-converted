# Jacob Black DJ Site — REST API Reference

This document describes every HTTP endpoint the React front-end consumes.
All endpoints share the same base URL, configured in **`src/config/api.js`** via the
`REACT_APP_API_BASE_URL` environment variable (default: `http://localhost:5000/api`).

---

## Table of Contents

1. [General conventions](#1-general-conventions)
2. [Artists](#2-artists)
3. [Releases](#3-releases)
4. [Events](#4-events)
5. [Photo Albums & Photos](#5-photo-albums--photos)
6. [Blog Posts](#6-blog-posts)
7. [Contact Form](#7-contact-form)
8. [Site Settings](#8-site-settings)
9. [Error responses](#9-error-responses)
10. [Database schema reference](#10-database-schema-reference)

---

## 1. General conventions

| Convention | Value |
|---|---|
| Base URL | `http://localhost:5000/api` (set via `REACT_APP_API_BASE_URL`) |
| Format | JSON (`Content-Type: application/json`) |
| Auth | None required for public endpoints (add bearer token for admin routes) |
| Pagination | Query params `?page=1&per_page=20` on list endpoints |
| Dates | ISO 8601 strings: `"2024-01-29"` / `"2024-01-29T00:00:00Z"` |
| Slugs | Lowercase, hyphen-separated, URL-safe |

---

## 2. Artists

### `GET /api/artists`

Returns the full list of artist profiles, used on the **Artists** page grid.

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "name": "Victoria Russell",
    "slug": "victoria-russell",
    "bio": "Duis et neque a urna feugiat facilisis...",
    "image_url": "/assets/images/img-2.jpg",
    "social_links": [
      { "platform": "facebook",  "url": "https://facebook.com/..." },
      { "platform": "instagram", "url": "https://instagram.com/..." },
      { "platform": "youtube",   "url": "https://youtube.com/..." }
    ]
  },
  ...
]
```

**Used by:** `src/pages/Artists.js`

---

### `GET /api/artists/:slug`

Returns a single artist by URL slug, used on the **Artist Single** page.

**Path parameter:** `slug` — e.g. `victoria-russell`

**Response `200 OK`**
```json
{
  "id": 1,
  "name": "Victoria Russell",
  "slug": "victoria-russell",
  "bio": "Duis et neque a urna feugiat facilisis. Aliquamir blandit aliquam mi...",
  "image_url": "/assets/images/img-2.jpg",
  "social_links": [
    { "platform": "facebook",  "url": "#" },
    { "platform": "instagram", "url": "#" },
    { "platform": "youtube",   "url": "#" }
  ]
}
```

**Response `404 Not Found`** — if slug does not match any artist.

**Used by:** `src/pages/ArtistSingle.js`

---

## 3. Releases

### `GET /api/releases`

Returns all releases (albums, singles, EPs), used on the **Releases** page slider
and release list below the slider.

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "title": "DarkStreets",
    "slug": "darkstreets",
    "artist_id": 3,
    "artist_name": "Cameron Cooper",
    "release_date": "2023-08-18",
    "image_url": "/assets/images/slider-1.jpg",
    "type": "single"
  },
  {
    "id": 2,
    "title": "Never Be The Same",
    "slug": "never-be-the-same",
    "artist_id": 2,
    "artist_name": "Priscilla Williamson",
    "release_date": "2023-12-22",
    "image_url": "/assets/images/slider-2.jpg",
    "type": "single"
  },
  {
    "id": 3,
    "title": "Vision",
    "slug": "vision",
    "artist_id": 1,
    "artist_name": "Victoria Russell",
    "release_date": "2023-09-24",
    "image_url": "/assets/images/slider-3.jpg",
    "type": "album"
  }
]
```

**Used by:** `src/pages/Releases.js`

---

### `GET /api/releases/:slug`

Returns a single release by slug. *(Optional — only needed if you add a
Release Detail page.)*

**Response `200 OK`** — same shape as a single item from the list above.

---

## 4. Events

### `GET /api/events`

Returns all events (past and upcoming), used on the **Events** page.

The response is ordered by `event_date DESC` by default.
Pass `?upcoming=true` to return only events with `event_date >= today`.

**Query parameters (optional):**

| Param | Type | Description |
|---|---|---|
| `upcoming` | boolean | If `true`, return only future events |
| `artist_id` | number | Filter by artist |
| `page` | number | Page number (default: 1) |
| `per_page` | number | Items per page (default: 20) |

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "artist_id": 1,
    "artist_name": "Victoria Russell",
    "event_date": "2024-01-29",
    "day": "29",
    "month": "January",
    "year": "2024",
    "venue": "Radio XBass",
    "city": "Warszawa",
    "country": "PL",
    "ticket_url": null,
    "status": "available"
  },
  {
    "id": 3,
    "artist_id": 4,
    "artist_name": "Shawn Robertson",
    "event_date": "2023-11-10",
    "day": "10",
    "month": "November",
    "year": "2023",
    "venue": "State Farm Arena",
    "city": "Atlanta",
    "country": "US",
    "ticket_url": null,
    "status": "sold-out"
  }
]
```

**`status` values:**

| Value | Description |
|---|---|
| `available` | Tickets are on sale — show "Buy Tickets" link |
| `sold-out` | Show "Sold Out" badge (red) |
| `free` | Free admission — show "Free" badge (blue) |

**Used by:** `src/pages/Events.js`

---

## 5. Photo Albums & Photos

### `GET /api/photo-albums`

Returns all photo albums, used on the **Photo** page grid.

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "title": "Cameron Cooper 2023",
    "artist_id": 3,
    "artist_name": "Cameron Cooper",
    "year": 2023,
    "cover_image": "/assets/images/img-6.jpg",
    "photo_count": 5
  },
  ...
]
```

**Used by:** `src/pages/Photo.js`

---

### `GET /api/photo-albums/:id/photos`

Returns all photos inside a specific album, used by the **Photo** page lightbox.

**Path parameter:** `id` — numeric album ID

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "album_id": 1,
    "image_url": "/assets/images/img-6.jpg",
    "caption": null,
    "sort_order": 1
  },
  {
    "id": 2,
    "album_id": 1,
    "image_url": "/assets/images/img-7.jpg",
    "caption": null,
    "sort_order": 2
  }
]
```

**Used by:** `src/pages/Photo.js` (lightbox)

---

## 6. Blog Posts

### `GET /api/posts`

Returns all published blog posts, used on the **Blog** page grid.

**Query parameters (optional):**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `per_page` | number | Items per page (default: 10) |

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "title": "Hello World!",
    "slug": "hello-world",
    "excerpt": "Welcome to Jacob Black. This is the first post...",
    "author": "Jacob Black",
    "image_url": "/assets/images/img-1.jpg",
    "published_at": "2019-11-16T18:12:03Z"
  },
  ...
]
```

**Used by:** `src/pages/Blog.js`

---

### `GET /api/posts/:slug`

Returns a single blog post by slug. *(Needed when you add a
`BlogPost` detail page — add a `/blog/:slug` route in `src/App.js`.)*

**Response `200 OK`**
```json
{
  "id": 1,
  "title": "Hello World!",
  "slug": "hello-world",
  "excerpt": "Welcome to Jacob Black...",
  "content": "<p>Welcome to WordPress. This is your first post...</p>",
  "author": "Jacob Black",
  "image_url": "/assets/images/img-1.jpg",
  "published_at": "2019-11-16T18:12:03Z"
}
```

---

## 7. Contact Form

### `POST /api/contact`

Receives contact form submissions from the **Contacts** page.

**Request body**
```json
{
  "name":    "Jane Smith",
  "email":   "jane@example.com",
  "subject": "Booking inquiry",
  "message": "I'd like to book an artist for my event..."
}
```

**Validation rules (server-side):**

| Field | Required | Max length |
|---|---|---|
| `name` | yes | 255 |
| `email` | yes | 255 — must be valid email format |
| `subject` | no | 500 |
| `message` | yes | — |

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Thank you for your message. It has been sent."
}
```

**Response `422 Unprocessable Entity`** — validation failed:
```json
{
  "success": false,
  "message": "One or more fields have an error. Please check and try again.",
  "errors": {
    "email": "Invalid email address"
  }
}
```

**Response `500 Internal Server Error`** — sending failed:
```json
{
  "success": false,
  "message": "There was an error trying to send your message. Please try again later."
}
```

**Implementation options:**

| Option | How-to |
|---|---|
| Custom Node/Express | `app.post('/api/contact', ...)` — insert row into `contacts` table and send email via Nodemailer |
| Formspree | Set `REACT_APP_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID` in `.env` |
| EmailJS | Replace the `fetch()` call in `src/pages/Contacts.js` with `emailjs.send(...)` |

**Used by:** `src/pages/Contacts.js`

---

## 8. Site Settings

### `GET /api/settings`

Returns global site configuration values (social URLs, contact details, etc.)
stored in the `site_settings` table.

**Response `200 OK`**
```json
{
  "site_name":        "Jacob Black",
  "site_tagline":     "Producer & DJ",
  "social_facebook":  "https://facebook.com/jacobblackdj",
  "social_twitter":   "https://twitter.com/jacobblackdj",
  "social_instagram": "https://instagram.com/jacobblackdj",
  "social_youtube":   "https://youtube.com/jacobblackdj",
  "social_telegram":  "https://t.me/jacobblackdj",
  "contact_phone":    "+1 234 567 89 01",
  "contact_address":  "178 West 27th Street, Suite 527, New York NY 10012",
  "contact_email":    "youremail@gmail.com",
  "footer_copyright": "Jacob Black"
}
```

**Used by:**
- `src/pages/Home.js` — hero social links (Facebook, Twitter, Instagram, YouTube, Telegram)
- `src/pages/Contacts.js` — phone, address, email
- `src/components/Footer.js` — social links, copyright

> **Note:** This endpoint is optional. By default the React app uses static values
> defined directly in each component. Replace those with a `useEffect` + `fetch`
> call to this endpoint to make them editable without code changes.

---

## 9. Error responses

All endpoints return standard HTTP status codes:

| Code | Meaning |
|---|---|
| `200` | OK |
| `201` | Created |
| `400` | Bad Request — malformed JSON or missing required body |
| `404` | Not Found |
| `422` | Unprocessable Entity — validation errors |
| `500` | Internal Server Error |

Error body shape:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": { "field": "validation message" }
}
```

---

## 10. Database schema reference

See **`db/migrate.sql`** for the full CREATE TABLE statements.

| Table | Purpose | Key columns |
|---|---|---|
| `artists` | Artist profiles | `id`, `name`, `slug`, `bio`, `image_url`, `social_links` (JSON) |
| `releases` | Music releases | `id`, `title`, `slug`, `artist_id`, `release_date`, `image_url`, `type` |
| `events` | Gig schedule | `id`, `artist_id`, `event_date`, `venue`, `city`, `country`, `ticket_url`, `status` |
| `posts` | Blog articles | `id`, `title`, `slug`, `excerpt`, `content`, `author`, `image_url`, `published_at` |
| `photo_albums` | Gallery albums | `id`, `title`, `artist_id`, `year`, `cover_image` |
| `photos` | Album photos | `id`, `album_id`, `image_url`, `caption`, `sort_order` |
| `contacts` | Form submissions | `id`, `name`, `email`, `subject`, `message`, `created_at` |
| `site_settings` | Global config (key/value) | `key`, `value` |

---

## Quick start — implementing the API

A minimal Node.js / Express server that satisfies all these endpoints:

```bash
npm init -y
npm install express cors mysql2 nodemailer dotenv
```

```js
// server.js — starter template
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const mysql   = require('mysql2/promise');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// CUSTOMIZATION: set DB_HOST, DB_USER, DB_PASS, DB_NAME in your .env
const db = mysql.createPool({
  host:     process.env.DB_HOST || 'localhost',
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'jacob_black_dj',
  waitForConnections: true,
  connectionLimit: 10,
});

// GET /api/artists
app.get('/api/artists', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM artists ORDER BY id');
  res.json(rows);
});

// GET /api/artists/:slug
app.get('/api/artists/:slug', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM artists WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// GET /api/releases
app.get('/api/releases', async (req, res) => {
  const [rows] = await db.query(`
    SELECT r.*, a.name AS artist_name
    FROM releases r
    JOIN artists a ON a.id = r.artist_id
    ORDER BY r.release_date DESC
  `);
  res.json(rows);
});

// GET /api/events
app.get('/api/events', async (req, res) => {
  const upcoming = req.query.upcoming === 'true';
  const sql = upcoming
    ? 'SELECT e.*, a.name AS artist_name FROM events e JOIN artists a ON a.id = e.artist_id WHERE e.event_date >= CURDATE() ORDER BY e.event_date ASC'
    : 'SELECT e.*, a.name AS artist_name FROM events e JOIN artists a ON a.id = e.artist_id ORDER BY e.event_date DESC';
  const [rows] = await db.query(sql);
  res.json(rows);
});

// GET /api/photo-albums
app.get('/api/photo-albums', async (req, res) => {
  const [rows] = await db.query(`
    SELECT pa.*, a.name AS artist_name,
      (SELECT COUNT(*) FROM photos p WHERE p.album_id = pa.id) AS photo_count
    FROM photo_albums pa
    JOIN artists a ON a.id = pa.artist_id
    ORDER BY pa.year DESC, pa.id
  `);
  res.json(rows);
});

// GET /api/photo-albums/:id/photos
app.get('/api/photo-albums/:id/photos', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM photos WHERE album_id = ? ORDER BY sort_order', [req.params.id]
  );
  res.json(rows);
});

// GET /api/posts
app.get('/api/posts', async (req, res) => {
  const [rows] = await db.query(
    'SELECT id, title, slug, excerpt, author, image_url, published_at FROM posts ORDER BY published_at DESC'
  );
  res.json(rows);
});

// GET /api/posts/:slug
app.get('/api/posts/:slug', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM posts WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// GET /api/settings
app.get('/api/settings', async (req, res) => {
  const [rows] = await db.query('SELECT `key`, `value` FROM site_settings');
  const settings = Object.fromEntries(rows.map(r => [r.key, r.value]));
  res.json(settings);
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(422).json({ success: false, message: 'Name, email and message are required.' });
  }
  await db.query(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject || null, message]
  );
  // CUSTOMIZATION: send email notification here using Nodemailer
  res.json({ success: true, message: 'Thank you for your message. It has been sent.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
```

**Environment variables (`.env` in the server directory):**

```env
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database — CUSTOMIZATION: fill in your real credentials
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=jacob_black_dj
```
