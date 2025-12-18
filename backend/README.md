# Physical AI & Humanoid Robotics Textbook Chatbot Backend

This is the backend service for the RAG chatbot that powers the Physical AI & Humanoid Robotics textbook.

## Features

- FastAPI-based REST API
- Retrieval-Augmented Generation (RAG) using Qdrant for vector storage
- OpenAI integration for embeddings and chat completions
- PostgreSQL database integration for user data and chat history
- Document processing pipeline for textbook content

## Prerequisites

- Python 3.8+
- PostgreSQL database (Neon recommended)
- Qdrant Cloud account
- OpenAI API key

## Installation

1. Clone the repository
2. Navigate to the `backend` directory
3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Edit the `.env` file and add your configuration values:
   - OpenAI API key
   - Qdrant Cloud configuration
   - PostgreSQL database connection string

## Usage

### Starting the Server

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Or using the built-in runner:

```bash
python main.py
```

### Ingesting Textbook Content

To ingest the textbook content into Qdrant for RAG:

```bash
python ingest_textbook.py
```

By default, this will process all markdown files in the `../docs` directory. You can specify a different directory:

```bash
python ingest_textbook.py /path/to/docs
```

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /chat` - Chat endpoint for RAG interactions
- `GET /chat/history/{user_id}` - Retrieve chat history for a user

## Project Structure

```
backend/
├── main.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
├── .env.example         # Example environment variables
├── README.md            # This file
├── openai_client.py     # OpenAI API integration
├── qdrant_client.py     # Qdrant vector database integration
├── document_processor.py # Document chunking and processing
├── rag_chat.py          # RAG chat functionality
├── ingest_textbook.py   # Script to ingest textbook content
├── database.py          # Database connection
├── models.py            # Database models
└── ...
```

## Development

### Running Tests

(Tests would be implemented here)

### Linting

(Formatting and linting instructions would be here)

## Deployment

(Instructions for deploying to production would be here)