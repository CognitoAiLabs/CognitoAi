export interface Agent {
  name: string;
  personality: string;
  background: string;
  expertise?: string[];
  beliefs?: string[];
  quirks?: string[];
  communication?: string;
  traits: string[];
}

export interface ChatRoomConfig {
  numberOfAgents: number;
  topic: string;
  messagesPerAgent: number;
}

export interface Message {
  agentName: string;
  content: string;
  timestamp: Date;
}

export interface ConversationSummary {
  mainConclusions: string[];
  keyDiscussionPoints: string[];
  disagreements: string[];
  agreements: string[];
  suggestedNextTopics: string[];
  overallTone: string;
}

export interface ChatAnalytics {
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

export interface AgentCreationOptions {
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
