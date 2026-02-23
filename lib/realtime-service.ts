import { SyncData, FileItem } from '@/types';

// Mock in-memory storage (in production, use Redis or a database)
const storage = new Map<string, SyncData>();

export class RealtimeService {
  static async getSyncData(ipAddress: string): Promise<SyncData> {
    const data = storage.get(ipAddress);
    if (!data) {
      const defaultData: SyncData = {
        text: '',
        files: [],
        lastUpdated: Date.now(),
        isLocked: false,
      };
      storage.set(ipAddress, defaultData);
      return defaultData;
    }
    return data;
  }

  static async updateText(ipAddress: string, text: string): Promise<SyncData> {
    const data = await this.getSyncData(ipAddress);
    const updated: SyncData = {
      ...data,
      text,
      lastUpdated: Date.now(),
    };
    storage.set(ipAddress, updated);
    return updated;
  }

  static async addFile(ipAddress: string, file: FileItem): Promise<SyncData> {
    const data = await this.getSyncData(ipAddress);
    const updated: SyncData = {
      ...data,
      files: [...data.files, file],
      lastUpdated: Date.now(),
    };
    storage.set(ipAddress, updated);
    return updated;
  }

  static async deleteFile(ipAddress: string, fileId: string): Promise<SyncData> {
    const data = await this.getSyncData(ipAddress);
    const updated: SyncData = {
      ...data,
      files: data.files.filter(f => f.id !== fileId),
      lastUpdated: Date.now(),
    };
    storage.set(ipAddress, updated);
    return updated;
  }

  static async setPassword(ipAddress: string, passwordHash: string): Promise<SyncData> {
    const data = await this.getSyncData(ipAddress);
    const updated: SyncData = {
      ...data,
      passwordHash,
      isLocked: true,
      lastUpdated: Date.now(),
    };
    storage.set(ipAddress, updated);
    return updated;
  }

  static async removePassword(ipAddress: string): Promise<SyncData> {
    const data = await this.getSyncData(ipAddress);
    const updated: SyncData = {
      ...data,
      passwordHash: undefined,
      isLocked: false,
      lastUpdated: Date.now(),
    };
    storage.set(ipAddress, updated);
    return updated;
  }

  static async verifyPassword(ipAddress: string, passwordHash: string): Promise<boolean> {
    const data = await this.getSyncData(ipAddress);
    return data.passwordHash === passwordHash;
  }
}
