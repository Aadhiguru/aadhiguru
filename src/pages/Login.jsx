import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Login.css';

const EyeIcon = ({ show }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Force scroll to top so the user always sees the notification/header
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (location.state?.message) {
      showNotification('info', location.state.message);
    }
  }, [location]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const passwordReqs = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setUsername('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  const handleToggleRole = (role) => {
    setIsAdmin(role === 'admin');
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isAdmin && !emailRegex.test(email)) {
      showNotification('error', "Please enter a valid, real email address format.");
      return;
    }

    if (!isLogin && (!passwordReqs.length || !passwordReqs.uppercase || !passwordReqs.lowercase || !passwordReqs.number || !passwordReqs.special)) {
      showNotification('error', "Please ensure your password meets all requirements.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!isLogin && !isAdmin && !phoneRegex.test(phone)) {
      showNotification('error', "Please enter a valid 10-digit mobile number (e.g., starting with 6, 7, 8, or 9).");
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          phone: phone,
          role: isAdmin ? 'admin' : 'user'
        }
      }
    });

    if (error) {
      showNotification('error', error.message);
    } else {
      showNotification('success', 'Sign up successful! Please check your email for verification.');
      setIsLogin(true);
    }
    setLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isAdmin && !emailRegex.test(email)) {
      showNotification('error', "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showNotification('error', error.message);
    } else {
      // Store user role and navigate
      const userRole = data.user?.user_metadata?.role || 'user';
      
      // For the demo/simple usage, we can store in localStorage to persist across components
      localStorage.setItem('userPhone', email); // Using email as identifier if phone isn't provided
      
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login', // Will redirect back to login or dashboard
    });
    
    if (error) {
      showNotification('error', error.message);
    } else {
      showNotification('success', 'Password reset link has been sent to your email. Please check your inbox.');
      setIsForgotPassword(false);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      alert(error.message);
    }
  };

  // ── Main Login / Sign Up Form ─────────────────────────────────
  return (
    <div className="login-page">
      <div className="login-container">
        {notification && (
          <div className={`custom-notification ${notification.type}`}>
            <span className="notif-icon">{notification.type === 'error' ? '⚠️' : (notification.type === 'info' ? 'ℹ️' : '✅')}</span>
            <span className="notif-text">{notification.message}</span>
            <button className="notif-close" type="button" onClick={() => setNotification(null)}>✕</button>
          </div>
        )}
        <div className="login-header">
          <h2>{isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create an Account')}</h2>
          <p>{isForgotPassword ? 'Enter your email to receive a password reset link.' : (isLogin ? 'Please enter your details to sign in.' : 'Join Sri AadhiGuru Education today.')}</p>
        </div>

        {!isForgotPassword && (
          <div className="role-toggle">
            <button
              className={`role-btn ${!isAdmin ? 'active' : ''}`}
              onClick={() => handleToggleRole('user')}
            >
              User
            </button>
            <button
              className={`role-btn ${isAdmin ? 'active' : ''}`}
              onClick={() => handleToggleRole('admin')}
            >
              Admin
            </button>
          </div>
        )}

        {isForgotPassword ? (
          <form className="login-form" onSubmit={handleForgotPassword}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className="toggle-mode">
              Remember your password?{' '}
              <span onClick={() => setIsForgotPassword(false)} className="toggle-link">
                Back to Login
              </span>
            </div>
          </form>
        ) : (
          <form className="login-form" onSubmit={isLogin ? handleLoginSubmit : handleSignUpSubmit}>
          {!isLogin && !isAdmin && (
            <>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  pattern="[6-9][0-9]{9}"
                  title="Please enter a valid 10-digit mobile number"
                  required
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label>{isAdmin ? 'Admin ID' : 'Email'}</label>
            <input
              type={isAdmin ? 'text' : 'email'}
              placeholder={isAdmin ? 'Enter admin ID' : 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern={isAdmin ? undefined : "[^\\s@]+@[^\\s@]+\\.[^\\s@]+"}
              title={isAdmin ? undefined : "Please enter a valid email address (e.g., name@gmail.com)"}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
            
            {!isLogin && (
              <div className="password-requirements">
                <div className={`req-item ${passwordReqs.length ? 'met' : ''}`}>
                  {passwordReqs.length ? '✔' : '○'} At least 8 characters
                </div>
                <div className={`req-item ${passwordReqs.uppercase ? 'met' : ''}`}>
                  {passwordReqs.uppercase ? '✔' : '○'} One uppercase letter
                </div>
                <div className={`req-item ${passwordReqs.lowercase ? 'met' : ''}`}>
                  {passwordReqs.lowercase ? '✔' : '○'} One lowercase letter
                </div>
                <div className={`req-item ${passwordReqs.number ? 'met' : ''}`}>
                  {passwordReqs.number ? '✔' : '○'} One number
                </div>
                <div className={`req-item ${passwordReqs.special ? 'met' : ''}`}>
                  {passwordReqs.special ? '✔' : '○'} One special character
                </div>
              </div>
            )}
          </div>

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" onClick={() => setIsForgotPassword(true)} className="forgot-password btn-link">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>

          {!isAdmin && (
            <>
              <div className="divider"><span>OR</span></div>
              <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  <path fill="none" d="M1 1h22v22H1z"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}
        </form>
        )}

        {!isAdmin && !isForgotPassword && (
          <div className="toggle-mode">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span onClick={handleToggleMode} className="toggle-link">
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
