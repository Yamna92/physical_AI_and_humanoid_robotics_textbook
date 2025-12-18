import React from 'react';
import Chatbot from './Chatbot';
import './BookLayout.css';

const BookLayout = ({ children, selectedText }) => {
  return (
    <div className="book-layout">
      <div className="book-content">
        {children}
      </div>
      <div className="chatbot-sidebar">
        <Chatbot selectedText={selectedText} />
      </div>
    </div>
  );
};

export default BookLayout;