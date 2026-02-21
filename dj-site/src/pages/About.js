import React from 'react';

/**
 * About Page
 *
 * Content source: WordPress page "About" (page_id=17)
 * Original content: biography text + phone number
 *
 * CUSTOMIZATION / API NOTES:
 *   To load this content from a CMS/API, fetch from ENDPOINTS.pages or a
 *   custom /about endpoint. See src/config/api.js.
 *
 *   You should also replace the phone number and biography text below with
 *   your actual information.
 */
function About() {
  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <div
        className="page-hero"
        style={{
          backgroundImage: 'url(/assets/images/about-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <h1>About</h1>
        </div>
      </div>

      {/* About Content */}
      <section className="section about-section">
        <div className="container">
          <div className="about-grid">
            {/* Portrait */}
            <div className="about-image">
              <img
                src="/assets/images/jacob.jpg"
                alt="Jacob Black"
                style={{ width: '100%', height: 500, objectFit: 'cover' }}
              />
            </div>

            {/* Text */}
            <div className="about-text">
              <h2 className="section-title">
                About <span>Jacob Black</span>
              </h2>

              {/* CUSTOMIZATION: Replace biography text with your own */}
              <p className="about-intro">
                Nulla non ullamcorper libero, et gravida urna. Aliquam tincidunt tempus velit a tincidunt.
              </p>

              <p className="about-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus augue, finibus eget
                condimentum in, rutrum ac metus. Nulla non ullamcorper libero, et gravida urna. Aliquam
                tincidunt tempus velit a tincidunt.
              </p>

              <p className="about-body">
                Condimentum in, rutrum ac metus. Nulla non ullamcorper libero et gravida urna. Aliquam
                tincidunt tempus velit.
              </p>

              {/* CUSTOMIZATION: Replace phone number with your own contact number */}
              <a href="tel:+12345678901" className="about-contact-link">
                <span>📞</span>
                +1 234 567 89 01
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary About section with background image */}
      <section
        className="section"
        style={{
          background: '#0a0a0a',
          backgroundImage: 'url(/assets/images/about-bg-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Music is <span>Life</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto', fontSize: 16, lineHeight: 1.8 }}>
            {/* CUSTOMIZATION: Replace with your extended bio/mission statement */}
            We are always ready for musical discoveries and new talents. Send us your own demos.
            If this is what we are looking for, we will definitely give you feedback!
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
