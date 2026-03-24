import './AppointmentForm.css';

const AppointmentForm = () => {
  return (
    <section id="appointment" className="section">
      <div className="container">
        <div className="appointment-wrapper">
          <div className="appointment-info">
            <h2 className="section-title" style={{ textAlign: 'left', color: 'white', marginBottom: '1.5rem' }}>Book Your Consultation</h2>
            <p className="appointment-desc">
              Schedule an in-person or online session with our expert astrologers. Gain profound insights into your health, wealth, and future path.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 9600 666 225</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>aadhiguru.com@gmail.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>48/29, N Mada St, Thirumullaivoyal, Chennai</span>
              </div>
            </div>
          </div>
          
          <div className="appointment-form-box">
            <h3 className="form-title">Request a Callback</h3>
            <p className="form-subtitle">Fill in your details and our team will get back to you shortly.</p>
            <form className="form">
              <div className="form-group">
                <input type="text" placeholder="Full Name *" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number *" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <select defaultValue="" required>
                    <option value="" disabled>Select Purpose *</option>
                    <option value="vastu">Vastu Consultation</option>
                    <option value="astrology">Traditional Astrology</option>
                    <option value="marriage">Marriage Matching</option>
                    <option value="prasannam">Prasannam</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <textarea placeholder="Description / Notes" rows="4"></textarea>
              </div>
              <button type="button" className="btn btn-primary w-100" style={{ padding: '1.25rem', marginTop: '1rem', borderRadius: 'var(--radius-full)' }} onClick={() => alert('Booking flow would start here!')}>
                Reserve Appointment Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
