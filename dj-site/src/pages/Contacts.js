import React, { useState } from 'react';
import { ENDPOINTS } from '../config/api';

/**
 * Contacts Page — Contact information + form
 *
 * Content source: WordPress page "Contacts" (page_id=19)
 * Original CF7 form: name, email, subject, message
 *
 * CUSTOMIZATION NOTES:
 * ─────────────────────────────────────────────────────────────────────────
 * 1. UPDATE CONTACT DETAILS:
 *    Replace the phone, address, and email values in the `contactInfo`
 *    array below with your real contact information.
 *
 * 2. CONFIGURE THE FORM ENDPOINT:
 *    The form submits a POST request to ENDPOINTS.contact, which is defined
 *    in src/config/api.js.  You have two options:
 *
 *    Option A — Custom back-end:
 *      Set REACT_APP_CONTACT_ENDPOINT=https://your-api.com/contact in .env
 *      Your endpoint should accept: { name, email, subject, message }
 *      And return: { success: true } or { success: false, message: '...' }
 *
 *    Option B — Formspree (serverless, free tier available):
 *      a. Sign up at https://formspree.io
 *      b. Create a form and copy the form ID
 *      c. Set REACT_APP_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
 *
 *    Option C — EmailJS (client-side email sending):
 *      a. Sign up at https://www.emailjs.com
 *      b. Install: npm install @emailjs/browser
 *      c. Replace the fetch() call below with emailjs.send(...)
 * ─────────────────────────────────────────────────────────────────────────
 */

// CUSTOMIZATION: Update these values with your real contact information
const contactInfo = [
  {
    icon: '📞',
    label: 'Phone',
    content: (
      <a href="tel:+12345678901">+1 234 567 89 01</a>
    ),
  },
  {
    icon: '📍',
    label: 'Address',
    content: '178 West 27th Street, Suite 527\nNew York NY 10012',
  },
  {
    icon: '✉️',
    label: 'Email',
    content: (
      <a href="mailto:youremail@gmail.com">youremail@gmail.com</a>
    ),
  },
];

function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      // CUSTOMIZATION: ENDPOINTS.contact is configured in src/config/api.js
      const res = await fetch(ENDPOINTS.contact, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data.message || 'There was an error sending your message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('There was an error trying to send your message. Please try again later.');
    }
  }

  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <div className="page-hero" style={{ background: '#0a0a0a' }}>
        <div className="page-hero-content">
          <h1>Contacts</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contacts-grid">
            {/* Contact Info */}
            <div className="contacts-info">
              <h2>
                Got a project?<br />
                Let&apos;s make great<br />
                things together!
              </h2>
              <p className="contacts-tagline">
                We are always ready for musical discoveries and new talents.
                Send us your own demos. If this is what we are looking for,
                we will definitely give you a feedback!
              </p>

              {contactInfo.map((item) => (
                <div className="contact-detail" key={item.label}>
                  <div className="contact-detail-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div className="contact-detail-text">
                    {typeof item.content === 'string'
                      ? item.content.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)
                      : item.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  Your Name (required)
                </label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  Your Email (required)
                </label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  className="form-input"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="form-success">
                  ✓ Thank you for your message. It has been sent.
                </p>
              )}
              {status === 'error' && (
                <p className="form-error">✗ {errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacts;
