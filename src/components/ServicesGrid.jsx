import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { categories, allServices } from '../data/servicesData';
import './ServicesGrid.css';


const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState('astrology');
  
  // Booking Form States
  const [bookingService, setBookingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', purpose: '', date: '', slot: '', gender: 'Male', locationFrom: '', locationTo: 'Thirumullaivoyal' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('pending');
  const [touched, setTouched] = useState({});

  useEffect(() => {
    let channel;
    if (bookingId && formSuccess) {
      channel = supabase.channel('table-db-changes')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'bookings', filter: `id=eq.${bookingId}` },
          (payload) => {
            console.log('Realtime DB Change:', payload);
            if (payload.new && payload.new.status) {
              setBookingStatus(payload.new.status);
            }
          }
        )
        .subscribe();
    }
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [bookingId, formSuccess]);

  const filteredServices = allServices.filter(s => s.category === activeCategory);

  const generateSlots = (category) => {
    const slots = [];
    if (category === 'yoga') {
      for (let h = 5; h < 9; h++) {
        slots.push(`${h}:00 AM`, `${h}:30 AM`);
      }
      slots.push('9:00 AM');
    } else {
      for (let h = 10; h <= 11; h++) {
        slots.push(`${h}:00 AM`, `${h}:30 AM`);
      }
      slots.push('12:00 PM', '12:30 PM');
      for (let h = 1; h <= 8; h++) {
        slots.push(`${h}:00 PM`, `${h}:30 PM`);
      }
      slots.push('9:00 PM');
    }
    return slots;
  };

  const handleBookClick = (service) => {
    if (['tuition', 'extracurricular'].includes(service.category)) {
      alert('For Education and Extra Curricular activities, please register via the Classes page or Contact Us directly.');
    } else {
      setBookingService(service);
      setFormSuccess(false);
      setBookingId(null);
      setBookingStatus('pending');
      setTouched({});
      setFormData({ name: '', phone: '', purpose: '', date: '', slot: '', gender: 'Male', locationFrom: '', locationTo: 'Thirumullaivoyal' });
    }
  };

  const getFieldError = (name, value) => {
    const val = typeof value === 'string' ? value.trim() : value;
    switch (name) {
      case 'name':
        if (!val || val.length < 2 || !/^[A-Za-z ]+$/.test(val)) return "Enter a valid name";
        return "";
      case 'gender':
        if (!val) return "Please select gender";
        return "";
      case 'phone':
        if (!/^[0-9]{10}$/.test(val)) return "Enter a valid 10-digit phone number";
        return "";
      case 'locationFrom':
        if (!val || val.length < 3) return "Enter a valid location";
        return "";
      case 'locationTo':
        if (!val) return "Enter meeting location";
        return "";
      case 'purpose':
        if (!val || val.length < 5) return "Please describe your purpose";
        return "";
      case 'date': {
        if (!val) return "Select a valid date";
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (selectedDate < today) return "Select a valid date";
        return "";
      }
      case 'slot':
        if (!val) return "Please select a time slot";
        return "";
      default:
        return "";
    }
  };

  const formErrors = {
    name: getFieldError('name', formData.name),
    gender: getFieldError('gender', formData.gender),
    phone: getFieldError('phone', formData.phone),
    locationFrom: getFieldError('locationFrom', formData.locationFrom),
    locationTo: getFieldError('locationTo', formData.locationTo),
    purpose: getFieldError('purpose', formData.purpose),
    date: getFieldError('date', formData.date),
    slot: getFieldError('slot', formData.slot)
  };

  const isFormValid = Object.values(formErrors).every(err => err === "");

  const handleBlur = (field) => setTouched(prev => ({ ...prev, [field]: true }));
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      // Mark all touched so errors show
      const allTouched = Object.keys(formData).reduce((acc, key) => ({...acc, [key]: true}), {});
      setTouched(allTouched);
      return;
    }

    // 1. Silent API trigger to send WhatsApp message to Owner without opening user's WhatsApp app
    const targetNumber = '919600666225';
    const whatsappMessage = `*New Service Booking*
Service: ${bookingService.title}
Client: ${formData.name} (${formData.gender})
Phone: ${formData.phone}
Purpose: ${formData.purpose}
Location: ${formData.locationFrom}
Time: ${formData.date} at ${formData.slot}`;

    try {
      // FREE WHATSAPP API GATEWAY (CallMeBot)
      // Since WhatsApp blocks direct silent messages to stop spam, this uses CallMeBot.
      const apiKey = import.meta.env.VITE_CALLMEBOT_APIKEY; 
      
      if (apiKey) {
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const url = `https://api.callmebot.com/whatsapp.php?phone=+919600666225&text=${encodedMessage}&apikey=${apiKey}`;
        
        await fetch(url, { mode: 'no-cors' })
          .catch(err => console.log('Silent WA triggered', err));
      } else {
        console.warn("CallMeBot API Key missing! Cannot send WhatsApp silently.");
      }
      
      // 2. Insert into Supabase "bookings" table directly triggering Edge Functions
      const { data, error } = await supabase.from('bookings').insert([{
        full_name: formData.name,
        gender: formData.gender,
        phone_number: formData.phone,
        calling_location: formData.locationFrom,
        meeting_location: formData.locationTo,
        purpose_of_booking: `${bookingService.title} - ${formData.purpose}`,
        date: formData.date,
        time_slot: formData.slot,
        status: 'pending',
        payment_status: 'unpaid'
      }]).select();
      
      if (data && data.length > 0) {
        setBookingId(data[0].id);
        localStorage.setItem('userPhone', formData.phone);
      }
    } catch (error) {
      console.error("Booking error:", error);
    }

    setFormSuccess(true);

    setTimeout(() => {
    }, 7000); 
  };

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
                  <button className="btn btn-secondary cta-btn" onClick={() => handleBookClick(service)}>Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingService && (
        <div className="modal-overlay" onClick={() => setBookingService(null)}>
          <div className="booking-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book Slot: {bookingService.title}</h3>
              <button className="close-btn" onClick={() => setBookingService(null)}>✕</button>
            </div>

            {formSuccess ? (
              <div className="success-message">
                <style>
                  {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                </style>
                {bookingStatus === 'accepted' ? (
                  <>
                    <span className="success-icon" style={{color: '#16a34a'}}>🎉</span>
                    <p style={{fontSize: '1.4rem', fontWeight: 'bold', color: '#16a34a'}}>Your booking is Accepted!</p>
                    <p style={{marginTop: '0.8rem', lineHeight: '1.6'}}>The master has confirmed your slot. Please proceed to payment.</p>
                    <Link to={`/pay?id=${bookingId}`} className="btn confirm-btn w-full" style={{marginTop: '1.5rem', display: 'block', textDecoration: 'none'}}>Proceed to Payment Portal</Link>
                  </>
                ) : bookingStatus === 'rejected' ? (
                  <>
                    <span className="success-icon" style={{color: '#ef4444'}}>⛔</span>
                    <p style={{fontSize: '1.4rem', fontWeight: 'bold', color: '#ef4444'}}>Slot Unavailable</p>
                    <p style={{marginTop: '0.8rem', lineHeight: '1.6'}}>Sorry, the owner cannot accommodate this slot at this time.</p>
                    <button onClick={() => { setFormSuccess(false); setBookingStatus('pending'); setBookingId(null); }} className="btn btn-secondary w-full" style={{marginTop: '1.5rem'}}>Try Another Date</button>
                  </>
                ) : (
                  <>
                    <span className="success-icon">✅</span>
                    <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)'}}>
                      Your booking request has been sent!
                    </p>
                    <div style={{ padding: '1.5rem 1rem', background: 'rgba(31,138,112,0.05)', borderRadius: '16px', marginTop: '1.5rem' }}>
                      <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <span style={{width: '20px', height: '20px', border: '3px solid var(--color-primary)', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1.2s linear infinite'}}></span>
                        Waiting for owner confirmation...
                      </p>
                      <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.8rem'}}>You can now browse our <strong>Store</strong> and <strong>Software</strong> while you wait.</p>
                      <Link to="/dashboard" onClick={() => setBookingService(null)} className="btn btn-secondary w-full" style={{marginTop: '1.5rem', display: 'block', textDecoration: 'none'}}>Go to My Bookings Dashboard</Link>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleFormSubmit} noValidate>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" value={formData.name} onChange={e => handleChange('name', e.target.value)} onBlur={() => handleBlur('name')} style={{ borderColor: touched.name ? (formErrors.name ? '#ef4444' : '#16a34a') : '' }} />
                  {touched.name && formErrors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{formErrors.name}</span>}
                </div>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Gender</label>
                    <select value={formData.gender} onChange={e => handleChange('gender', e.target.value)} onBlur={() => handleBlur('gender')} style={{ borderColor: touched.gender ? (formErrors.gender ? '#ef4444' : '#16a34a') : '' }}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {touched.gender && formErrors.gender && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{formErrors.gender}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Mobile number" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} onBlur={() => handleBlur('phone')} style={{ borderColor: touched.phone ? (formErrors.phone ? '#ef4444' : '#16a34a') : '' }} />
                    {touched.phone && formErrors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{formErrors.phone}</span>}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Calling Location</label>
                    <input type="text" placeholder="Where are you calling from?" value={formData.locationFrom} onChange={e => handleChange('locationFrom', e.target.value)} onBlur={() => handleBlur('locationFrom')} style={{ borderColor: touched.locationFrom ? (formErrors.locationFrom ? '#ef4444' : '#16a34a') : '' }} />
                    {touched.locationFrom && formErrors.locationFrom && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{formErrors.locationFrom}</span>}
                  </div>
                  <div className="form-group">
                    <label>Location to Meet</label>
                    <input type="text" disabled value={formData.locationTo} className="disabled-input" title="Bookings currently at Thirumullaivoyal" style={{ borderColor: '#16a34a' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Purpose of Booking</label>
                  <input type="text" placeholder="Why are you booking?" value={formData.purpose} onChange={e => handleChange('purpose', e.target.value)} onBlur={() => handleBlur('purpose')} style={{ borderColor: touched.purpose ? (formErrors.purpose ? '#ef4444' : '#16a34a') : '' }} />
                  {touched.purpose && formErrors.purpose && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{formErrors.purpose}</span>}
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={formData.date} onChange={e => handleChange('date', e.target.value)} onBlur={() => handleBlur('date')} style={{ borderColor: touched.date ? (formErrors.date ? '#ef4444' : '#16a34a') : '' }} />
                    {touched.date && formErrors.date && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{formErrors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label>Time Slot (30 mins)</label>
                    <select value={formData.slot} onChange={e => handleChange('slot', e.target.value)} onBlur={() => handleBlur('slot')} style={{ borderColor: touched.slot ? (formErrors.slot ? '#ef4444' : '#16a34a') : '' }}>
                      <option value="">Select a slot</option>
                      {generateSlots(bookingService.category).map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {touched.slot && formErrors.slot && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{formErrors.slot}</span>}
                  </div>
                </div>
                <button type="submit" className="btn confirm-btn w-full" disabled={!isFormValid} style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }}>
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesGrid;
