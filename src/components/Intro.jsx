import { useEffect, useState } from 'react';
import './Intro.css';

const Intro = () => {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Keep intro on screen for 2.6 seconds, then start left/right split out
    const timer = setTimeout(() => {
      setExiting(true);
    }, 2600);

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
    <div className={`intro-overlay ${exiting ? 'split-open' : ''}`}>
      {/* Background doors that split left and right */}
      <div className="intro-door left-door"></div>
      <div className="intro-door right-door"></div>
      
      <div className="intro-content">
        <div className="intro-logo-wrapper">
          <div className="intro-logo-spinner">
            <img src="/images/logo-final.png" alt="Sri AadhiGuru Preloader Logo" className="intro-logo" />
          </div>
        </div>
        <div className="intro-text-row">
           <h1 className="intro-title slide-from-left">Sri</h1>
           <h1 className="intro-title slide-from-right">AadhiGuru</h1>
        </div>
        <p className="intro-subtitle">Vedic · Authentic · Trusted</p>
      </div>
    </div>
  );
};

export default Intro;
