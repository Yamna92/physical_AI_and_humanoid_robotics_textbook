from typing import List, Dict, Any
from .qdrant_client import qdrant_manager
from .openai_client import openai_manager

class RAGChat:
    def __init__(self):
        pass
    
    def retrieve_relevant_chunks(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """
        Retrieve relevant chunks from Qdrant based on the query.
        """
        try:
            # Generate embedding for the query
            query_embedding = openai_manager.generate_embedding(query)
            
            # Search for similar chunks in Qdrant
            search_results = qdrant_manager.search_similar_chunks(query_embedding, limit)
            
            # Extract payload from search results
            relevant_chunks = []
            for result in search_results:
                chunk_data = {
                    "content": result.payload.get("content", ""),
                    "chapter": result.payload.get("chapter", ""),
                    "section": result.payload.get("section", ""),
                    "source": result.payload.get("source", ""),
                    "score": result.score
                }
                relevant_chunks.append(chunk_data)
            
            return relevant_chunks
        except Exception as e:
            print(f"Error retrieving relevant chunks: {e}")
            return []
    
    def generate_response(self, query: str, context_chunks: List[Dict[str, Any]], conversation_history: List[Dict[str, str]] = None) -> str:
        """
        Generate a response using the retrieved context chunks and conversation history.
        """
        try:
            # Build context from retrieved chunks
            context_parts = []
            for chunk in context_chunks:
                context_part = f"Chapter: {chunk['chapter']}\nSection: {chunk['section']}\nContent: {chunk['content']}"
                context_parts.append(context_part)
            
            context = "\n\n---\n\n".join(context_parts)
            
            # Build conversation history context
            history_context = ""
            if conversation_history:
                history_lines = []
                for msg in conversation_history[-5:]:  # Last 5 messages
                    history_lines.append(f"{msg['role']}: {msg['content']}")
                history_context = "\n".join(history_lines)
            
            # Create prompt for OpenAI
            prompt = f"""
You are an expert assistant for a textbook on Physical AI and Humanoid Robotics. 
Answer the user's question using the provided context from the textbook.

Context information:
{context}

Conversation history:
{history_context}

User question: {query}

Please provide a comprehensive answer based on the context provided. 
If the context doesn't contain enough information to answer the question, 
please state that clearly and suggest what additional information might be needed.
"""
            
            # Generate response using OpenAI
            messages = [
                {"role": "system", "content": "You are an expert assistant for a textbook on Physical AI and Humanoid Robotics."},
                {"role": "user", "content": prompt}
            ]
            
            response = openai_manager.generate_completion(messages)
            return response
        except Exception as e:
            print(f"Error generating response: {e}")
            return "Sorry, I encountered an error while generating a response."
    
    def chat_with_rag(self, query: str, conversation_history: List[Dict[str, str]] = None, selected_text: str = None) -> Dict[str, Any]:
        """
        Perform a complete RAG chat interaction.
        """
        try:
            # If there's selected text, use it as additional context
            if selected_text:
                # Add the selected text to the query for better context
                enhanced_query = f"{query}\n\nSelected text for context: {selected_text}"
            else:
                enhanced_query = query
            
            # Retrieve relevant chunks
            relevant_chunks = self.retrieve_relevant_chunks(enhanced_query)
            
            # If no relevant chunks found, try with original query
            if not relevant_chunks and selected_text:
                relevant_chunks = self.retrieve_relevant_chunks(query)
            
            # Generate response
            response = self.generate_response(enhanced_query, relevant_chunks, conversation_history)
            
            # Extract sources from relevant chunks
            sources = list(set([chunk["chapter"] for chunk in relevant_chunks if chunk["chapter"]]))
            
            return {
                "response": response,
                "sources": sources,
                "chunks_used": len(relevant_chunks)
            }
        except Exception as e:
            print(f"Error in RAG chat: {e}")
            return {
                "response": "Sorry, I encountered an error while processing your request.",
                "sources": [],
                "chunks_used": 0
            }

# Global RAG chat instance
rag_chat = RAGChat()