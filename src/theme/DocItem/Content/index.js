import React from 'react';
import OriginalDocItemContent from '@theme-original/DocItem/Content';
import TextSelectionWrapper from '@site/src/components/TextSelectionWrapper';
import BookLayout from '@site/src/components/BookLayout';

export default function DocItemContent(props) {
  return (
    <TextSelectionWrapper>
      {(selectedText) => (
        <BookLayout selectedText={selectedText}>
          <OriginalDocItemContent {...props} />
        </BookLayout>
      )}
    </TextSelectionWrapper>
  );
}