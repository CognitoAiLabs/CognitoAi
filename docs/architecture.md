# Architecture Overview

This document describes the actual implementation of Cognito's architecture.

## Project Structure

```
src/
├── models/
│   └── Agent.ts         # Agent model implementation
├── services/
│   ├── chatRoom.ts     # Main conversation logic
│   ├── openai.ts       # OpenAI API integration
│   └── storage.ts      # Session storage management
├── types/
│   └── index.ts        # TypeScript interfaces
├── utils/
│   └── inquirer-theme.ts # UI theming
└── config/
    └── config.ts       # Environment configuration
```

## Core Components

### 1. ChatRoomService

The main service that orchestrates conversations:

```typescript
class ChatRoomService {
  constructor(chatConfig: ChatRoomConfig)
  async createAgent(options: AgentCreationOptions): Promise<Agent>
  async initializeAgents(topic: string): Promise<void>
  async initializeRandomAgents(topic: string): Promise<void>
  async simulateConversation(): Promise<void>
  async analyzeConversation(): Promise<ChatAnalytics>
  async saveSession(): Promise<string>
}
```

### 2. OpenAIService

Handles all interactions with OpenAI's API:

```typescript
class OpenAIService {
  constructor()
  async generateRandomAgent(options: AgentCreationOptions): Promise<Agent>
  async generateMessage(agent: Agent, topic: string, previousMessages: Message[]): Promise<string>
  async analyzeConversation(messages: Message[]): Promise<ChatAnalytics>
}
```

### 3. StorageService

Manages session persistence:

```typescript
class StorageService {
  constructor()
  async saveSession(session: Omit<ChatSession, 'id'>): Promise<string>
  async getSession(sessionId: string): Promise<ChatSession | null>
  async getAllSessions(): Promise<ChatSession[]>
}
```

## Data Models

### Agent

```typescript
interface Agent {
  name: string;
  personality: string;
  background: string;
  expertise?: string[];
  beliefs?: string[];
  quirks?: string[];
  communication?: string;
  traits: string[];
}
```

### ChatRoomConfig

```typescript
interface ChatRoomConfig {
  numberOfAgents: number;    // 2-5 agents
  topic: string;            // Conversation topic
  messagesPerAgent: number; // 1-10 messages
}
```

### Message

```typescript
interface Message {
  agentName: string;
  content: string;
  timestamp: Date;
}
```

## Flow Process

1. **Initialization**
   ```typescript
   const chatRoom = new ChatRoomService({
     numberOfAgents: 2,
     topic: '',
     messagesPerAgent: 3
   });
   ```

2. **Agent Creation**
   - Random generation
   ```typescript
   await chatRoom.initializeRandomAgents(topic);
   ```
   - Custom creation
   ```typescript
   await chatRoom.initializeAgents(topic);
   ```

3. **Conversation**
   ```typescript
   await chatRoom.simulateConversation();
   ```

4. **Analysis**
   ```typescript
   const analytics = await chatRoom.analyzeConversation();
   ```

5. **Storage**
   ```typescript
   const sessionId = await chatRoom.saveSession();
   ```

## Dependencies

- **OpenAI**: For agent generation and conversation
- **TypeScript**: Main programming language
- **Node.js**: Runtime environment
- **Inquirer**: CLI interface
- **Chalk**: Console styling

## Storage

Sessions are stored as JSON files:
```
chat-sessions/
└── session_{timestamp}.json
```

Session format:
```typescript
interface ChatSession {
  id: string;
  timestamp: string;
  topic: string;
  agents: Agent[];
  messages: Message[];
  analytics: ChatAnalytics;
}
```

## Configuration

Environment variables required:
```
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=gpt-4o
```

## Limitations

1. **Technical**
   - 2-5 agents per conversation
   - 1-10 messages per agent
   - Single topic per session
   - No real-time modifications

2. **Storage**
   - Local file system only
   - No database integration
   - Basic JSON storage

3. **Analysis**
   - End of conversation only
   - No real-time analytics
   - OpenAI-dependent analysis

## Error Handling

Basic error handling is implemented for:
- OpenAI API errors
- File system operations
- Configuration validation
- User input validation

## Example Usage

```typescript
// Initialize
const chatRoom = new ChatRoomService({
  numberOfAgents: 2,
  topic: "AI Ethics",
  messagesPerAgent: 5
});

// Create agents
await chatRoom.initializeRandomAgents("AI Ethics");

// Run conversation
await chatRoom.simulateConversation();

// Analyze results
const analytics = await chatRoom.analyzeConversation();

// Save session
const sessionId = await chatRoom.saveSession();
``` 