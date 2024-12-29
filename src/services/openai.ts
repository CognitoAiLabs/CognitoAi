import OpenAI from 'openai';
import { config } from '../config/config';
import { Agent, Message, ChatAnalytics, AgentCreationOptions } from '../types';

export class OpenAIService {
  private openai: OpenAI;
  private model: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openAI.apiKey
    });
    this.model = config.openAI.model;
  }

  async generateRandomAgent(options: AgentCreationOptions): Promise<Agent> {
    let systemPrompt = '';
    
    if (options.isRandom) {
      systemPrompt = `Create a unique chat agent that would be interesting in a conversation about "${options.conversationTopic}".
      The agent should have relevant expertise and complex characteristics.`;
    } else {
      const userProvidedFields = {
        name: options.name,
        personality: options.personality,
        background: options.background,
        expertise: options.expertise,
        beliefs: options.beliefs,
        quirks: options.quirks,
        communication: options.communication,
        traits: options.traits
      };

      const fieldsToGenerate = Object.entries(userProvidedFields)
        .filter(([_, value]) => !value)
        .map(([field]) => field);

      systemPrompt = `Create a chat agent with these exact characteristics:
      ${options.name ? `Name: ${options.name} (must keep exactly as specified)` : 'Generate a suitable name'}
      ${options.personality ? `Personality: ${options.personality} (must keep exactly as specified)` : 'Generate a detailed personality'}
      ${options.background ? `Background: ${options.background} (must keep exactly as specified)` : 'Generate a relevant background'}
      ${options.expertise ? `Expertise: ${options.expertise} (must keep exactly as specified)` : 'Generate relevant areas of expertise'}
      ${options.beliefs ? `Beliefs: ${options.beliefs} (must keep exactly as specified)` : 'Generate core beliefs'}
      ${options.quirks ? `Quirks: ${options.quirks} (must keep exactly as specified)` : 'Generate unique quirks'}
      ${options.communication ? `Communication: ${options.communication} (must keep exactly as specified)` : 'Generate communication style'}
      
      Only generate content for unspecified fields. The specified fields must remain exactly as provided.
      Generate content that aligns with the topic: "${options.conversationTopic}" and complements the existing characteristics.`;
    }

    systemPrompt += `\n\nProvide the response in this JSON format:
    {
      "name": "Full name",
      "personality": "Detailed personality description",
      "background": "Rich life history",
      "expertise": ["Primary expertise", "Secondary expertise", "Other areas"],
      "beliefs": ["Core belief 1", "Core belief 2", "Core belief 3"],
      "quirks": ["Unique habit 1", "Quirk 2", "Trait 3"],
      "communication": "Detailed communication style",
      "traits": ["trait1", "trait2", "trait3", "trait4"]
    }`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "system",
          content: systemPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const agent = JSON.parse(response.choices[0].message.content || '{}');
    
    if (!options.isRandom) {
      if (options.name) agent.name = options.name;
      if (options.personality) agent.personality = options.personality;
      if (options.background) agent.background = options.background;
      if (options.expertise) agent.expertise = [options.expertise];
      if (options.beliefs) agent.beliefs = [options.beliefs];
      if (options.quirks) agent.quirks = [options.quirks];
      if (options.communication) agent.communication = options.communication;
      if (options.traits) agent.traits = options.traits;
    }
    
    return agent;
  }

  async generateMessage(agent: Agent, topic: string, previousMessages: Message[]): Promise<string> {
    const context = previousMessages
      .map(msg => `${msg.agentName}: ${msg.content}`)
      .join('\n');

    const systemPrompt = `You are ${agent.name}, participating in a casual conversation about ${topic}.

    Your core characteristics:
    - Personality: ${agent.personality}
    - Background: ${agent.background}
    - Professional expertise: ${agent.traits?.join(', ') || 'Not specified'}
    - Communication style: ${agent.communication || 'Natural'}

    Guidelines:
    1. Keep responses very short (1-2 sentences max)
    2. Be casual but professional
    3. Stay in character and use your expertise
    4. React naturally to others
    5. Never start your response with your own name
    6. Avoid addressing others by name
    7. Focus on the content of your response
    8. Sometimes incorporate aspects of your background and expertise in your responses`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    if (previousMessages.length > 0) {
      messages.push({
        role: "user",
        content: "Previous conversation:\n" + context
      });
    }

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: messages
    });

    let content = response.choices[0].message.content || '';
    
    const namePattern = new RegExp(`^${agent.name}:?\\s*`, 'i');
    content = content.replace(namePattern, '');

    return content;
  }

  async analyzeConversation(messages: Message[]): Promise<ChatAnalytics> {
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
    }

    Conversation to analyze:
    ${messages.map(m => `${m.agentName}: ${m.content}`).join('\n')}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: systemPrompt
      }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }
}
