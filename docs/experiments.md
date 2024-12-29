# Experiments Guide

This document explains how to run experiments in Cognito based on the actual implementation.

## Basic Setup

### Configuration

Each experiment requires a basic configuration:

```typescript
interface ChatRoomConfig {
  numberOfAgents: number;    // 2-5 agents
  topic: string;            // Conversation topic
  messagesPerAgent: number; // 1-10 messages
}
```

Example configuration:
```typescript
const config = {
  numberOfAgents: 2,
  topic: "AI Ethics",
  messagesPerAgent: 3
};
```

## Running an Experiment

1. Start the application:
```bash
npm start
```

2. Choose experiment options:
   - Option to use agents from previous sessions
   - Set the conversation topic
   - Configure number of agents (2-5)
   - Set messages per agent (1-10)

3. Create agents using one of three methods:
   - Quick Random Generation
   - Basic Customization (name, profession)
   - Advanced Customization (personality, background, expertise, etc.)

Example of agent creation:
```typescript
// Basic agent example from a real session
{
  "name": "Professor Smith",
  "personality": "Academic and analytical",
  "background": "Physics professor with 20 years of experience",
  "traits": [
    "logical",
    "patient",
    "curious"
  ]
}
```

## Conversation Simulation

The experiment runs automatically with these steps:

1. Agents take turns sending messages
2. Each message is generated based on:
   - Agent's characteristics
   - Conversation topic
   - Previous messages
3. Messages are displayed in real-time
4. 1-second delay between messages

Example conversation flow:
```typescript
await chatRoom.simulateConversation();
// Messages are displayed:
// Professor Smith: "Hello! It seems we're delving into the global issues..."
// Artist Luna: "From my perspective as an artist..."
// [continues until messagesPerAgent limit is reached]
```

## Analytics

Each experiment automatically generates analytics data:

```typescript
interface ChatAnalytics {
  mainTopics: string[];
  agentBehaviorAnalysis: Record<string, {
    cognitivePatterns: string;
    emotionalResponses: string;
    biasesObserved: string[];
    adaptabilityScore: number;
    consistencyWithRole: string;
    uniqueCharacteristics: string[];
  }>;
  interactionDynamics: {
    powerDynamics: string;
    influencePatterns: string[];
    groupPolarization: string;
    cognitiveAlignment: string;
  };
  experimentMetrics: {
    ideaDiversity: number;
    conversationDepth: number;
    emotionalIntelligence: number;
    logicalConsistency: number;
    creativityScore: number;
  };
  summary: {
    mainConclusions: string[];
    keyDiscussionPoints: string[];
    agreements: string[];
    disagreements: string[];
    overallTone: string;
    suggestedNextTopics: string[];
  };
}
```

Example analytics output from a real session:
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

## Session Storage

All experiments are automatically saved with:
- Unique session ID
- Timestamp
- Topic
- Agent configurations
- All messages
- Complete analytics

Example session structure:
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

Sessions can be loaded to:
- Reuse agents in new experiments
- Review previous conversations
- Compare analytics across sessions

## Limitations

1. Technical Constraints:
   - 2-5 agents per conversation
   - 1-10 messages per agent
   - Single topic per session
   - No real-time modifications during conversation

2. Storage:
   - Local file system only
   - Basic JSON storage
   - No database integration

3. Analytics:
   - Analysis only available after conversation ends
   - No real-time analytics
   - OpenAI-dependent analysis 