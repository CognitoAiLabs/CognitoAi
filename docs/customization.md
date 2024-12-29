# Customization Guide

This document explains how to customize different aspects of Cognito based on the actual implementation.

## System Prompts

### Message Generation Prompts

The system prompts for message generation can be found in `src/services/openai.ts`:

```typescript
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
```

### Agent Generation Prompts

For random agent generation (`src/services/openai.ts`):

```typescript
// For random generation
systemPrompt = `Create a unique chat agent that would be interesting in a conversation about "${options.conversationTopic}".
The agent should have relevant expertise and complex characteristics.`;

// For customized generation
systemPrompt = `Create a chat agent with these exact characteristics:
${options.name ? `Name: ${options.name} (must keep exactly as specified)` : 'Generate a suitable name'}
${options.personality ? `Personality: ${options.personality} (must keep exactly as specified)` : 'Generate a detailed personality'}
${options.background ? `Background: ${options.background} (must keep exactly as specified)` : 'Generate a relevant background'}
${options.expertise ? `Expertise: ${options.expertise} (must keep exactly as specified)` : 'Generate relevant areas of expertise'}
${options.beliefs ? `Beliefs: ${options.beliefs} (must keep exactly as specified)` : 'Generate core beliefs'}
${options.quirks ? `Quirks: ${options.quirks} (must keep exactly as specified)` : 'Generate unique quirks'}
${options.communication ? `Communication: ${options.communication} (must keep exactly as specified)` : 'Generate communication style'}`;
```

## UI Customization

### System Messages

The interface messages can be customized in `src/index.ts`:

```typescript
console.log(chalk.white('Welcome to AI Agents Chat Room!\n'));

const { reusePreviousAgents } = await inquirer.prompt([{
  type: 'confirm',
  name: 'reusePreviousAgents',
  message: 'Would you like to use agents from a previous conversation?',
  default: false
}]);
```

### Theme Customization

The UI theme can be customized in `src/utils/inquirer-theme.ts`:

```typescript
export const inquirerTheme = {
  input: chalk.white,
  question: chalk.white,
  prefix: chalk.white('?'),
};
```

## Agent Creation Options

The agent creation interface provides three methods (`src/services/chatRoom.ts`):

```typescript
const { creationType } = await inquirer.prompt([{
  type: 'list',
  name: 'creationType',
  message: 'How would you like to create this agent?',
  choices: [
    { name: 'Quick Random Generation', value: 'random' },
    { name: 'Basic Customization', value: 'basic' },
    { name: 'Advanced Customization', value: 'advanced' }
  ]
}]);
```

### Basic Customization Options

```typescript
const basicOptions = await inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Name (Enter to randomize):',
  },
  {
    type: 'input',
    name: 'profession',
    message: 'Profession (Enter to randomize):',
  }
]);
```

### Advanced Customization Options

```typescript
const advancedOptions = await inquirer.prompt([
  {
    type: 'input',
    name: 'personality',
    message: 'Personality traits (Enter to randomize):',
  },
  {
    type: 'input',
    name: 'background',
    message: 'Detailed background (Enter to randomize):',
  },
  {
    type: 'input',
    name: 'expertise',
    message: 'Areas of expertise (Enter to randomize):',
  },
  {
    type: 'input',
    name: 'beliefs',
    message: 'Core beliefs/values (Enter to randomize):',
  },
  {
    type: 'input',
    name: 'quirks',
    message: 'Unique quirks/habits (Enter to randomize):',
  },
  {
    type: 'input',
    name: 'communication',
    message: 'Communication style (Enter to randomize):',
  }
]);
```

## System Limits

The system has built-in limits that can be found in `src/index.ts`:

```typescript
{
  type: 'number',
  name: 'numberOfAgents',
  message: 'Number of agents (2-5):',
  default: currentAgents?.length || 2,
  validate: (input) => input >= 2 && input <= 5
}

{
  type: 'number',
  name: 'messagesPerAgent',
  message: 'Messages per agent (1-10):',
  default: 3,
  validate: (input) => input >= 1 && input <= 10
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

3. **UI Customization**
   - Use consistent color schemes with chalk
   - Keep prompts clear and concise
   - Maintain consistent formatting

## Troubleshooting

1. **Agent Generation Issues**
   - Check if personality and background align
   - Verify traits are not contradictory
   - Review the conversation topic's relevance to the agent's expertise

2. **UI Issues**
   - Verify chalk color compatibility
   - Check inquirer prompt formatting
   - Ensure consistent theme application 