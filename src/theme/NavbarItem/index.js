import React, { useState } from 'react';
import { useAuth } from '@site/src/auth/AuthProvider';
import AuthModal from '@site/src/auth/AuthModal';
import UserMenu from '@site/src/auth/UserMenu';

export default function NavbarItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Show nothing while loading
  if (loading) {
    return null;
  }

  // If user is logged in, show user menu
  if (user) {
    return <UserMenu />;
  }

  // If user is not logged in, show login button
  return (
    <>
      <button onClick={openModal} className="navbar__item navbar__link">
        Login
      </button>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}