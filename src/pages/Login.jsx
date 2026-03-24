import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleToggleRole = (role) => {
    setIsAdmin(role === 'admin');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>{isLogin ? 'Please enter your details to sign in.' : 'Join Sri AadhiGuru Education today.'}</p>
        </div>

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

        <form className="login-form">
          {!isLogin && !isAdmin && (
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
          )}

          <div className="input-group">
            <label>{isAdmin ? 'Admin ID / Email' : 'Email or Mobile Number'}</label>
            <input type="text" placeholder={isAdmin ? "Enter admin ID" : "Enter email or mobile number"} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#reset" className="forgot-password">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="login-submit-btn">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          {!isAdmin && (
            <>
              <div className="divider">
                <span>OR</span>
              </div>
              <button type="button" className="google-btn">
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

        {!isAdmin && (
          <div className="toggle-mode">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
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
