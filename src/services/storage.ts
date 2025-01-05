import * as fs from 'fs/promises';
import path from 'path';
import { Agent, Message, ChatAnalytics } from '../types';

interface ChatSession {
  id: string;
  timestamp: string;
  topic: string;
  agents: Agent[];
  messages: Message[];
  analytics: ChatAnalytics;
}

export class StorageService {
  private readonly storageDir = path.join(process.cwd(), 'experiments');

  constructor() {
    this.initializeStorage();
  }

  private async initializeStorage(): Promise<void> {
    try {
      await fs.mkdir(this.storageDir, { recursive: true });
    } catch (error) {
      console.error('Error creating storage directory:', error);
    }
  }

  async saveSession(session: Omit<ChatSession, 'id'>): Promise<string> {
    const sessionId = `experiment_${Date.now()}`;
    const fullSession: ChatSession = {
      id: sessionId,
      ...session
    };

    const filePath = path.join(this.storageDir, `${sessionId}.json`);
    await fs.writeFile(filePath, JSON.stringify(fullSession, null, 2));
    return sessionId;
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const filePath = path.join(this.storageDir, `${sessionId}.json`);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  async getAllSessions(): Promise<ChatSession[]> {
    const files = await fs.readdir(this.storageDir);
    const sessions: ChatSession[] = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(this.storageDir, file);
        const data = await fs.readFile(filePath, 'utf-8');
        sessions.push(JSON.parse(data));
      }
    }

    return sessions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
} 