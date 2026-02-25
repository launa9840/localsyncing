export interface SyncData {
  text: string;
  files: FileItem[];
  lastUpdated: number;
  createdAt: number;
  passwordHash?: string;
  isLocked?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: number;
  url: string;
  publicId?: string; // Cloudinary public_id for deletion
  resourceType?: string; // Cloudinary resource type (image, video, raw)
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
