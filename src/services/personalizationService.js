/**
 * Content Personalization Service
 * 
 * This service provides functionality to personalize content based on user background
 * and preferences.
 */

/**
 * Personalize content based on user background
 * @param {string} content - The original content
 * @param {Object} userBackground - User's software and hardware background
 * @returns {string} Personalized content
 */
export const personalizeContent = (content, userBackground) => {
  // In a real implementation, this would be much more sophisticated
  // For now, we'll just add some personalized notes
  
  const { softwareBackground, hardwareBackground } = userBackground;
  
  if (!softwareBackground && !hardwareBackground) {
    return content;
  }
  
  // Create a personalized note
  let personalizedNote = '\n\n<div class="personalized-note">\n<h4>Personalized Note</h4>\n<p>';
  
  if (softwareBackground) {
    personalizedNote += `Based on your software background (${softwareBackground}), `;
    personalizedNote += 'you might want to pay special attention to the code examples in this section. ';
  }
  
  if (hardwareBackground) {
    personalizedNote += `Given your hardware experience (${hardwareBackground}), `;
    personalizedNote += 'the practical implementation details should be particularly relevant to you.';
  }
  
  personalizedNote += '</p>\n</div>\n\n';
  
  // Add the personalized note after the first paragraph
  const paragraphs = content.split('\n\n');
  if (paragraphs.length > 1) {
    paragraphs.splice(1, 0, personalizedNote);
    return paragraphs.join('\n\n');
  }
  
  return content + personalizedNote;
};

/**
 * Get personalized learning path recommendations
 * @param {Object} userBackground - User's software and hardware background
 * @returns {Array} Recommended chapters/sections
 */
export const getPersonalizedLearningPath = (userBackground) => {
  const { softwareBackground, hardwareBackground } = userBackground;
  const recommendations = [];
  
  // Simple recommendation logic based on keywords in background
  if (softwareBackground) {
    if (softwareBackground.toLowerCase().includes('python')) {
      recommendations.push({
        chapter: 'Machine Learning for Robotics',
        reason: 'Python is widely used in ML libraries'
      });
    }
    
    if (softwareBackground.toLowerCase().includes('javascript') || 
        softwareBackground.toLowerCase().includes('web')) {
      recommendations.push({
        chapter: 'Human-Robot Interaction',
        reason: 'Web technologies are important for user interfaces'
      });
    }
  }
  
  if (hardwareBackground) {
    if (hardwareBackground.toLowerCase().includes('arduino') || 
        hardwareBackground.toLowerCase().includes('raspberry')) {
      recommendations.push({
        chapter: 'Sensors and Perception Systems',
        reason: 'Embedded systems experience is valuable for sensor integration'
      });
    }
    
    if (hardwareBackground.toLowerCase().includes('electronics') || 
        hardwareBackground.toLowerCase().includes('circuit')) {
      recommendations.push({
        chapter: 'Actuation and Control Systems',
        reason: 'Electronics knowledge is essential for motor control'
      });
    }
  }
  
  // If no specific recommendations, suggest foundational topics
  if (recommendations.length === 0) {
    recommendations.push(
      { chapter: 'Fundamentals of Robotics', reason: 'Build a strong foundation' },
      { chapter: 'Artificial Intelligence in Robotics', reason: 'Core concepts for AI robotics' }
    );
  }
  
  return recommendations;
};

/**
 * Adjust content difficulty based on user experience
 * @param {string} content - The original content
 * @param {Object} userBackground - User's software and hardware background
 * @returns {string} Adjusted content
 */
export const adjustContentDifficulty = (content, userBackground) => {
  // Placeholder for difficulty adjustment logic
  // In a real implementation, this would analyze the content and user background
  // to adjust the complexity level
  
  return content;
};

export default {
  personalizeContent,
  getPersonalizedLearningPath,
  adjustContentDifficulty
};