# Interface Reference

This document details all the interfaces implemented in Cognito.

## Core Interfaces

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

Example:
```typescript
const agent = {
  name: "Professor Smith",
  personality: "Academic and analytical",
  background: "Physics professor with 20 years of experience",
  traits: ["logical", "patient", "curious"]
};
```

### ChatRoomConfig

```typescript
interface ChatRoomConfig {
  numberOfAgents: number;    // 2-5 agents
  topic: string;            // Conversation topic
  messagesPerAgent: number; // 1-10 messages
}
```

Example:
```typescript
const config = {
  numberOfAgents: 2,
  topic: "AI Ethics",
  messagesPerAgent: 3
};
```

### Message

```typescript
interface Message {
  agentName: string;
  content: string;
  timestamp: Date;
}
```

Example:
```typescript
const message = {
  agentName: "Professor Smith",
  content: "Hello! It seems we're delving into the global issues...",
  timestamp: new Date()
};
```

### ChatAnalytics

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
  emergentBehaviors: string[];
  researchImplications: string[];
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

Example from a real session:
```json
{
  "mainTopics": [
    "Training data limitations",
    "Evolution of AI technology",
    "Future predictions for AI"
  ],
  "agentBehaviorAnalysis": {
    "Agent A": {
      "cognitivePatterns": "Analytical and cautious",
      "emotionalResponses": "Reserved but optimistic",
      "biasesObserved": ["Technical focus", "Risk awareness"],
      "adaptabilityScore": 85,
      "consistencyWithRole": "Maintained professional perspective",
      "uniqueCharacteristics": ["Data-driven thinking", "Methodical approach"]
    }
  },
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

### ChatSession

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

Example:
```typescript
const session = {
  id: "session_1735004310971",
  timestamp: "2024-12-24T01:38:24.509Z",
  topic: "AI Technology",
  agents: [/* array of Agent objects */],
  messages: [/* array of Message objects */],
  analytics: {/* ChatAnalytics object */}
};
```

### AgentCreationOptions

```typescript
interface AgentCreationOptions {
  name?: string;
  personality?: string;
  background?: string;
  traits?: string[];
  expertise?: string;
  beliefs?: string;
  quirks?: string;
  communication?: string;
  isRandom: boolean;
  conversationTopic: string;
}
```

Example:
```typescript
const options = {
  isRandom: false,
  conversationTopic: "AI Ethics",
  name: "Dr. Smith",
  background: "Professional Physics Professor",
  personality: "Professional with expertise in Physics",
  traits: ["knowledgeable about Physics", "professional", "experienced"]
};
```

## Service Interfaces

### ChatRoomService

Main service for managing conversations:

```typescript
class ChatRoomService {
  constructor(chatConfig: ChatRoomConfig)
  async createAgent(options: AgentCreationOptions): Promise<Agent>
  async initializeAgents(topic: string): Promise<void>
  async initializeRandomAgents(topic: string): Promise<void>
  async simulateConversation(): Promise<void>
  async analyzeConversation(): Promise<ChatAnalytics>
  async saveSession(): Promise<string>
  getMessages(): Message[]
  getAgents(): Agent[]
  setAgents(agents: Agent[]): void
  resetMessages(): void
  setConfig(config: ChatRoomConfig): void
}
```

### StorageService

Handles session persistence:

```typescript
class StorageService {
  constructor()
  async saveSession(session: Omit<ChatSession, 'id'>): Promise<string>
  async getSession(sessionId: string): Promise<ChatSession | null>
  async getAllSessions(): Promise<ChatSession[]>
}
```

### OpenAIService

Manages OpenAI interactions:

```typescript
class OpenAIService {
  constructor()
  async generateRandomAgent(options: AgentCreationOptions): Promise<Agent>
  async generateMessage(agent: Agent, topic: string, previousMessages: Message[]): Promise<string>
  async analyzeConversation(messages: Message[]): Promise<ChatAnalytics>
}
``` 