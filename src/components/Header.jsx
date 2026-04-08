import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const NAV_LINKS = [
  { to: '/',          label: 'Home',      exact: true  },
  { to: '/classes',   label: 'Classes'               },
  { to: '/matrimony', label: 'Matrimony', icon: '💍'  },
  { to: '/store',     label: 'Store',     icon: '🛕'  },
  { to: '/software',  label: 'Our Software', icon: '💻' },
  { to: '/dashboard', label: 'My Bookings', icon: '📋' },
];

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (link) => {
    if (link.hash) return false;
    if (link.exact) return location.pathname === '/';
    return location.pathname.startsWith(link.to);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-container">

          {/* ── Logo ── */}
          <Link to="/" className="logo-link" onClick={() => setMenuOpen(false)}>
            <img src="/images/logo final.png" alt="Sri AadhiGuru Education" className="site-logo" />
            <div className="logo-text-block">
              <span className="logo-name">Sri AadhiGuru</span>
              <span className="logo-sub">Education | ஸ்ரீ ஆதிகுரு கல்வி</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="nav-desktop" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              link.hash
                ? <a key={link.to} href={link.to} className="nav-link">
                    {link.label}
                  </a>
                : <Link
                    key={link.to}
                    to={link.to}
                    className={`nav-link ${isActive(link) ? 'nav-link-active' : ''}`}
                  >
                    {link.icon && <span className="nav-icon">{link.icon}</span>}
                    {link.label}
                    {isActive(link) && <span className="nav-active-dot" />}
                  </Link>
            ))}

            <Link to="/login" className="nav-login-btn">
              <span className="nav-btn-icon">👤</span>
              Login / Sign Up
            </Link>
          </nav>

          {/* ── Hamburger ── */}
          <button
            className={`hamburger ${menuOpen ? 'ham-open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}
      <div className={`mobile-drawer ${menuOpen ? 'drawer-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-header">
          <Link to="/" className="logo-link drawer-logo" onClick={() => setMenuOpen(false)}>
            <img src="/images/logo final.png" alt="Logo" className="site-logo" />
            <div className="logo-text-block">
              <span className="logo-name">Sri AadhiGuru</span>
              <span className="logo-sub">Education</span>
            </div>
          </Link>
          <button className="drawer-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <nav className="drawer-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map(link => (
            link.hash
              ? <a key={link.to} href={link.to} className="drawer-link" onClick={() => setMenuOpen(false)}>
                  <span className="drawer-link-icon">🏠</span>
                  {link.label}
                </a>
              : <Link
                  key={link.to}
                  to={link.to}
                  className={`drawer-link ${isActive(link) ? 'drawer-link-active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="drawer-link-icon">{link.icon || '›'}</span>
                  {link.label}
                </Link>
          ))}
        </nav>

        <div className="drawer-footer">
          <Link to="/login" className="drawer-login-btn" onClick={() => setMenuOpen(false)}>
            👤 Login / Sign Up
          </Link>
          <p className="drawer-tagline">🕉️ Vedic · Authentic · Trusted</p>
        </div>
      </div>
    </>
  );
};

export default Header;
