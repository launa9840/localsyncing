'use client';

import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
}

export default function FileUploadZone({ onFileUpload }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragging 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
          : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
        }
      `}
    >
      <Upload className="h-10 w-10 mx-auto mb-3 text-slate-400 dark:text-slate-500" />
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
        Drag and drop a file here, or click to browse
      </p>
      <Button variant="outline" size="sm" asChild>
        <label className="cursor-pointer">
          Choose File
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </Button>
    </div>
  );
}
