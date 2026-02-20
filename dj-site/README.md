# Jacob Black — DJ & Producer Website (React)

> WordPress/Elementor theme **"Jacob"** converted to a React single-page application.

![Home page](https://github.com/user-attachments/assets/901fa909-5e44-4f1c-bf90-cf17c55d1031)

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero home page with live-music video background |
| `/artists` | Artist roster grid |
| `/artists/:slug` | Individual artist profile |
| `/releases` | Auto-playing image slider with release list |
| `/events` | Upcoming gig listing (date, venue, ticket status) |
| `/photo` | Photo albums gallery with lightbox |
| `/about` | About page with biography and background image |
| `/contacts` | Contact info + contact form |
| `/blog` | Blog post grid |

---

## Quick Start

```bash
cd dj-site
npm install
npm start        # http://localhost:3000
npm run build    # production build → /build
```

---

## Configuration — API & Database

All API/DB configuration is in **`src/config/api.js`**.  
Copy `.env.example` → `.env` and fill in your values before running.

### Environment variables (`.env`)

```env
# Back-end REST API base URL
REACT_APP_API_BASE_URL=http://localhost:5000/api

# WordPress REST API (if using WP as headless CMS)
REACT_APP_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Contact form endpoint
REACT_APP_CONTACT_ENDPOINT=http://localhost:5000/api/contact
```

### Where to add your API calls

Each page component contains a comment block labelled **`CUSTOMIZATION / API NOTES`** showing exactly where to replace static data with `fetch()` calls. Key locations:

| File | What to replace |
|---|---|
| `src/pages/Artists.js` | Static `artists` array → `fetch(ENDPOINTS.artists)` |
| `src/pages/ArtistSingle.js` | Static `artistData` map → `fetch(ENDPOINTS.artist(slug))` |
| `src/pages/Releases.js` | Static `slides` array → `fetch(ENDPOINTS.releases)` |
| `src/pages/Events.js` | Static `events` array → `fetch(ENDPOINTS.events)` |
| `src/pages/Photo.js` | Static `albums` array → `fetch(ENDPOINTS.photoAlbums)` |
| `src/pages/Blog.js` | Static `posts` array → `fetch(ENDPOINTS.posts)` |
| `src/pages/Contacts.js` | `handleSubmit` POST → `ENDPOINTS.contact` |

### Contact form options

**Option A — Custom back-end:**  
Set `REACT_APP_CONTACT_ENDPOINT=https://your-api.com/contact`

**Option B — Formspree (serverless, free tier):**  
1. Sign up at [formspree.io](https://formspree.io)  
2. Set `REACT_APP_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID`

**Option C — EmailJS (client-side):**  
`npm install @emailjs/browser` and replace the `fetch()` in `Contacts.js`.

### Database tables (from `theme/manual_install/jacob.sql`)

If you build a custom back-end, mirror these tables:

| Table | Columns |
|---|---|
| `artists` | id, name, slug, bio, image_url, social_links |
| `releases` | id, title, artist, date, image_url, type |
| `events` | id, day, month_year, artist, venue, city, ticket_url, status |
| `posts` | id, title, slug, content, date, image_url, author |
| `photo_albums` | id, title, artist, year, cover_image, photo_count |
| `photos` | id, album_id, image_url, caption |
| `contacts` | id, name, email, subject, message, created_at |

---

## Customization checklist

- [ ] Update `src/components/Footer.js` — replace `#` social links with real URLs
- [ ] Update `src/pages/Contacts.js` — replace phone/address/email with your own
- [ ] Update `src/pages/About.js` — replace biography text and photo
- [ ] Update `src/pages/ArtistSingle.js` — replace artist bios and social links
- [ ] Update `public/index.html` — add OG image URL for social sharing
- [ ] Configure `.env` with your API/DB credentials
- [ ] Replace `public/assets/images/` with your production-quality images

---

## Project structure

```
dj-site/
├── public/
│   ├── assets/images/   ← All WP uploads (slider, artist photos, bg images)
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js    ← Fixed navigation bar
│   │   └── Footer.js    ← Footer with social links
│   ├── config/
│   │   └── api.js       ← ⚠️ All API endpoint configuration here
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Artists.js
│   │   ├── ArtistSingle.js
│   │   ├── Releases.js
│   │   ├── Events.js
│   │   ├── Photo.js
│   │   ├── About.js
│   │   ├── Contacts.js
│   │   └── Blog.js
│   ├── styles/
│   │   └── main.css     ← All styles (matches WP theme colours/fonts)
│   └── App.js           ← Router + layout
├── .env.example         ← Copy to .env and fill in your values
└── package.json
```

---

## Technology

- **React 18** (Create React App)
- **React Router v6** — client-side routing
- **CSS** — custom stylesheet matching original WordPress/Elementor theme
- **Fonts** — Red Hat Display, Kristi, Barrio (Google Fonts, matching WP theme)
- **Colors** — `#047eee` (blue accent), `#c5092b` (red/sold-out)


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
