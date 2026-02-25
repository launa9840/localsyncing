'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string, fileName: string, fileSize: number) => void;
}

export default function CloudinaryUpload({ onUploadSuccess }: CloudinaryUploadProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error('Cloudinary configuration missing');
    return (
      <div className="text-sm text-red-600 dark:text-red-400">
        Cloudinary not configured. Please add environment variables.
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
