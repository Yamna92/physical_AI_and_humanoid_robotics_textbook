import React from 'react';
import { useAuth } from '../auth/AuthProvider';

const PersonalizationButton = ({ onPersonalize }) => {
  const { user } = useAuth();

  // If user is not logged in, don't show the button
  if (!user) {
    return null;
  }

  const handleClick = () => {
    // In a real implementation, this would pass user data to the personalization function
    onPersonalize({
      softwareBackground: user.softwareBackground,
      hardwareBackground: user.hardwareBackground
    });
  };

  return (
    <button className="personalization-button" onClick={handleClick}>
      Personalize Content
    </button>
  );
};

export default PersonalizationButton;