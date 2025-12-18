import React, { useState } from 'react';
import PersonalizationButton from './PersonalizationButton';
import { useAuth } from '../auth/AuthProvider';
import { personalizeContent, getPersonalizedLearningPath } from '../services/personalizationService';
import './Personalization.css';

const PersonalizedContent = ({ children }) => {
  const { user } = useAuth();
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [personalizedContent, setPersonalizedContent] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handlePersonalize = (userBackground) => {
    if (!user) return;

    // Personalize the content
    const content = typeof children === 'string' ? children : '';
    const personalized = personalizeContent(content, userBackground);
    setPersonalizedContent(personalized);
    setIsPersonalized(true);

    // Get personalized recommendations
    const recs = getPersonalizedLearningPath(userBackground);
    setRecommendations(recs);
  };

  if (!user) {
    // If not logged in, just render the original content
    return <>{children}</>;
  }

  return (
    <div className="personalized-content-wrapper">
      <div className="personalization-controls">
        <PersonalizationButton onPersonalize={handlePersonalize} />
        {isPersonalized && (
          <button 
            className="reset-personalization-button" 
            onClick={() => {
              setIsPersonalized(false);
              setPersonalizedContent(null);
              setRecommendations([]);
            }}
          >
            Reset Personalization
          </button>
        )}
      </div>

      {recommendations.length > 0 && (
        <div className="personalization-recommendations">
          <h4>Recommended for You</h4>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <strong>{rec.chapter}</strong> - {rec.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="content-container">
        {isPersonalized ? (
          <div dangerouslySetInnerHTML={{ __html: personalizedContent }} />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default PersonalizedContent;