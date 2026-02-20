import React from 'react';

/**
 * Events Page
 *
 * Content source: WordPress page "Events" (page_id=13)
 * Data extracted from Elementor builder markup in jacob.sql.
 *
 * CUSTOMIZATION / API NOTES:
 *   To load events dynamically from an API, replace the static `events`
 *   array with a fetch() call to ENDPOINTS.events (src/config/api.js).
 *
 *   Expected API response shape:
 *   [
 *     {
 *       id: 1,
 *       day: '29',
 *       monthYear: 'January\n2024',
 *       artist: 'Victoria Russell',
 *       venue: 'Radio XBass',
 *       city: 'Warszawa, PL',
 *       ticketUrl: 'https://...',
 *       status: 'available' | 'sold-out' | 'free',
 *     },
 *     ...
 *   ]
 */

// ---------------------------------------------------------------------------
// Static data — extracted from jacob.sql wp_posts (page_id=13)
// Replace with API data when your back-end is ready.
// ---------------------------------------------------------------------------
const events = [
  {
    id: 1,
    day: '29',
    month: 'January',
    year: '2024',
    artist: 'Victoria Russell',
    venue: 'Radio XBass',
    city: 'Warszawa, PL',
    ticketUrl: '#', // TODO: replace with real ticket URL
    status: 'available',
  },
  {
    id: 2,
    day: '22',
    month: 'December',
    year: '2023',
    artist: 'Priscilla Williamson',
    venue: 'Fabric Club',
    city: 'London, UK',
    ticketUrl: '#', // TODO: replace with real ticket URL
    status: 'available',
  },
  {
    id: 3,
    day: '10',
    month: 'November',
    year: '2023',
    artist: 'Shawn Robertson',
    venue: 'State Farm Arena',
    city: 'Atlanta, GA',
    ticketUrl: '#',
    status: 'sold-out',
  },
  {
    id: 4,
    day: '12',
    month: 'October',
    year: '2023',
    artist: 'Cameron Cooper',
    venue: 'Migros Pour Cent',
    city: 'Genève, CH',
    ticketUrl: '#', // TODO: replace with real ticket URL
    status: 'available',
  },
  {
    id: 5,
    day: '24',
    month: 'September',
    year: '2023',
    artist: 'Victoria Russell',
    venue: 'Alice Tully Hall',
    city: 'New York, NY',
    ticketUrl: '#',
    status: 'free',
  },
  {
    id: 6,
    day: '07',
    month: 'September',
    year: '2023',
    artist: 'Victoria Russell',
    venue: 'Kwadrat Club',
    city: 'Warszawa, PL',
    ticketUrl: '#', // TODO: replace with real ticket URL
    status: 'available',
  },
];

function ticketLabel(status) {
  if (status === 'sold-out') return 'Sold Out';
  if (status === 'free')     return 'Free';
  return 'Buy Tickets';
}

function Events() {
  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <div
        className="page-hero"
        style={{ background: 'linear-gradient(135deg, #000 60%, #0a1a30 100%)' }}
      >
        <div className="page-hero-content">
          <h1>Events</h1>
        </div>
      </div>

      {/* Events List */}
      <section className="section">
        <div className="container">
          <ul className="events-list">
            {events.map((evt) => (
              <li className="event-item" key={evt.id}>
                {/* Date Box */}
                <div className="event-date-box">
                  <div className="event-day">{evt.day}</div>
                  <div className="event-month-year">
                    {evt.month}<br />{evt.year}
                  </div>
                </div>

                {/* Event Info */}
                <div className="event-info">
                  <div className="event-artist">{evt.artist}</div>
                  <div className="event-venue">
                    {evt.venue} — {evt.city}
                  </div>
                </div>

                {/* Ticket CTA — only renders as an anchor when a real URL is set */}
                {evt.ticketUrl && evt.ticketUrl !== '#' ? (
                  <a
                    href={evt.ticketUrl}
                    className={`event-ticket${
                      evt.status === 'sold-out' ? ' sold-out' :
                      evt.status === 'free'     ? ' free'     : ''
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ticketLabel(evt.status)}
                  </a>
                ) : (
                  <span
                    className={`event-ticket${
                      evt.status === 'sold-out' ? ' sold-out' :
                      evt.status === 'free'     ? ' free'     : ''
                    }`}
                    style={{ cursor: evt.status === 'sold-out' ? 'default' : 'pointer' }}
                  >
                    {ticketLabel(evt.status)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Events;
