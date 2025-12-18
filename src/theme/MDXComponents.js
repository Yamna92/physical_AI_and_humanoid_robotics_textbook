import React from 'react';
import OriginalMDXComponents from '@theme-original/MDXComponents';
import TextSelectionWrapper from '@site/src/components/TextSelectionWrapper';
import BookLayout from '@site/src/components/BookLayout';

export default {
  ...OriginalMDXComponents,
  wrapper: ({ children }) => (
    <TextSelectionWrapper>
      {(selectedText) => (
        <BookLayout selectedText={selectedText}>
          {children}
        </BookLayout>
      )}
    </TextSelectionWrapper>
  ),
};