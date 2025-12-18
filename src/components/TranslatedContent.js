import React, { useState } from 'react';
import { translateContent } from '../services/translationService';

const TranslatedContent = ({ children, language }) => {
  const [currentLanguage, setCurrentLanguage] = useState(language || 'en');
  const [translatedContent, setTranslatedContent] = useState(null);

  // When language prop changes, translate the content
  React.useEffect(() => {
    if (language !== currentLanguage) {
      handleTranslate(language);
    }
  }, [language]);

  const handleTranslate = (targetLanguage) => {
    if (!children) return;

    // Set the new language
    setCurrentLanguage(targetLanguage);

    // Translate the content
    if (typeof children === 'string') {
      const translated = translateContent(children, targetLanguage);
      setTranslatedContent(translated);
    } else if (typeof children === 'object' && children.props && children.props.children) {
      // Handle React elements
      const content = children.props.children;
      if (typeof content === 'string') {
        const translated = translateContent(content, targetLanguage);
        setTranslatedContent(translated);
      }
    }
  };

  // Render the content based on the current language
  const renderContent = () => {
    if (currentLanguage === 'ur' && translatedContent) {
      return <div dir="rtl" lang="ur">{translatedContent}</div>;
    }
    
    // For English or if translation failed, render original content
    return children;
  };

  return (
    <div className={`translated-content ${currentLanguage === 'ur' ? 'urdu' : 'english'}`}>
      {renderContent()}
    </div>
  );
};

export default TranslatedContent;