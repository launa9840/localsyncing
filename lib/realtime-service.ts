import { SyncData, FileItem } from '@/types';
import { isExpired } from './expiration-utils';
import { supabase } from './supabase';

export class RealtimeService {
  // Helper to create default empty data
  private static getDefaultData(): SyncData {
    return {
      text: '',
      files: [],
      lastUpdated: Date.now(),
      createdAt: Date.now(),
      isLocked: false,
    };
  }

  static async getSyncData(userId: string): Promise<SyncData> {
    // Graceful fallback if Supabase is not configured
    if (!supabase) {
      console.warn('[RealtimeService] Supabase is not configured - returning default empty data');
      return this.getDefaultData();
    }

    console.log('[RealtimeService] Fetching data for user:', userId);

    try {
      // Fetch from database
      const { data, error } = await supabase
        .from('sync_data')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is fine for first time
        console.error('[RealtimeService] Error fetching sync data:', error);
        return this.getDefaultData();
      }

      // If no data exists, create default entry
      if (!data) {
        console.log('[RealtimeService] No data found, creating default entry');
        const defaultData = this.getDefaultData();

        const { data: newData, error: insertError } = await supabase
          .from('sync_data')
          .insert({
            user_id: userId,
            text_content: defaultData.text,
            files: defaultData.files,
            created_at: new Date(defaultData.createdAt).toISOString(),
            last_updated: new Date(defaultData.lastUpdated).toISOString(),
            is_locked: defaultData.isLocked,
          })
          .select()
          .single();

        if (insertError) {
          console.error('[RealtimeService] Error creating sync data:', insertError);
          return defaultData;
        }

        console.log('[RealtimeService] Created new entry');
        return this.mapDbToSyncData(newData);
      }

      console.log('[RealtimeService] Found existing data:', {
        textLength: data.text_content?.length || 0,
        filesCount: data.files?.length || 0,
      });

      // Map database format to SyncData format
      const syncData = this.mapDbToSyncData(data);

      // Return data without filtering - files will stay for 3 days
      // Cleanup only happens via the /api/cleanup endpoint (runs once daily)
      return syncData;
    } catch (error) {
      console.error('[RealtimeService] Unexpected error in getSyncData:', error);
      return this.getDefaultData();
    }
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

  static async updateText(userId: string, text: string): Promise<SyncData> {
    if (!supabase) {
      console.warn('[RealtimeService] Supabase not configured - cannot update text');
      const data = await this.getSyncData(userId);
      data.text = text; // Update in memory only
      return data;
    }

    try {
      const data = await this.getSyncData(userId);
      
      const { data: updated, error } = await supabase
        .from('sync_data')
        .update({
          text_content: text,
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('[RealtimeService] Error updating text:', error);
        data.text = text; // Fallback to in-memory update
        return data;
      }

      return this.mapDbToSyncData(updated);
    } catch (error) {
      console.error('[RealtimeService] Unexpected error in updateText:', error);
      const data = await this.getSyncData(userId);
      data.text = text;
      return data;
    }
  }

  static async addFile(userId: string, file: FileItem): Promise<SyncData> {
    if (!supabase) {
      console.warn('[RealtimeService] Supabase not configured - cannot add file');
      const data = await this.getSyncData(userId);
      data.files.push(file); // Add to memory only
      return data;
    }

    try {
      console.log('[RealtimeService] Adding file:', file.name, 'for user:', userId);
      const data = await this.getSyncData(userId);
      const updatedFiles = [...data.files, file];

      const { data: updated, error } = await supabase
        .from('sync_data')
        .update({
          files: updatedFiles,
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('[RealtimeService] Error adding file:', error);
        data.files = updatedFiles; // Fallback to in-memory update
        return data;
      }

      console.log('[RealtimeService] File added successfully, total files:', updatedFiles.length);
      return this.mapDbToSyncData(updated);
    } catch (error) {
      console.error('[RealtimeService] Unexpected error in addFile:', error);
      const data = await this.getSyncData(userId);
      data.files.push(file);
      return data;
    }
  }

  static async deleteFile(userId: string, fileId: string): Promise<SyncData> {
    if (!supabase) {
      console.warn('[RealtimeService] Supabase not configured - cannot delete file');
      const data = await this.getSyncData(userId);
      data.files = data.files.filter(f => f.id !== fileId);
      return data;
    }

    try {
      const data = await this.getSyncData(userId);
      const updatedFiles = data.files.filter(f => f.id !== fileId);

      const { data: updated, error } = await supabase
        .from('sync_data')
        .update({
          files: updatedFiles,
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('[RealtimeService] Error deleting file:', error);
        data.files = updatedFiles;
        return data;
      }

      return this.mapDbToSyncData(updated);
    } catch (error) {
      console.error('[RealtimeService] Unexpected error in deleteFile:', error);
      const data = await this.getSyncData(userId);
      data.files = data.files.filter(f => f.id !== fileId);
      return data;
    }
  }

  static async setPassword(userId: string, passwordHash: string): Promise<SyncData> {
    if (!supabase) {
      console.warn('[RealtimeService] Supabase not configured - cannot set password');
      const data = await this.getSyncData(userId);
      data.passwordHash = passwordHash;
      data.isLocked = true;
      return data;
    }

    try {
      const { data: updated, error } = await supabase
        .from('sync_data')
        .update({
          password_hash: passwordHash,
          is_locked: true,
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('[RealtimeService] Error setting password:', error);
        const data = await this.getSyncData(userId);
        data.passwordHash = passwordHash;
        data.isLocked = true;
        return data;
      }

      return this.mapDbToSyncData(updated);
    } catch (error) {
      console.error('[RealtimeService] Unexpected error in setPassword:', error);
      const data = await this.getSyncData(userId);
      data.passwordHash = passwordHash;
      data.isLocked = true;
      return data;
    }
  }

  static async removePassword(userId: string): Promise<SyncData> {
    if (!supabase) {
      console.warn('[RealtimeService] Supabase not configured - cannot remove password');
      const data = await this.getSyncData(userId);
      data.passwordHash = undefined;
      data.isLocked = false;
      return data;
    }

    try {
      const { data: updated, error} = await supabase
        .from('sync_data')
        .update({
          password_hash: null,
          is_locked: false,
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('[RealtimeService] Error removing password:', error);
        const data = await this.getSyncData(userId);
        data.passwordHash = undefined;
        data.isLocked = false;
        return data;
      }

      return this.mapDbToSyncData(updated);
    } catch (error) {
      console.error('[RealtimeService] Unexpected error in removePassword:', error);
      const data = await this.getSyncData(userId);
      data.passwordHash = undefined;
      data.isLocked = false;
      return data;
    }
  }

  static async verifyPassword(userId: string, passwordHash: string): Promise<boolean> {
    const data = await this.getSyncData(userId);
    return data.passwordHash === passwordHash;
  }
  
  /**
   * Clean up expired files for a specific user
   * Returns array of deleted file URLs
   */
  static async cleanupExpiredFiles(userId: string): Promise<string[]> {
    if (!supabase) {
      console.warn('[RealtimeService] Supabase not configured - cannot cleanup files');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('sync_data')
        .select('*')
        .eq('user_id', userId)
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
          .eq('user_id', userId);
      }

      return expiredUrls;
    } catch (error) {
      console.error('[RealtimeService] Error in cleanupExpiredFiles:', error);
      return [];
    }
  }

  /**
   * Clean up expired files for all users
   * Returns array of deleted file URLs
   */
  static async cleanupAllExpiredFiles(): Promise<string[]> {
    if (!supabase) {
      console.warn('[RealtimeService] Supabase not configured - cannot cleanup files');
      return [];
    }

    try {
      const allDeletedUrls: string[] = [];

      // Get all sync data entries
      const { data: allData, error } = await supabase
        .from('sync_data')
        .select('*');

      if (error || !allData) return [];

      // Process each entry
      for (const dbRow of allData) {
        const deletedUrls = await this.cleanupExpiredFiles(dbRow.user_id);
        allDeletedUrls.push(...deletedUrls);
      }

      return allDeletedUrls;
    } catch (error) {
      console.error('[RealtimeService] Error in cleanupAllExpiredFiles:', error);
      return [];
    }
  }
}
