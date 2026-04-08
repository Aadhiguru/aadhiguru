import { useState, useEffect } from 'react';
import './PaymentGateway.css';

const PaymentGateway = ({ amount, onPaymentSuccess, onClose, customerName, customerPhone }) => {
  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'upi'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Card States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState(customerName || '');

  // UPI States
  const [upiId, setUpiId] = useState('');

  const formatCardNumber = (value) => {
    const val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return val;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    if (val.length <= 5) setExpiry(val);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Notify parent after a short delay
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="payment-gateway-modal">
        <div className="payment-container" style={{ textAlign: 'center' }}>
          <div className="payment-success-content">
            <div className="success-icon">✅</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem', color: '#16a34a' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Transaction ID: #PX-{Math.floor(Math.random() * 10000000)}</p>
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '12px', width: '100%' }}>
              <p style={{ fontWeight: '600' }}>Amount Paid: ₹{amount.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-gateway-modal">
      <div className="payment-container">
        <div className="payment-header">
          <h3>Secure Payment Gateway</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="payment-body">
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Total Amount to Pay</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-text)' }}>₹{amount.toLocaleString('en-IN')}</h2>
          </div>

          <div className="payment-tabs">
            <button 
              className={`tab-btn ${activeTab === 'card' ? 'active' : ''}`}
              onClick={() => setActiveTab('card')}
            >
              💳 Card (Credit/Debit)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'upi' ? 'active' : ''}`}
              onClick={() => setActiveTab('upi')}
            >
              📱 UPI / QR Code
            </button>
          </div>

          <form className="payment-form" onSubmit={handlePay}>
            {activeTab === 'card' ? (
              <>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input 
                      type="text" 
                      placeholder="Name as on card" 
                      required 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <div className="input-wrapper">
                    <span className="input-icon">💳</span>
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      required 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <div className="input-wrapper">
                      <span className="input-icon">📅</span>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        required 
                        value={expiry}
                        onChange={handleExpiryChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🔒</span>
                      <input 
                        type="password" 
                        placeholder="***" 
                        maxLength="3" 
                        required 
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="upi-info">
                <div className="form-group">
                  <label>Pay using UPI ID (VPA)</label>
                  <div className="input-wrapper">
                    <span className="input-icon">⚡</span>
                    <input 
                      type="text" 
                      className="vpa-input"
                      placeholder="username@bankid" 
                      required 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ margin: '1rem 0', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  — OR —
                </div>

                <div className="qr-code-placeholder">
                   <img src="/src/assets/upi_qr.png" alt="Scan to Pay" style={{ borderRadius: '8px' }} />
                   <div style={{ position: 'absolute', bottom: '0.5rem', background: 'white', padding: '0 0.5rem', fontSize: '0.7rem', color: '#666', fontWeight: '700' }}>
                     SCAN & PAY
                   </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Scan this QR using any UPI app like GPay, PhonePe, or Paytm</p>
              </div>
            )}

            <button 
              type="submit" 
              className="pay-submit-btn" 
              disabled={isProcessing}
            >
              {isProcessing ? '🔄 Processing Securely...' : `Pay ₹${amount.toLocaleString('en-IN')} Securely`}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
               <span>🔒 PCI DSS Compliant</span>
               <span>•</span>
               <span>256-bit SSL Encryption</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
