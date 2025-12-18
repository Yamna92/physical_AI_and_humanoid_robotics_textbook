import React from 'react';
import PersonalizationButton from './PersonalizationButton';
import TranslationButton from './TranslationButton';
import './Personalization.css';

const ChapterHeader = ({ title, onPersonalize, onTranslate }) => {
  return (
    <div className="chapter-header">
      <h1>{title}</h1>
      <div className="chapter-actions">
        <PersonalizationButton onPersonalize={onPersonalize} />
        <TranslationButton onTranslate={onTranslate} />
      </div>
    </div>
  );
};

export default ChapterHeader;