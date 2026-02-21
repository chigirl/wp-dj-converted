import React from 'react';

/**
 * Footer Component
 *
 * Mirrors the WordPress theme footer:
 *   - Copyright line
 *   - Social links: Facebook, Twitter, Instagram, YouTube, Telegram
 *
 * CUSTOMIZATION: Replace the '#' href values with your actual social profile URLs.
 * You can also fetch these from an API endpoint (see src/config/api.js).
 */
function Footer() {
  const socialLinks = [
    { label: 'Facebook',  href: '#' /* TODO: add your Facebook URL  */ },
    { label: 'Twitter',   href: '#' /* TODO: add your Twitter URL   */ },
    { label: 'Instagram', href: '#' /* TODO: add your Instagram URL */ },
    { label: 'YouTube',   href: '#' /* TODO: add your YouTube URL   */ },
    { label: 'Telegram',  href: '#' /* TODO: add your Telegram URL  */ },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-copy">
          {/* TODO: Update copyright holder name */}
          <a href="https://zemez.io/" target="_blank" rel="noreferrer">Jacob Black</a>{' '}
          &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>

        <div className="footer-social">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
