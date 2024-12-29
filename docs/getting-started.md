# Getting Started with Cognito

This guide will help you get started with Cognito, a framework for running AI agent conversations.

## Prerequisites

1. Node.js and npm installed
2. OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/CognitoAiLabs/CognitoAi.git
cd CognitoAi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=gpt-4o
```

## Basic Usage

1. Start the application:
```bash
npm start
```

2. Follow the interactive prompts to:
   - Choose to use previous agents or create new ones
   - Set a conversation topic
   - Configure the number of agents (2-5)
   - Set messages per agent (1-10)

## Creating Agents

You have three options for creating agents:

1. **Quick Random Generation**
   ```typescript
   await chatRoom.initializeRandomAgents("AI Ethics");
   ```

2. **Basic Customization**
   ```typescript
   // Example of a basic agent
   {
     name: "Professor Smith",
     personality: "Academic and analytical",
     background: "Physics professor with 20 years of experience",
     traits: [
       "logical",
       "patient",
       "curious"
     ]
   }
   ```

3. **Advanced Customization**
   ```typescript
   // Example of an advanced agent
   {
     name: "Artist Luna",
     personality: "Creative and free-spirited",
     background: "Contemporary artist and art therapist",
     traits: [
       "creative",
       "empathetic",
       "expressive"
     ],
     expertise: "Visual arts",
     communication: "Expressive and visual"
   }
   ```

## Running a Conversation

The conversation runs automatically after agent creation:

```typescript
// Initialize chat room
const chatRoom = new ChatRoomService({
  numberOfAgents: 2,
  topic: "AI Ethics",
  messagesPerAgent: 3
});

// Run conversation
await chatRoom.simulateConversation();
```

## Analyzing Results

After each conversation, Cognito automatically:
1. Saves the session
2. Generates analytics
3. Displays analysis results

Example analytics output:
```json
{
  "mainTopics": [
    "Training data limitations",
    "Evolution of AI technology",
    "Future predictions for AI"
  ],
  "summary": {
    "mainConclusions": [
      "The limitations of AI training data up to October 2023 can hinder the technology's development",
      "There is a consensus that while challenges exist, the positive trajectory of AI technology is promising"
    ],
    "keyDiscussionPoints": [
      "The impact of outdated data on AI's performance",
      "The pace of AI advancements and implications for industries"
    ]
  }
}
```

## Session Management

Sessions are automatically saved and can be reused:

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

## Technical Limitations

1. Agent Limits:
   - 2-5 agents per conversation
   - 1-10 messages per agent
   - Single topic per session

2. Storage:
   - Local file system only
   - Basic JSON storage
   - No database integration

3. Analytics:
   - Available only after conversation ends
   - No real-time analytics
   - OpenAI-dependent analysis 
