# Analytics Guide

This guide explains how analytics are implemented in Cognito.

## Overview

The analytics system uses OpenAI's API to analyze conversations between agents and generate insights about their interactions.

## Implementation

### Analysis Process

1. Conversations are collected as a series of messages:
```typescript
interface Message {
  agentName: string;
  content: string;
  timestamp: Date;
}
```

2. The analysis is performed using a structured prompt to OpenAI:
```typescript
const systemPrompt = `Analyze the following conversation and provide a detailed analysis in this exact JSON format:
{
  "mainTopics": ["Key topic 1", "Key topic 2"],
  "agentBehaviorAnalysis": {
    "Agent Name 1": {
      "cognitivePatterns": "Analysis of thinking patterns",
      "emotionalResponses": "Patterns in emotional reactions",
      "biasesObserved": ["Bias 1", "Bias 2"],
      "adaptabilityScore": 85,
      "consistencyWithRole": "Role consistency analysis",
      "uniqueCharacteristics": ["Trait 1", "Trait 2"]
    }
  },
  "interactionDynamics": {
    "powerDynamics": "Analysis of hierarchical patterns",
    "influencePatterns": ["Pattern 1", "Pattern 2"],
    "groupPolarization": "Polarization analysis",
    "cognitiveAlignment": "Alignment analysis"
  },
  "experimentMetrics": {
    "ideaDiversity": 85,
    "conversationDepth": 75,
    "emotionalIntelligence": 90,
    "logicalConsistency": 88,
    "creativityScore": 82
  },
  "emergentBehaviors": ["Behavior 1", "Behavior 2"],
  "researchImplications": ["Implication 1", "Implication 2"],
  "summary": {
    "mainConclusions": ["Conclusion 1", "Conclusion 2"],
    "keyDiscussionPoints": ["Point 1", "Point 2"],
    "agreements": ["Agreement 1", "Agreement 2"],
    "disagreements": ["Disagreement 1", "Disagreement 2"],
    "overallTone": "Description of conversation tone",
    "suggestedNextTopics": ["Topic 1", "Topic 2"]
  }
}`;
```

3. The analysis results are returned in the following structure:
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

## Usage

To analyze a conversation:

```typescript
const chatRoom = new ChatRoomService(config);
// ... run conversation ...
const analytics = await chatRoom.analyzeConversation();
```

## Output Display

The analysis results are displayed in the following format:

1. Main Topics
2. Agent Behavior Analysis for each agent:
   - Cognitive Patterns
   - Emotional Responses
   - Adaptability Score
   - Role Consistency
   
3. Interaction Dynamics:
   - Power Dynamics
   - Group Polarization
   - Cognitive Alignment

4. Experiment Metrics:
   - Idea Diversity
   - Conversation Depth
   - Emotional Intelligence
   - Logical Consistency
   - Creativity Score

5. Emergent Behaviors

6. Research Implications

7. Conversation Summary:
   - Main Conclusions
   - Key Discussion Points
   - Points of Agreement
   - Points of Disagreement
   - Overall Tone
   - Suggested Next Topics


## Best Practices

1. **Data Quality**
   - Ensure clear conversation topics
   - Maintain focused discussions
   - Use appropriate number of messages

2. **Analysis Interpretation**
   - Consider context
   - Look for patterns across sessions
   - Don't over-interpret single metrics

3. **Session Management**
   - Save all session data
   - Document experiment conditions
   - Compare similar configurations 