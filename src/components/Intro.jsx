import { useEffect, useState } from 'react';
import './Intro.css';

const Intro = () => {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Show splash for 3 seconds before starting fade-out
    const timer = setTimeout(() => {
    setExiting(true);
    }, 3000);

    // Completely unmount after transition completes
    const removeTimer = setTimeout(() => {
    setShow(false);
    }, 4000);

    return () => {
    clearTimeout(timer);
    clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`vidya-intro-overlay ${exiting ? 'fade-out' : ''}`}>
    
    {/* Side Visuals like the reference site */}
    <div className="vidya-side-visual left">
      <img src="/images/bg_astrology_new.png" alt="" />
    </div>
    <div className="vidya-side-visual right">
      <img src="/images/bg_yoga.png" alt="" />
    </div>

    <div className="vidya-intro-container">
      <div className="vidya-logo-frame">
      <div className="vidya-orbit-ring"></div>
      <div className="vidya-orbit-ring inner"></div>
      <img src="/images/intro_wheel.png" alt="Sri AadhiGuru Astrology Wheel" className="vidya-logo-img wheel-style" />
      </div>
      <div className="vidya-loading-text">
      SRI AADHIGURU EDUCATION
      </div>
    </div>
    </div>
  );
};

export default Intro;
