# Project Constitution: Physical AI & Humanoid Robotics Textbook

## Vision
Create a comprehensive, interactive textbook for teaching Physical AI and Humanoid Robotics with cutting-edge features including an integrated RAG chatbot, user authentication, content personalization, and multi-language support.

## Core Principles

### Technical Excellence
- Use modern, well-maintained technologies
- Follow best practices for security, performance, and scalability
- Ensure code quality through proper testing and documentation

### User Experience
- Create an intuitive, engaging learning experience
- Make content accessible to learners with different backgrounds
- Provide personalized learning paths based on user profiles

### Educational Value
- Present accurate, up-to-date information on Physical AI and Humanoid Robotics
- Include practical examples and hands-on exercises
- Bridge theory with real-world applications

## Technology Stack

### Frontend
- Docusaurus for documentation site
- React for interactive components
- TailwindCSS for styling

### Backend
- FastAPI for API development
- Qdrant Cloud for vector storage
- Neon Serverless Postgres for user data

### Authentication
- better-auth for user management

### AI Features
- OpenAI Agents/ChatKit SDKs for chatbot functionality
- RAG (Retrieval-Augmented Generation) for intelligent Q&A

### Deployment
- GitHub Pages for hosting
- Docker for containerization (if needed)

## Development Standards

### Code Quality
- Follow PEP 8 for Python code
- Use TypeScript with strict typing for frontend code
- Maintain comprehensive documentation
- Write unit tests for critical functionality

### Version Control
- Use Git with conventional commit messages
- Create feature branches for new functionality
- Review code through pull requests

### Security
- Never commit secrets or credentials
- Validate all user inputs
- Implement proper authentication and authorization

## Feature Requirements

### Base Functionality (Required for 100 Points)
1. Docusaurus-based textbook deployed to GitHub Pages
2. Integrated RAG chatbot that can answer questions about book content
3. Chatbot should work with text selected by the user

### Bonus Features (Up to 200 Additional Points)
1. Reusable intelligence via Claude Code Subagents and Agent Skills (+50 points)
2. Signup and Signin with better-auth, collecting user background information (+50 points)
3. Content personalization by chapter (+50 points)
4. Urdu translation by chapter (+50 points)

## Success Metrics
- Successful deployment to GitHub Pages
- Functional RAG chatbot with accurate responses
- Smooth user authentication flow
- Positive user feedback on content quality and usability