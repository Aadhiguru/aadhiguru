import { useState, useEffect } from 'react';
import './Classes.css';

const initialClasses = [
  { id: 1, title_en: "Introduction to Vastu Shastra", title_ta: "வாஸ்து சாஸ்திரம் அறிமுகம்", date: "2026-04-10", price: 1500, attendees: 12 },
  { id: 2, title_en: "Advanced KP Astrology", title_ta: "உயர்தர கே.பி ஜோதிடம்", date: "2026-04-15", price: 3000, attendees: 8 }
];

const Classes = () => {
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('aadhiguru_classes');
    if (saved) return JSON.parse(saved);
    return initialClasses;
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enrollingClass, setEnrollingClass] = useState(null);
  
  // New Class State
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleTa, setNewTitleTa] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    localStorage.setItem('aadhiguru_classes', JSON.stringify(classes));
  }, [classes]);

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!newTitleEn || !newDate || !newPrice) return;
    
    const newClass = {
      id: Date.now(),
      title_en: newTitleEn,
      title_ta: newTitleTa || newTitleEn,
      date: newDate,
      price: Number(newPrice),
      attendees: 0
    };
    
    setClasses([...classes, newClass]);
    setNewTitleEn(''); setNewTitleTa(''); setNewDate(''); setNewPrice('');
  };

  const handleRemoveClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const handleEnrollClick = (cls) => {
    setEnrollingClass(cls);
    setShowModal(true);
  };

  const handlePayment = () => {
    // Mock Payment Process
    alert(`Payment of ₹${enrollingClass.price} successful! You are successfully enrolled in ${enrollingClass.title_en}.`);
    
    setClasses(classes.map(c => 
      c.id === enrollingClass.id ? { ...c, attendees: c.attendees + 1 } : c
    ));
    
    setShowModal(false);
    setEnrollingClass(null);
  };

  return (
    <section className="section bg-surface classes-page">
      <div className="container">
        
        <div className="classes-header">
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Astrology & Vastu Classes</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>Learn from our Gurus | எங்களின் குருக்களிடம் கற்கவும்</p>
          </div>
          <button 
            className={`admin-toggle ${isAdmin ? 'active' : ''}`} 
            onClick={() => setIsAdmin(!isAdmin)}
          >
            {isAdmin ? 'Exit Admin Mode' : 'Admin Mode'}
          </button>
        </div>

        {isAdmin && (
          <div className="admin-panel mb-4">
            <h3>Add New Class | புதிய வகுப்பு</h3>
            <form className="admin-form" onSubmit={handleAddClass}>
              <div className="form-row">
                <input type="text" placeholder="Title (English)" value={newTitleEn} onChange={e => setNewTitleEn(e.target.value)} required />
                <input type="text" placeholder="Title (Tamil)" value={newTitleTa} onChange={e => setNewTitleTa(e.target.value)} />
              </div>
              <div className="form-row">
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required />
                <input type="number" placeholder="Price (₹)" value={newPrice} onChange={e => setNewPrice(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Add Class</button>
            </form>
          </div>
        )}

        <div className="classes-grid">
          {classes.length === 0 ? (
            <p>No classes scheduled currently.</p>
          ) : (
            classes.map(cls => (
              <div key={cls.id} className="class-card">
                <div className="class-content">
                  <h3 className="class-title-en">{cls.title_en}</h3>
                  <h4 className="class-title-ta">{cls.title_ta}</h4>
                  
                  <div className="class-details">
                    <p><strong>Date:</strong> {cls.date}</p>
                    <p><strong>Fee:</strong> ₹{cls.price}</p>
                    <p><strong>Enrolled:</strong> {cls.attendees} Students</p>
                  </div>
                </div>
                
                <div className="class-actions">
                  <button className="btn btn-primary w-100" onClick={() => handleEnrollClick(cls)}>
                    Apply & Pay
                  </button>
                  {isAdmin && (
                    <button className="btn btn-danger w-100 mt-2" onClick={() => handleRemoveClass(cls.id)}>
                      Remove Class
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mock Payment Modal */}
        {showModal && enrollingClass && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Checkout | கட்டணம்</h3>
              <p>You are applying for: <strong>{enrollingClass.title_en}</strong></p>
              <p className="price-tag">Total: ₹{enrollingClass.price}</p>
              
              <div className="payment-form">
                <input type="text" placeholder="Cardholder Name" defaultValue="Demo User" />
                <input type="text" placeholder="Card Number" defaultValue="XXXX XXXX XXXX XXXX" />
                <div className="form-row">
                  <input type="text" placeholder="MM/YY" defaultValue="12/26" />
                  <input type="text" placeholder="CVC" defaultValue="123" />
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handlePayment}>Pay & Enroll</button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default Classes;
