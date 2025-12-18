#!/usr/bin/env python3
"""
Script to ingest textbook content into Qdrant for RAG functionality.
"""

import os
import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_path = Path(__file__).parent
sys.path.append(str(backend_path))

from document_processor import document_processor
from qdrant_client import qdrant_manager

def ingest_textbook_content(docs_directory: str):
    """
    Ingest all markdown files from the docs directory into Qdrant.
    """
    print(f"Ingesting textbook content from: {docs_directory}")
    
    # Check if docs directory exists
    if not os.path.exists(docs_directory):
        print(f"Error: Docs directory not found at {docs_directory}")
        return False
    
    # Process each markdown file
    processed_chunks = []
    
    for root, dirs, files in os.walk(docs_directory):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                print(f"Processing file: {file_path}")
                
                # Process the markdown file
                chunks = document_processor.process_markdown_file(file_path)
                processed_chunks.extend(chunks)
                
                print(f"  - Extracted {len(chunks)} chunks")
    
    # Insert all chunks into Qdrant
    if processed_chunks:
        print(f"Inserting {len(processed_chunks)} chunks into Qdrant...")
        qdrant_manager.insert_chunks(processed_chunks)
        print("Ingestion completed successfully!")
        return True
    else:
        print("No content to ingest.")
        return False

if __name__ == "__main__":
    # Default docs directory (relative to project root)
    default_docs_dir = "../docs"
    
    # Allow overriding docs directory via command line argument
    docs_dir = sys.argv[1] if len(sys.argv) > 1 else default_docs_dir
    
    # Convert to absolute path
    docs_dir = os.path.abspath(docs_dir)
    
    # Ingest the content
    success = ingest_textbook_content(docs_dir)
    
    if success:
        print("Textbook content ingestion completed!")
        sys.exit(0)
    else:
        print("Textbook content ingestion failed!")
        sys.exit(1)