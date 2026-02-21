/**
 * Tests for the Jacob Black DJ site
 *
 * Note: React Router v7 is incompatible with react-scripts 5's bundled Jest
 * version (which predates package.json `exports` map support). We mock
 * react-router-dom so the navigation components can be unit-tested without
 * starting the full router.
 */
import { render, screen } from '@testing-library/react';

// Mock react-router-dom so tests work with react-scripts 5 / Jest 27
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  NavLink: ({ children, to, className }) => (
    <a href={to} className={typeof className === 'function' ? className({ isActive: false }) : className}>
      {children}
    </a>
  ),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useParams: () => ({}),
}));

// Import components after mocking
const Header = require('./components/Header').default;
const Footer = require('./components/Footer').default;
const Home   = require('./pages/Home').default;

test('renders site logo with artist name', () => {
  render(<Header />);
  expect(screen.getByText(/Jacob/i)).toBeInTheDocument();
});

test('renders all main navigation links', () => {
  render(<Header />);
  const navLinks = ['Artists', 'Releases', 'Events', 'Photo', 'About', 'Contacts'];
  navLinks.forEach((label) => {
    // Both desktop and mobile nav render links so we use getAllByRole
    const links = screen.getAllByRole('link', { name: label });
    expect(links.length).toBeGreaterThan(0);
  });
});

test('renders footer with social links', () => {
  render(<Footer />);
  expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Facebook/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /YouTube/i })).toBeInTheDocument();
});

test('Home hero displays social links (Facebook, Twitter, Instagram, YouTube, Telegram)', () => {
  // jsdom does not implement HTMLMediaElement.play(); mock it to prevent the error
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();

  render(<Home />);
  const socialPlatforms = ['Facebook', 'Twitter', 'Instagram', 'YouTube', 'Telegram'];
  socialPlatforms.forEach((platform) => {
    expect(screen.getByRole('link', { name: platform })).toBeInTheDocument();
  });
});
