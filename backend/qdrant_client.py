import os
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class QdrantManager:
    def __init__(self):
        # Get Qdrant configuration from environment variables
        self.host = os.getenv("QDRANT_HOST", "localhost")
        self.port = int(os.getenv("QDRANT_PORT", "6333"))
        self.api_key = os.getenv("QDRANT_API_KEY")
        self.collection_name = os.getenv("QDRANT_COLLECTION", "textbook_chunks")
        
        # Initialize Qdrant client
        if self.api_key:
            self.client = QdrantClient(
                url=self.host,
                api_key=self.api_key
            )
        else:
            self.client = QdrantClient(
                host=self.host,
                port=self.port
            )
        
        # Create collection if it doesn't exist
        self._create_collection_if_not_exists()
    
    def _create_collection_if_not_exists(self):
        """Create Qdrant collection if it doesn't exist"""
        try:
            # Check if collection exists
            collections = self.client.get_collections()
            collection_names = [collection.name for collection in collections.collections]
            
            if self.collection_name not in collection_names:
                # Create collection with vector size of 1536 (for OpenAI embeddings)
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
                )
                print(f"Created Qdrant collection: {self.collection_name}")
            else:
                print(f"Collection {self.collection_name} already exists")
        except Exception as e:
            print(f"Error creating/checking collection: {e}")
    
    def insert_chunks(self, chunks: List[Dict[str, Any]]):
        """Insert document chunks into Qdrant"""
        try:
            points = []
            for i, chunk in enumerate(chunks):
                point = PointStruct(
                    id=i,
                    vector=chunk["embedding"],
                    payload={
                        "content": chunk["content"],
                        "chapter": chunk.get("chapter", ""),
                        "section": chunk.get("section", ""),
                        "source": chunk.get("source", "")
                    }
                )
                points.append(point)
            
            self.client.upsert(
                collection_name=self.collection_name,
                points=points
            )
            print(f"Inserted {len(points)} chunks into Qdrant")
        except Exception as e:
            print(f"Error inserting chunks: {e}")
    
    def search_similar_chunks(self, query_vector: List[float], limit: int = 5):
        """Search for similar chunks based on query vector"""
        try:
            search_result = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=limit
            )
            return search_result
        except Exception as e:
            print(f"Error searching chunks: {e}")
            return []

# Global Qdrant manager instance
qdrant_manager = QdrantManager()