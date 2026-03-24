import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/" className="logo-text">
            <img src="/images/logo final.png" alt="Sri AadhiGuru Education Logo" className="site-logo" />
            <span>Sri AadhiGuru Education <span className="logo-ta">| ஸ்ரீ ஆதிகுரு கல்வி</span></span>
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <a href="/#services" className="nav-link">Services</a>
          <Link to="/classes" className="nav-link">Classes</Link>
          <Link to="/matrimony" className="nav-link">Matrimony 💍</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login" className="btn btn-primary d-none-mobile" style={{ padding: '0.6rem 1.5rem' }}>
            Login / Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
