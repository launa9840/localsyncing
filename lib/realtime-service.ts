import { SyncData, FileItem } from '@/types';
import { isExpired } from './expiration-utils';
import { supabase } from './supabase';

export class RealtimeService {
  static async getSyncData(ipAddress: string): Promise<SyncData> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    // Fetch from database
    const { data, error } = await supabase
      .from('sync_data')
      .select('*')
      .eq('ip_address', ipAddress)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine for first time
      console.error('Error fetching sync data:', error);
    }

    // If no data exists, create default entry
    if (!data) {
      const defaultData: SyncData = {
        text: '',
        files: [],
        lastUpdated: Date.now(),
        createdAt: Date.now(),
        isLocked: false,
      };

      const { data: newData, error: insertError } = await supabase
        .from('sync_data')
        .insert({
          ip_address: ipAddress,
          text_content: defaultData.text,
          files: defaultData.files,
          created_at: new Date(defaultData.createdAt).toISOString(),
          last_updated: new Date(defaultData.lastUpdated).toISOString(),
          is_locked: defaultData.isLocked,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating sync data:', insertError);
        return defaultData;
      }

      return this.mapDbToSyncData(newData);
    }

    // Map database format to SyncData format
    const syncData = this.mapDbToSyncData(data);

    // Return data without filtering - files will stay for 3 days
    // Cleanup only happens via the /api/cleanup endpoint (runs every 6 hours)
    return syncData;
  }

  // Helper to map database row to SyncData
  private static mapDbToSyncData(dbRow: any): SyncData {
    return {
      text: dbRow.text_content || '',
      files: dbRow.files || [],
      lastUpdated: new Date(dbRow.last_updated).getTime(),
      createdAt: new Date(dbRow.created_at).getTime(),
      passwordHash: dbRow.password_hash,
      isLocked: dbRow.is_locked || false,
    };
  }

  static async updateText(ipAddress: string, text: string): Promise<SyncData> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const data = await this.getSyncData(ipAddress);
    
    const { data: updated, error } = await supabase
      .from('sync_data')
      .update({
        text_content: text,
      })
      .eq('ip_address', ipAddress)
      .select()
      .single();

    if (error) {
      console.error('Error updating text:', error);
      throw error;
    }

    return this.mapDbToSyncData(updated);
  }

  static async addFile(ipAddress: string, file: FileItem): Promise<SyncData> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const data = await this.getSyncData(ipAddress);
    const updatedFiles = [...data.files, file];

    const { data: updated, error } = await supabase
      .from('sync_data')
      .update({
        files: updatedFiles,
      })
      .eq('ip_address', ipAddress)
      .select()
      .single();

    if (error) {
      console.error('Error adding file:', error);
      throw error;
    }

    return this.mapDbToSyncData(updated);
  }

  static async deleteFile(ipAddress: string, fileId: string): Promise<SyncData> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const data = await this.getSyncData(ipAddress);
    const updatedFiles = data.files.filter(f => f.id !== fileId);

    const { data: updated, error } = await supabase
      .from('sync_data')
      .update({
        files: updatedFiles,
      })
      .eq('ip_address', ipAddress)
      .select()
      .single();

    if (error) {
      console.error('Error deleting file:', error);
      throw error;
    }

    return this.mapDbToSyncData(updated);
  }

  static async setPassword(ipAddress: string, passwordHash: string): Promise<SyncData> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data: updated, error } = await supabase
      .from('sync_data')
      .update({
        password_hash: passwordHash,
        is_locked: true,
      })
      .eq('ip_address', ipAddress)
      .select()
      .single();

    if (error) {
      console.error('Error setting password:', error);
      throw error;
    }

    return this.mapDbToSyncData(updated);
  }

  static async removePassword(ipAddress: string): Promise<SyncData> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data: updated, error } = await supabase
      .from('sync_data')
      .update({
        password_hash: null,
        is_locked: false,
      })
      .eq('ip_address', ipAddress)
      .select()
      .single();

    if (error) {
      console.error('Error removing password:', error);
      throw error;
    }

    return this.mapDbToSyncData(updated);
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
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data, error } = await supabase
      .from('sync_data')
      .select('*')
      .eq('ip_address', ipAddress)
      .single();

    if (error || !data) return [];

    const syncData = this.mapDbToSyncData(data);
    const expiredFiles = syncData.files.filter(file => isExpired(file.uploadedAt));
    const expiredUrls = expiredFiles.map(f => f.url);

    if (expiredFiles.length > 0) {
      const remainingFiles = syncData.files.filter(file => !isExpired(file.uploadedAt));
      
      await supabase
        .from('sync_data')
        .update({ files: remainingFiles })
        .eq('ip_address', ipAddress);
    }

    return expiredUrls;
  }

  /**
   * Clean up expired files for all IPs
   * Returns array of deleted file URLs
   */
  static async cleanupAllExpiredFiles(): Promise<string[]> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const allDeletedUrls: string[] = [];

    // Get all sync data entries
    const { data: allData, error } = await supabase
      .from('sync_data')
      .select('*');

    if (error || !allData) return [];

    // Process each entry
    for (const dbRow of allData) {
      const deletedUrls = await this.cleanupExpiredFiles(dbRow.ip_address);
      allDeletedUrls.push(...deletedUrls);
    }

    return allDeletedUrls;
  }
}
