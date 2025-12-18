import { useState, useEffect } from 'react';

// Mock translation function - in a real app, this would call an API
const mockTranslate = (text, targetLanguage) => {
  // This is a very simplified mock translation
  // In reality, you would use a translation API like Google Translate, Azure Translator, etc.
  
  if (targetLanguage === 'ur') {
    // Simple mapping for demonstration
    const translations = {
      'Personalize Content': 'مواد کو ذاتی نوعیت کے مطابق بنائیں',
      'Reset Personalization': 'ذاتی نوعیت کو دوبارہ ترتیب دیں',
      'Recommended for You': 'آپ کے لیے تجویز کردہ',
      'Personalized Note': 'ذاتی نوٹ',
      'Login': 'لاگ ان کریں',
      'Sign Up': 'سائن اپ کریں',
      'Email': 'ای میل',
      'Password': 'پاس ورڈ',
      'First Name': 'پہلا نام',
      'Last Name': 'آخری نام',
      'Software Background': 'سافٹ ویئر کا تجربہ',
      'Hardware Background': 'ہارڈ ویئر کا تجربہ',
      'Logout': 'لاگ آؤٹ'
    };
    
    return translations[text] || text;
  }
  
  return text;
};

export const useTranslation = (initialLanguage = 'en') => {
  const [language, setLanguage] = useState(initialLanguage);
  const [translations, setTranslations] = useState({});

  // In a real implementation, you would fetch translations from an API
  useEffect(() => {
    // Simulate fetching translations
    if (language === 'ur') {
      // Mock Urdu translations
      setTranslations({
        'Personalize Content': 'مواد کو ذاتی نوعیت کے مطابق بنائیں',
        'Reset Personalization': 'ذاتی نوعیت کو دوبارہ ترتیب دیں',
        'Recommended for You': 'آپ کے لیے تجویز کردہ',
        'Personalized Note': 'ذاتی نوٹ',
        'Login': 'لاگ ان کریں',
        'Sign Up': 'سائن اپ کریں',
        'Email': 'ای میل',
        'Password': 'پاس ورڈ',
        'First Name': 'پہلا نام',
        'Last Name': 'آخری نام',
        'Software Background': 'سافٹ ویئر کا تجربہ',
        'Hardware Background': 'ہارڈ ویئر کا تجربہ',
        'Logout': 'لاگ آؤٹ'
      });
    } else {
      // English is the default
      setTranslations({});
    }
  }, [language]);

  const t = (key) => {
    // In a real implementation, this would handle more complex translation logic
    return translations[key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ur' : 'en');
  };

  return { language, setLanguage, t, toggleLanguage };
};

export default useTranslation;