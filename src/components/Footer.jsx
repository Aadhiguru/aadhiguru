import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo-container">
              <img src="/images/logo.png" alt="Sri AadhiGuru Logo" className="footer-site-logo" />
              <h4 className="footer-logo">Sri AadhiGuru Education</h4>
            </div>
            <p className="footer-desc">
              Providing traditional Vedic astrological services, Vastu consultations, and numeric guidance.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#appointment">Book Appointment</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Head Office</h4>
            <address className="footer-address">
              48/29, N Mada St, near masilamanieswarar temple,<br />
              near EB office, Thirumullaivoyal,<br />
              Chennai, Tamil Nadu 600062
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AadhiGuru. Redesigned with a neat & clean approach.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
