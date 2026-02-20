/**
 * App.js — Root application component
 *
 * Sets up React Router with all page routes that match the original
 * WordPress theme navigation structure:
 *   /             → Home (hero video page)
 *   /artists      → Artist roster grid
 *   /artists/:slug→ Individual artist profile
 *   /releases     → Releases slider
 *   /events       → Events / gig listing
 *   /photo        → Photo albums gallery
 *   /about        → About page
 *   /contacts     → Contact information + form
 *   /blog         → Blog post listing
 *
 * CUSTOMIZATION / API NOTES:
 *   All API endpoint configuration lives in src/config/api.js.
 *   Each page component contains detailed comments on where to add
 *   fetch() calls to replace static data with live CMS/DB data.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/main.css';

import Header     from './components/Header';
import Footer     from './components/Footer';

import Home        from './pages/Home';
import Artists     from './pages/Artists';
import ArtistSingle from './pages/ArtistSingle';
import Releases    from './pages/Releases';
import Events      from './pages/Events';
import Photo       from './pages/Photo';
import About       from './pages/About';
import Contacts    from './pages/Contacts';
import Blog        from './pages/Blog';

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/artists"         element={<Artists />} />
          <Route path="/artists/:slug"   element={<ArtistSingle />} />
          <Route path="/releases"        element={<Releases />} />
          <Route path="/events"          element={<Events />} />
          <Route path="/photo"           element={<Photo />} />
          <Route path="/about"           element={<About />} />
          <Route path="/contacts"        element={<Contacts />} />
          <Route path="/blog"            element={<Blog />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div style={{ padding: '120px 20px', textAlign: 'center', color: '#fff' }}>
                <h1 style={{ fontSize: 80, fontWeight: 700 }}>404</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>Page not found</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
