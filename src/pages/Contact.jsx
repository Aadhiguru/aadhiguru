import './Contact.css';

const Contact = () => {
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
                  <p><strong>Head Office:</strong> 48/29, N Mada St, near masilamanieswarar temple, near EB office, Thirumullaivoyal, Chennai, Tamil Nadu 600062</p>
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
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your message has been sent.'); }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Your Email" required />
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
                <button type="submit" className="btn btn-primary w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        {/* Mock Map Placeholder with neat styling */}
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
