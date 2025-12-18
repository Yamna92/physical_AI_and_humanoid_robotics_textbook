from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import RAG chat functionality
from .rag_chat import rag_chat

# Create FastAPI app
app = FastAPI(
    title="Physical AI & Humanoid Robotics Textbook Chatbot",
    description="RAG chatbot for the Physical AI & Humanoid Robotics textbook",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    selected_text: Optional[str] = None
    user_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: Message
    sources: List[str]

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Extract the latest user message
    user_message = ""
    conversation_history = []
    
    for message in request.messages:
        conversation_history.append({"role": message.role, "content": message.content})
        if message.role == "user":
            user_message = message.content
    
    # Use RAG chat to generate response
    rag_result = rag_chat.chat_with_rag(
        query=user_message,
        conversation_history=conversation_history[:-1] if conversation_history else None,
        selected_text=request.selected_text
    )
    
    return ChatResponse(
        message=Message(role="assistant", content=rag_result["response"]),
        sources=rag_result["sources"]
    )

# Get chat history endpoint
@app.get("/chat/history/{user_id}")
async def get_chat_history(user_id: str):
    # This is a placeholder implementation
    return {"user_id": user_id, "history": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)