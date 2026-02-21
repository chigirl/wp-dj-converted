import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Header / Navigation Component
 *
 * Nav links mirror the WordPress theme's header menu:
 *   Artists | Releases | Events | Photo | About | Contacts
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Artists',  to: '/artists' },
    { label: 'Releases', to: '/releases' },
    { label: 'Events',   to: '/events' },
    { label: 'Photo',    to: '/photo' },
    { label: 'About',    to: '/about' },
    { label: 'Contacts', to: '/contacts' },
  ];

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <NavLink to="/" className="site-logo">
          Jacob<span>Black</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="main-nav">
          <ul>
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {navLinks.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
