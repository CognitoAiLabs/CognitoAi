# Configuration Guide

This document explains how to configure Cognito based on the actual implementation.

## Environment Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

### Required Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | - | Yes |
| `OPENAI_MODEL` | OpenAI model to use | gpt-4o-mini | No |

## Project Configuration

### TypeScript Configuration

The `tsconfig.json` file contains TypeScript compiler options:

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Package Configuration

The `package.json` file manages dependencies and scripts:

```json
{
  "name": "cognito-experiments",
  "version": "1.0.0",
  "description": "Cognito Experiments Framework",
  "main": "dist/index.js",
  "scripts": {
    "start": "ts-node src/index.ts",
    "build": "tsc",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write \"src/**/*.ts\""
  },
  "dependencies": {
    "@inquirer/prompts": "^3.3.0",
    "chalk": "^4.1.2",
    "dotenv": "^16.0.0",
    "inquirer": "^8.2.5",
    "openai": "^4.0.0",
    "typescript": "^4.9.0"
  },
  "devDependencies": {
    "@types/inquirer": "^9.0.7",
    "@types/node": "^16.0.0",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1"
  }
}
```

## Chat Room Configuration

The chat room can be configured using the `ChatRoomConfig` interface:

```typescript
interface ChatRoomConfig {
  numberOfAgents: number;    // 2-5 agents
  topic: string;            // Conversation topic
  messagesPerAgent: number; // 1-10 messages
}
```

Example usage:

```typescript
const chatRoom = new ChatRoomService({
  numberOfAgents: 2,
  topic: "AI Ethics",
  messagesPerAgent: 5
});
```

## Storage Configuration

Sessions are stored as JSON files in the `chat-sessions` directory:

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

The `StorageService` handles file operations:

```typescript
class StorageService {
  private readonly storageDir = path.join(process.cwd(), 'chat-sessions');

  async saveSession(session: Omit<ChatSession, 'id'>): Promise<string>
  async getSession(sessionId: string): Promise<ChatSession | null>
  async getAllSessions(): Promise<ChatSession[]>
}
```

## Preset Agents

You can configure preset agents in `config.ts`:

```typescript
const presetAgents = [
  {
    name: "Professor Smith",
    personality: "Academic and analytical",
    background: "Physics professor with 20 years of experience",
    traits: ["logical", "patient", "curious"]
  },
  {
    name: "Artist Luna",
    personality: "Creative and free-spirited",
    background: "Contemporary artist and art therapist",
    traits: ["creative", "empathetic", "expressive"]
  }
];
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

## Troubleshooting

Common configuration issues and solutions:

1. **API Key Issues**
   - Ensure OPENAI_API_KEY is set correctly in `.env`
   - Check API key permissions
   - Verify environment variable loading

2. **Storage Issues**
   - Verify file permissions in `chat-sessions` directory
   - Check storage paths
   - Ensure sufficient disk space 