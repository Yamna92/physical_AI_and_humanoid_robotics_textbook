import os
import re
from typing import List, Dict, Any
from .openai_client import openai_manager

class DocumentProcessor:
    def __init__(self):
        pass
    
    def chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
        """
        Split text into chunks of approximately chunk_size characters with overlap.
        Tries to break at sentence boundaries when possible.
        """
        chunks = []
        start = 0
        
        while start < len(text):
            # Calculate end position
            end = min(start + chunk_size, len(text))
            
            # If not at the end of the text, try to find a sentence boundary
            if end < len(text):
                # Look for sentence endings within a reasonable window
                sentence_endings = ['. ', '! ', '? ', '\n\n']
                best_break = end
                
                # Search for the best breaking point
                for i in range(end, max(start, end - 200), -1):
                    if any(text[i:i+2].endswith(ending.strip()) for ending in sentence_endings):
                        best_break = i + 1
                        break
                
                end = best_break
            
            # Extract chunk
            chunk = text[start:end].strip()
            if chunk:  # Only add non-empty chunks
                chunks.append(chunk)
            
            # Move start position (with overlap)
            start = end - overlap
        
        return chunks
    
    def process_document(self, content: str, source: str = "", chapter: str = "", section: str = "") -> List[Dict[str, Any]]:
        """
        Process a document by chunking it and generating embeddings for each chunk.
        """
        # Chunk the text
        text_chunks = self.chunk_text(content)
        
        # Process each chunk
        processed_chunks = []
        for i, chunk in enumerate(text_chunks):
            try:
                # Generate embedding
                embedding = openai_manager.generate_embedding(chunk)
                
                # Create chunk record
                chunk_record = {
                    "content": chunk,
                    "embedding": embedding,
                    "source": source,
                    "chapter": chapter,
                    "section": section,
                    "chunk_index": i
                }
                
                processed_chunks.append(chunk_record)
            except Exception as e:
                print(f"Error processing chunk {i}: {e}")
                continue
        
        return processed_chunks
    
    def process_markdown_file(self, file_path: str) -> List[Dict[str, Any]]:
        """
        Process a markdown file and extract chapter/section information.
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract chapter title from filename or first heading
            filename = os.path.basename(file_path)
            chapter_title = os.path.splitext(filename)[0]
            
            # Try to extract chapter title from first heading
            first_heading_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            if first_heading_match:
                chapter_title = first_heading_match.group(1)
            
            # Extract section headings
            section_headings = re.findall(r'^##\s+(.+)$', content, re.MULTILINE)
            
            # Process the content
            return self.process_document(
                content=content,
                source=file_path,
                chapter=chapter_title,
                section=", ".join(section_headings) if section_headings else ""
            )
        except Exception as e:
            print(f"Error processing markdown file {file_path}: {e}")
            return []

# Global document processor instance
document_processor = DocumentProcessor()