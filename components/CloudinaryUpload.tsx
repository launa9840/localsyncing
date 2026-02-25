'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string, fileName: string, fileSize: number) => void;
}

export default function CloudinaryUpload({ onUploadSuccess }: CloudinaryUploadProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Development logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Cloudinary Config Check]', {
        cloudName: cloudName ? '✅ Set' : '❌ Missing',
        uploadPreset: uploadPreset ? '✅ Set' : '❌ Missing',
        cloudNameValue: cloudName || 'undefined',
        uploadPresetValue: uploadPreset || 'undefined',
      });
    }
  }, [cloudName, uploadPreset]);

  // Detailed error message
  if (!cloudName || !uploadPreset) {
    const missingVars = [];
    if (!cloudName) missingVars.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    if (!uploadPreset) missingVars.push('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET');

    console.error('[Cloudinary] Missing environment variables:', missingVars);

    return (
      <div className="border-2 border-red-300 dark:border-red-700 rounded-lg p-4 bg-red-50 dark:bg-red-950">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
              Cloudinary Not Configured
            </p>
            <p className="text-xs text-red-700 dark:text-red-300 mb-2">
              Missing environment variables in Vercel:
            </p>
            <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 mb-3">
              {missingVars.map(varName => (
                <li key={varName} className="font-mono bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                  ❌ {varName}
                </li>
              ))}
            </ul>
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-red-600 dark:text-red-400 underline hover:text-red-800 dark:hover:text-red-200"
            >
              → Add variables in Vercel Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      options={{
        cloudName: cloudName,
        maxFileSize: 100000000, // 100MB
        multiple: false,
        sources: ['local', 'url', 'camera'],
        tags: ['localsync', 'expires_3days'], // Tag for auto-deletion
        folder: 'localsync', // Organize files in folder
        styles: {
          palette: {
            window: '#ffffff',
            windowBorder: '#90a0b3',
            tabIcon: '#0078ff',
            menuIcons: '#5a616a',
            textDark: '#000000',
            textLight: '#ffffff',
            link: '#0078ff',
            action: '#ff620c',
            inactiveTabIcon: '#0e2f5a',
            error: '#f44235',
            inProgress: '#0078ff',
            complete: '#20b832',
            sourceBg: '#e4ebf1',
          },
        },
      }}
      onSuccess={(result: any) => {
        if (result.event === 'success') {
          const secureUrl = result.info.secure_url;
          const fileName = result.info.original_filename || 'uploaded-file';
          const fileSize = result.info.bytes || 0;
          
          console.log('[Cloudinary] Upload success:', { secureUrl, fileName, fileSize });
          onUploadSuccess(secureUrl, fileName, fileSize);
        }
      }}
      onError={(error: any) => {
        console.error('[Cloudinary] Upload error:', error);
      }}
    >
      {({ open }) => (
        <Button
          onClick={() => open()}
          className="w-full"
          variant="outline"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      )}
    </CldUploadWidget>
  );
}
