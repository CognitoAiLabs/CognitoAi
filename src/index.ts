import './utils/inquirer-theme';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { ChatRoomService } from './services/chatRoom';
import { ChatRoomConfig, Agent } from './types';
import { StorageService } from './services/storage';

async function main() {
  const storageService = new StorageService();
  let currentAgents: Agent[] | null = null;
  const initialConfig: ChatRoomConfig = {
    numberOfAgents: 2,
    topic: '',
    messagesPerAgent: 3
  };
  const chatRoom = new ChatRoomService(initialConfig);

  console.clear();
  console.log(chalk.white('Welcome to AI Agents Chat Room!\n'));

  const sessions = await storageService.getAllSessions();
  
  if (sessions.length > 0) {
    const { reusePreviousAgents } = await inquirer.prompt([{
      type: 'confirm',
      name: 'reusePreviousAgents',
      message: 'Would you like to use agents from a previous conversation?',
      default: false
    }]);

    if (reusePreviousAgents) {
      const { sessionChoice } = await inquirer.prompt([{
        type: 'list',
        name: 'sessionChoice',
        message: 'Select a previous session:',
        choices: sessions.map(session => ({
          name: `${session.topic} (${session.agents.map(a => a.name).join(', ')})`,
          value: session.id
        }))
      }]);

      if (sessionChoice) {
        const session = await storageService.getSession(sessionChoice);
        if (session) {
          currentAgents = session.agents;
          chatRoom.setAgents(currentAgents);
          console.log(chalk.white('Agents loaded successfully!'));
        }
      }
    }
  }

  const config = await inquirer.prompt([
    {
      type: 'input',
      name: 'topic',
      message: 'Enter conversation topic:',
      validate: (input) => input.trim().length > 0
    },
    {
      type: 'number',
      name: 'numberOfAgents',
      message: 'Number of agents (2-5):',
      default: currentAgents?.length || 2,
      validate: (input) => input >= 2 && input <= 5,
      when: !currentAgents
    },
    {
      type: 'number',
      name: 'messagesPerAgent',
      message: 'Messages per agent (1-10):',
      default: 3,
      validate: (input) => input >= 1 && input <= 10
    }
  ]);

  chatRoom.setConfig(config);

  if (!currentAgents) {
    const { generateAllRandom } = await inquirer.prompt([{
      type: 'confirm',
      name: 'generateAllRandom',
      message: 'Would you like to generate all agents randomly?',
      default: false,
      prefix: chalk.white('?')
    }]);

    if (generateAllRandom) {
      await chatRoom.initializeRandomAgents(config.topic);
    } else {
      await chatRoom.initializeAgents(config.topic);
    }
  }

  currentAgents = chatRoom.getAgents();

  console.log(chalk.white('\nAgents in the chat room:'));
  currentAgents.forEach(agent => {
    const shortDescription = typeof agent.personality === 'string' 
      ? agent.personality.split('.')[0] 
      : agent.background || 'No description';
    console.log(chalk.white(`- ${agent.name} (${shortDescription})`));
  });

  console.log(chalk.white('\nStarting conversation...\n'));
  await chatRoom.simulateConversation();

  const sessionId = await chatRoom.saveSession();
  console.log(chalk.white(`\nConversation saved with ID: ${sessionId}`));

  console.log(chalk.white('\nAnalyzing conversation...'));
  const analytics = await chatRoom.analyzeConversation();

  console.log(chalk.white('\n=== Conversation Analysis ==='));
  
  console.log(chalk.white('\nMain Topics:'));
  analytics.mainTopics.forEach((topic: string) => 
    console.log(chalk.white(`- ${topic}`)));

  console.log(chalk.white('\nAgent Behavior Analysis:'));
  Object.entries(analytics.agentBehaviorAnalysis).forEach(([agent, analysis]) => {
    console.log(chalk.white(`\n${agent}:`));
    console.log(chalk.white(`Cognitive Patterns: ${analysis.cognitivePatterns}`));
    console.log(chalk.white(`Emotional Responses: ${analysis.emotionalResponses}`));
    console.log(chalk.white(`Adaptability Score: ${analysis.adaptabilityScore}%`));
    console.log(chalk.white(`Role Consistency: ${analysis.consistencyWithRole}`));
  });

  console.log(chalk.white('\nInteraction Dynamics:'));
  console.log(chalk.white(`Power Dynamics: ${analytics.interactionDynamics.powerDynamics}`));
  console.log(chalk.white(`Group Polarization: ${analytics.interactionDynamics.groupPolarization}`));
  console.log(chalk.white(`Cognitive Alignment: ${analytics.interactionDynamics.cognitiveAlignment}`));

  console.log(chalk.white('\nExperiment Metrics:'));
  console.log(chalk.white(`Idea Diversity: ${analytics.experimentMetrics.ideaDiversity}%`));
  console.log(chalk.white(`Conversation Depth: ${analytics.experimentMetrics.conversationDepth}%`));
  console.log(chalk.white(`Emotional Intelligence: ${analytics.experimentMetrics.emotionalIntelligence}%`));
  console.log(chalk.white(`Logical Consistency: ${analytics.experimentMetrics.logicalConsistency}%`));
  console.log(chalk.white(`Creativity Score: ${analytics.experimentMetrics.creativityScore}%`));

  console.log(chalk.white('\nEmergent Behaviors:'));
  analytics.emergentBehaviors.forEach((behavior: string) => 
    console.log(chalk.white(`- ${behavior}`)));

  console.log(chalk.white('\nResearch Implications:'));
  analytics.researchImplications.forEach((implication: string) => 
    console.log(chalk.white(`- ${implication}`)));

  console.log(chalk.white('\n=== Conversation Summary ==='));
  console.log(chalk.white('\nMain Conclusions:'));
  analytics.summary.mainConclusions.forEach((conclusion: string) => 
    console.log(chalk.white(`- ${conclusion}`)));

  console.log(chalk.white('\nKey Discussion Points:'));
  analytics.summary.keyDiscussionPoints.forEach(point => 
    console.log(chalk.white(`- ${point}`)));

  console.log(chalk.white('\nPoints of Agreement:'));
  analytics.summary.agreements.forEach(agreement => 
    console.log(chalk.white(`- ${agreement}`)));

  console.log(chalk.white('\nPoints of Disagreement:'));
  analytics.summary.disagreements.forEach(disagreement => 
    console.log(chalk.white(`- ${disagreement}`)));

  console.log(chalk.white('\nOverall Tone:'), chalk.white(analytics.summary.overallTone));

  console.log(chalk.white('\nSuggested Next Topics:'));
  analytics.summary.suggestedNextTopics.forEach(topic => console.log(chalk.white(`- ${topic}`)));

  const continueChat = await inquirer.prompt([{
    type: 'confirm',
    name: 'continueChat',
    message: 'Would you like to start another conversation?',
    default: true
  }]);

  if (!continueChat.continueChat) {
    console.log(chalk.white('\nThanks for using AI Agents Chat Room!'));
    return;
  }

  main().catch(console.error); 
}

main().catch(console.error); 