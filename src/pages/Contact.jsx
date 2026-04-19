import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Regex for robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value && !emailRegex.test(value)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      alert('Please fix the invalid email address before submitting.');
      return;
    }
    alert('Thank you! Your message has been sent.');
  };

  return (
    <div className="contact-page">
      <section className="section bg-surface">
        <div className="container">
          <h2 className="section-title">Get In Touch | தொடர்பு கொள்ளவும்</h2>
          <p className="section-subtitle">We are here to guide you toward a better future</p>

          <div className="contact-grid">
            <div className="contact-methods">
              <div className="method-card">
                <span className="method-icon">📍</span>
                <div className="method-content">
                  <h3>Visit Our Office</h3>
                  <p>
                    <strong>Head Office:</strong>{' '}
                    <a 
                      href="https://maps.app.goo.gl/LtSZq5DkLmreJyEZ7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'var(--color-primary)', textUnderlineOffset: '3px' }}
                      title="Open in Google Maps"
                    >
                      48/29, N Mada St, near masilamanieswarar temple, near EB office, Thirumullaivoyal, Chennai, Tamil Nadu 600062
                    </a>
                  </p>
                </div>
              </div>

              <div className="method-card">
                <span className="method-icon">📞</span>
                <div className="method-content">
                  <h3>Call Us</h3>
                  <p>+91 9600 666 225</p>
                  <p>+91 9551 532 751</p>
                  <p>Available Mon - Sat (9:00 AM - 7:00 PM)</p>
                </div>
              </div>

              <div className="method-card">
                <span className="method-icon">✉️</span>
                <div className="method-content">
                  <h3>Email Us</h3>
                  <p>aadhiguru.com@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h3>Send a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={validateEmail}
                    className={emailError ? 'input-error' : ''}
                    style={emailError ? { borderColor: '#ef4444', outlineColor: '#ef4444' } : {}}
                    required 
                  />
                  {emailError && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>{emailError}</span>}
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select required>
                    <option value="">Select a Topic</option>
                    <option value="astrology">Astrology & Vastu</option>
                    <option value="yoga">Yoga & Meditation</option>
                    <option value="acupuncture">Acupuncture</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="5" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={!!emailError}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="mock-map">
          <div className="map-info">
            <h4>Location Highlight</h4>
            <p>Our Chennai Office is conveniently located near Masilamanieswarar temple in Thirumullaivoyal.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
