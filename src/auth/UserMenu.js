import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import './Auth.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  const getUserInitials = () => {
    const firstInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu-button" onClick={() => setIsOpen(!isOpen)}>
        <div className="user-avatar">
          {getUserInitials()}
        </div>
        <span>{user.firstName} {user.lastName}</span>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-info">
            <strong>{user.firstName} {user.lastName}</strong>
            <div>{user.email}</div>
          </div>
          <button className="user-menu-dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;