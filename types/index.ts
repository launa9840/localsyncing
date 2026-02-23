export interface SyncData {
  text: string;
  files: FileItem[];
  lastUpdated: number;
  passwordHash?: string;
  isLocked?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: number;
  url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
