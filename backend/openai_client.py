import os
from openai import OpenAI
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class OpenAIManager:
    def __init__(self):
        # Get OpenAI API key from environment variables
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is required")
        
        # Initialize OpenAI client
        self.client = OpenAI(api_key=api_key)
    
    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for given text using OpenAI"""
        try:
            response = self.client.embeddings.create(
                input=text,
                model="text-embedding-ada-002"
            )
            return response.data[0].embedding
        except Exception as e:
            print(f"Error generating embedding: {e}")
            raise
    
    def generate_completion(self, messages: List[Dict[str, str]], max_tokens: int = 500) -> str:
        """Generate completion using OpenAI chat model"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=max_tokens,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error generating completion: {e}")
            raise

# Global OpenAI manager instance
openai_manager = OpenAIManager()