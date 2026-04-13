import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './PaymentGateway.css';

const PaymentGateway = ({ amount, onPaymentSuccess, onClose, customerName, customerPhone }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    // 1. Load the Razorpay SDK Script dynamically
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const displayRazorpay = async () => {
      try {
        setErrorStatus(null);
        setIsProcessing(true);
        
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
          setErrorStatus('Failed to load Razorpay SDK. Please check your internet connection.');
          setIsProcessing(false);
          return;
        }

        // 2. Call Edge Function to create order
        const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
          body: { amount: amount * 100 } // Send amount in Paise (e.g. 9 * 100 = 900)
        });

        if (orderError) throw orderError;
        if (!orderData || !orderData.id) throw new Error('Order ID not returned from server. Check Edge Function logs.');

        // 3. Configure Razorpay Display Options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: 'INR',
          name: 'Sri AadhiGuru Education',
          description: 'Payment for services',
          order_id: orderData.id,
          handler: async function (response) {
            try {
               setIsProcessing(true); // show loading spinner again while verifying
               // 4. Verify Payment with second Edge Function
               const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
                 body: {
                   razorpay_order_id: response.razorpay_order_id,
                   razorpay_payment_id: response.razorpay_payment_id,
                   razorpay_signature: response.razorpay_signature,
                 }
               });
               
               if (verifyError) throw verifyError;
               
               if (verifyData && verifyData.success) {
                 document.body.style.overflow = ''; // Force fix Razorpay frozen scroll
                 onPaymentSuccess();
               } else {
                 document.body.style.overflow = '';
                 alert('Payment verification failed on the server.');
                 onClose();
               }
            } catch (err) {
               document.body.style.overflow = '';
               console.error('Verification Error:', err);
               alert('Your payment was captured, but verification failed locally. We will process this manually. Please contact support.');
               onClose();
            }
          },
          prefill: {
            name: customerName || '',
            contact: customerPhone || ''
          },
          theme: {
            color: '#1f8a70'
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
              onClose();
            }
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
        paymentObject.on('payment.failed', function (response) {
            console.error(response.error);
            alert(`Payment Failed: ${response.error.description}`);
            onClose();
        });

      } catch (err) {
        console.error("Razorpay Checkout Error:", err);
        setErrorStatus('Error generating payment request: ' + err.message);
        setIsProcessing(false);
      }
    };

    displayRazorpay();
    
    // Explicit cleanup to ensure scrolling is never frozen if component unmounts abruptly
    return () => {
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div className="payment-gateway-modal" style={{ zIndex: 9999 }}>
      <div className="payment-container" style={{ textAlign: 'center', padding: '3rem', position: 'relative' }}>
        {errorStatus && (
          <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#666' }}>&times;</button>
        )}
        
        {isProcessing ? (
           <>
             <div className="ps-spinner" style={{ margin: '0 auto 1.5rem auto', width: '50px', height: '50px', borderTopColor: '#1f8a70' }}></div>
             <h2 style={{ fontSize: '1.4rem', color: '#1f8a70', fontWeight: 'bold' }}>Securing Checkout Session</h2>
             <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Do not press back or refresh the page.</p>
           </>
        ) : errorStatus ? (
           <>
             <div style={{ fontSize: '3rem', margin: '0 auto 1.5rem auto' }}>⚠️</div>
             <h2 style={{ fontSize: '1.5rem', color: '#ef4444', fontWeight: 'bold' }}>Initialization Failed</h2>
             <p style={{ color: 'var(--color-text-muted)', margin: '1rem 0' }}>{errorStatus}</p>
             <button onClick={onClose} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Go Back</button>
           </>
        ) : (
           <p style={{ color: '#666' }}>Payment window is open. Please complete your transaction.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;
