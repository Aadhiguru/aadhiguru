import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">Traditional Wisdom | Sri AadhiGuru Education</span>
          <h1 className="hero-title">
            Illuminate Your Path With <span className="text-highlight">Sacred Knowledge</span>
            <div className="hero-title-ta">புனித ஞானத்துடன் உங்களின் பாதையை பிரகாசமாக்குங்கள்</div>
          </h1>
          <p className="hero-subtitle">
            Expert guidance in Astrology, Yoga, Acupuncture & Varma, and spoken languages. Dedicated to your personal and educational growth.
          </p>
          <div className="hero-actions">
            <a href="#services" className="btn btn-primary">Explore Services</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-frame">
            <img src="/images/authorpicfinal.jpeg" alt="Author Portrait" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
