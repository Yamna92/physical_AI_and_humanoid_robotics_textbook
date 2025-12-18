import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Auth.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  if (!isOpen) return null;

  const switchToLogin = () => setAuthMode('login');
  const switchToSignup = () => setAuthMode('signup');

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>
        {authMode === 'login' ? (
          <LoginForm onSwitchToSignup={switchToSignup} />
        ) : (
          <SignupForm onSwitchToLogin={switchToLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;