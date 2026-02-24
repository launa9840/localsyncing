import { SyncData, FileItem } from '@/types';
import { filterExpired, isExpired } from './expiration-utils';

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
        createdAt: Date.now(),
        isLocked: false,
      };
      storage.set(ipAddress, defaultData);
      return defaultData;
    }
    
    // Filter out expired files
    const filteredData: SyncData = {
      ...data,
      files: filterExpired(data.files),
    };
    
    // Update storage if files were filtered
    if (filteredData.files.length !== data.files.length) {
      storage.set(ipAddress, filteredData);
    }
    
    return filteredData;
  }

  static async updateText(ipAddress: string, text: string): Promise<SyncData> {
    const data = await this.getSyncData(ipAddress);
    const updated: SyncData = {
      ...data,
      text,
      lastUpdated: Date.now(),
      // Set createdAt if this is the first text update
      createdAt: data.createdAt || Date.now(),
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
  
  /**
   * Clean up expired files for a specific IP
   * Returns array of deleted file URLs
   */
  static async cleanupExpiredFiles(ipAddress: string): Promise<string[]> {
    const data = storage.get(ipAddress);
    if (!data) return [];
    
    const expiredFiles = data.files.filter(file => isExpired(file.uploadedAt));
    const expiredUrls = expiredFiles.map(f => f.url);
    
    if (expiredFiles.length > 0) {
      const updated: SyncData = {
        ...data,
        files: data.files.filter(file => !isExpired(file.uploadedAt)),
        lastUpdated: Date.now(),
      };
      storage.set(ipAddress, updated);
    }
    
    return expiredUrls;
  }
  
  /**
   * Clean up expired files for all IPs
   * Returns array of deleted file URLs
   */
  static async cleanupAllExpiredFiles(): Promise<string[]> {
    const allDeletedUrls: string[] = [];
    
    for (const [ipAddress] of storage) {
      const deletedUrls = await this.cleanupExpiredFiles(ipAddress);
      allDeletedUrls.push(...deletedUrls);
    }
    
    return allDeletedUrls;
  }
}
