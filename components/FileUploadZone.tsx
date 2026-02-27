'use client';

import CloudinaryUpload from './CloudinaryUpload';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  onFileUpload: (fileData: { url: string; name: string; size: number; publicId: string; resourceType: string }) => void;
}

export default function FileUploadZone({ onFileUpload }: FileUploadZoneProps) {
  const handleCloudinaryUpload = (url: string, fileName: string, fileSize: number, publicId: string, resourceType: string) => {
    console.log('[FileUploadZone] Cloudinary upload complete:', { url, fileName, fileSize, publicId, resourceType });
    onFileUpload({
      url,
      name: fileName,
      size: fileSize,
      publicId,
      resourceType,
    });
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500">
      <Upload className="h-10 w-10 mx-auto mb-3 text-slate-400 dark:text-slate-500" />
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
        Upload files (up to 100MB)
      </p>
      <CloudinaryUpload onUploadSuccess={handleCloudinaryUpload} />
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">
        Files expire after 3 days
      </p>
    </div>
  );
}
