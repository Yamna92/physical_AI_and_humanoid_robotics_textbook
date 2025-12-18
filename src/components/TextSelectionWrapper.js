import React, { useState, useEffect } from 'react';

const TextSelectionWrapper = ({ children }) => {
  const [selectedText, setSelectedText] = useState('');

  // Handle text selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString().trim());
      } else {
        setSelectedText('');
      }
    };

    // Add event listeners
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);

    // Cleanup
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
    };
  }, []);

  return (
    <div className="text-selection-wrapper">
      {children(selectedText)}
    </div>
  );
};

export default TextSelectionWrapper;