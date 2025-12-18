import React from 'react';
import useTranslation from '../hooks/useTranslation';

const TranslationButton = ({ onTranslate }) => {
  const { language, toggleLanguage } = useTranslation();

  const handleClick = () => {
    toggleLanguage();
    onTranslate(language === 'en' ? 'ur' : 'en');
  };

  return (
    <button 
      className={`translation-button ${language === 'ur' ? 'translated' : ''}`}
      onClick={handleClick}
    >
      {language === 'ur' ? 'English' : 'اردو'}
    </button>
  );
};

export default TranslationButton;