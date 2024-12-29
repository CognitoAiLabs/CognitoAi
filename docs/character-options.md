# Character Customization Options

This document details the available options for customizing characters (agents) in Cognito, based on the actual implementation.

## Agent Structure

The base structure of an agent is defined in `src/types/index.ts`:

```typescript
interface Agent {
  name: string;            // Agent's identifier
  personality: string;     // Core personality description
  background: string;      // Background story/history
  expertise?: string[];    // Optional areas of expertise
  beliefs?: string[];     // Optional core beliefs
  quirks?: string[];      // Optional unique characteristics
  communication?: string; // Optional communication style
  traits: string[];       // Key personality traits
}
```

## Creation Methods

There are three ways to create agents:

1. **Quick Random Generation**
   - Automatically generates all agent properties
   - Best for quick experiments
   - Uses OpenAI to generate coherent personalities

2. **Basic Customization**
   ```typescript
   {
     name: string | undefined,      // Optional, randomized if empty
     background: string | undefined, // Based on profession
     personality: string | undefined // Based on profession
     traits: string[] | undefined   // Based on profession
   }
   ```

3. **Advanced Customization**
   ```typescript
   {
     name: string | undefined,
     personality: string | undefined,
     background: string | undefined,
     traits: string[] | undefined,
     expertise: string | undefined,
     beliefs: string | undefined,
     quirks: string | undefined,
     communication: string | undefined
   }
   ```

All unspecified characteristics will be generated automatically using OpenAI.

## Configuration Options

### Chat Room Configuration

```typescript
interface ChatRoomConfig {
  numberOfAgents: number;    // 2-5 agents
  topic: string;            // Conversation topic
  messagesPerAgent: number; // 1-10 messages
}
```

### Agent Creation Options

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

## Real Examples

### 1. Preset Agents (from config.ts)

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

### 2. Basic Agent Creation

```typescript
const basicAgent = {
  name: "Dr. Smith",
  background: "Professional Physics Professor",
  personality: "Professional with expertise in Physics",
  traits: ["knowledgeable about Physics", "professional", "experienced"]
};
```

### 3. Advanced Agent Creation

```typescript
const advancedAgent = {
  name: "Alex Rivera",
  personality: "Creative and innovative",
  background: "Design thinking expert",
  traits: ["professional", "experienced", "knowledgeable"],
  expertise: "UX Design",
  communication: "Visual and engaging"
};
```

## Analytics

The system tracks various aspects of agent behavior:

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

## Best Practices

1. **Agent Creation**
   - Provide clear and consistent personality traits
   - Ensure background aligns with expertise
   - Keep traits list focused and relevant

2. **Conversation Setup**
   - Start with 2-3 agents for simpler interactions
   - Choose clear, focused topics
   - Set appropriate message limits (3-5 recommended)

3. **Analysis**
   - Review agent behavior analysis for consistency
   - Check interaction dynamics
   - Monitor experimental metrics

## Limitations

1. Number of agents limited to 2-5 
2. Messages per agent limited to 1-10
3. Random generation may sometimes produce unexpected results
4. Agent personalities are influenced by the OpenAI model's training

## Troubleshooting

1. **Inconsistent Agent Behavior**
   - Check if personality and background align
   - Verify traits are not contradictory
   - Review the conversation topic's relevance to the agent's expertise 