/**
 * Translation Service
 * 
 * This service provides functionality to translate content between English and Urdu.
 * In a real implementation, this would connect to a translation API.
 */

// Mock translation dictionary for demonstration
const mockTranslations = {
  // Chapter titles
  'Introduction to Physical AI and Humanoid Robotics': 'جسمانی AI اور انسان نما روبوٹکس کا تعارف',
  'Fundamentals of Robotics': 'روبوٹکس کی بنیادی باتیں',
  'Sensors and Perception Systems': 'سینسرز اور ادراک کے نظام',
  'Actuation and Control Systems': 'محرک اور کنٹرول نظام',
  'Artificial Intelligence in Robotics': 'روبوٹکس میں مصنوعی ذہانت',
  'Machine Learning for Robotics': 'روبوٹکس کے لیے مشین لرننگ',
  'Computer Vision in Robotics': 'روبوٹکس میں کمپیوٹر وژن',
  'Natural Language Processing for Human-Robot Interaction': 'انسان روبوٹ تعامل کے لیے قدرتی زبان کی پروسیسنگ',
  'Motion Planning and Navigation': 'موشن پلاننگ اور نیویگیشن',
  'Humanoid Robot Design and Mechanics': 'انسان نما روبوٹ ڈیزائن اور میکانکس',
  'Ethics and Social Implications of Physical AI': 'جسمانی AI کے اخلاقیات اور سماجی نتائج',
  'Future Trends and Applications': 'مستقبل کی رجحانات اور درخواستیں',

  // Common terms
  'Physical AI': 'جسمانی AI',
  'Humanoid Robotics': 'انسان نما روبوٹکس',
  'Robot': 'روبوٹ',
  'Sensor': 'سینسر',
  'Actuator': 'محرک',
  'Control System': 'کنٹرول نظام',
  'Artificial Intelligence': 'مصنوعی ذہانت',
  'Machine Learning': 'مشین لرننگ',
  'Computer Vision': 'کمپیوٹر وژن',
  'Natural Language Processing': 'قدرتی زبان کی پروسیسنگ',
  'Motion Planning': 'موشن پلاننگ',
  'Navigation': 'نیویگیشن',
  'Ethics': 'اخلاقیات',
  'Applications': 'درخواستیں',

  // Common phrases
  'In this chapter': 'اس باب میں',
  'Learning Objectives': 'سیکھنے کے مقاصد',
  'Introduction': 'تعارف',
  'Conclusion': 'نتائج',
  'References': 'حوالہ جات',
  'Exercises': 'مشقیں',
  'Further Reading': 'مزید پڑھنے کے لیے',
  'Summary': 'خلاصہ',
  'Key Concepts': 'اہم تصورات'
};

/**
 * Translate text from English to Urdu
 * @param {string} text - The text to translate
 * @returns {string} Translated text
 */
export const translateToUrdu = (text) => {
  // In a real implementation, this would call a translation API
  // For demonstration, we'll use a mock translation dictionary
  
  // Simple word replacement approach
  let translatedText = text;
  
  // Replace common terms and phrases
  Object.keys(mockTranslations).forEach(englishTerm => {
    const urduTerm = mockTranslations[englishTerm];
    // Case insensitive replacement
    const regex = new RegExp(`\\b${englishTerm}\\b`, 'gi');
    translatedText = translatedText.replace(regex, urduTerm);
  });
  
  return translatedText;
};

/**
 * Translate text from Urdu to English
 * @param {string} text - The text to translate
 * @returns {string} Translated text
 */
export const translateToEnglish = (text) => {
  // In a real implementation, this would call a translation API
  // For demonstration, we'll reverse the mock translation dictionary
  
  // Create reverse dictionary
  const reverseTranslations = {};
  Object.keys(mockTranslations).forEach(englishTerm => {
    reverseTranslations[mockTranslations[englishTerm]] = englishTerm;
  });
  
  // Simple word replacement approach
  let translatedText = text;
  
  // Replace common terms and phrases
  Object.keys(reverseTranslations).forEach(urduTerm => {
    const englishTerm = reverseTranslations[urduTerm];
    // Case insensitive replacement for Urdu is complex, so we'll do exact matches
    const regex = new RegExp(urduTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    translatedText = translatedText.replace(regex, englishTerm);
  });
  
  return translatedText;
};

/**
 * Translate content based on target language
 * @param {string} content - The content to translate
 * @param {string} targetLanguage - Target language ('en' or 'ur')
 * @returns {string} Translated content
 */
export const translateContent = (content, targetLanguage) => {
  if (targetLanguage === 'ur') {
    return translateToUrdu(content);
  } else {
    return translateToEnglish(content);
  }
};

export default {
  translateToUrdu,
  translateToEnglish,
  translateContent
};