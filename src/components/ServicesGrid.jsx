import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, allServices } from '../data/servicesData';
import './ServicesGrid.css';


const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState('astrology');

  const filteredServices = allServices.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="section bg-surface">
      <div className="container">
        <h2 className="section-title">Our Sacred Services | நமது புனிதமான சேவைகள்</h2>
        <p className="section-subtitle">Diverse Pathways to Wisdom | ஞானத்திற்கான பல்வேறு பாதைகள்</p>
        
        <div className="category-filter">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="btn-en">{cat.name_en}</div>
              <div className="btn-ta">{cat.name_ta}</div>
            </button>
          ))}
        </div>

        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card animate-in">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              
              {/* Hover Benefits Overlay */}
              <div className="card-overlay">
                <h4 className="overlay-title">Key Benefits</h4>
                <ul className="benefits-list">
                  {service.benefits?.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
                <div className="overlay-actions">
                  <button className="btn btn-secondary cta-btn">Book</button>
                  <Link to={`/service/${service.id}`} className="btn btn-primary cta-btn">
                    About
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
