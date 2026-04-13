import { useNavigate } from 'react-router-dom';
import './Software.css';

const Software = () => {
  const navigate = useNavigate();

  const handlePurchase = (e) => {
    e.preventDefault();
    
    // Add software to universal cart
    const softwareProduct = {
      id: 'software_pro_1',
      category: 'Software',
      name: 'AadhiGuru Pro Astrology Studio',
      name_ta: 'ஆதிகுரு ப்ரோ ஆஸ்ட்ராலஜி',
      price: 9999,
      originalPrice: 14999,
      qty: 1,
      emoji: '💻',
      seller: 'AadhiGuru'
    };

    const savedCart = localStorage.getItem('aadhiguru_cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    // Check if already in cart
    if (!cart.find(item => item.id === softwareProduct.id)) {
      cart.push(softwareProduct);
      localStorage.setItem('aadhiguru_cart', JSON.stringify(cart));
    }
    
    navigate('/checkout');
  };

  return (
    <div className="software-page">
      {/* Hero Section */}
      <section className="software-hero">
        <div className="container software-hero-container">
          <div className="software-hero-content">
            <div className="badge-premium">Premium Software ✦</div>
            <h1 className="software-title">AadhiGuru Pro Astrology Studio</h1>
            <p className="software-subtitle">
              The ultimate high-precision astrology desktop application. Trusted by professional astrologers worldwide for generating accurate KP setups, detailed horoscopes, and deep Vastu reports.
            </p>
            <div className="software-price">
              <span className="price-current">₹9,999</span>
              <span className="price-old">₹14,999</span>
              <span className="price-discount">Save 33%</span>
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary btn-glow" onClick={handlePurchase}>
                🛒 Buy Now 
              </button>
              <a href="#features" className="btn btn-outline-white">Explore Features</a>
            </div>
            <p className="license-info">✓ Lifetime License • Windows & Mac • Free Updates for 1 Year</p>
          </div>
          <div className="software-hero-visual">
            <div className="glass-mockup">
              <div className="mockup-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="mockup-body">
                <div className="app-sidebar"></div>
                <div className="app-main">
                  <div className="chart-circle">
                    <div className="inner-chart"></div>
                  </div>
                  <div className="app-data-bars">
                    <div></div><div></div><div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="software-features section bg-surface">
        <div className="container">
          <h2 className="section-title">Why Choose AadhiGuru Pro?</h2>
          <p className="section-subtitle">Engineered for Accuracy & Speed</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="f-icon">⭐</div>
              <h3>Advanced KP System</h3>
              <p>Pin-point accurate stellar astrology tools with sub-lord interpretations and transit charting.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">💍</div>
              <h3>Marriage Matching Pro</h3>
              <p>Generate deep Porutham reports comparing multiple charts instantly with visual scoring.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">🖨️</div>
              <h3>White-label Reports</h3>
              <p>Print beautiful multi-page PDF horoscopes with your own branding, logo, and contact details.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">⏱️</div>
              <h3>Prasannam Modules</h3>
              <p>Includes Jamakkol, Thamboola, and Ashta Mangala Prasannam specific dynamic calculators.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">🏠</div>
              <h3>Vastu Grid Overlay</h3>
              <p>Upload floor plans and automatically overlay Vastu energy grids and planetary directions.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">🔒</div>
              <h3>Secure Offline Mode</h3>
              <p>Works 100% offline. Client data stays local on your machine ensuring maximum privacy.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Software;
