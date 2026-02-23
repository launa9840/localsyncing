import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 100MB limit' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(7);
    const filename = `${uniqueId}-${file.name}`;

    // Upload to Supabase Storage
    const publicUrl = await uploadFile(file, filename);

    return NextResponse.json({
      success: true,
      data: {
        id: uniqueId,
        name: file.name,
        size: file.size,
        uploadedAt: Date.now(),
        url: publicUrl,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      },
      { status: 500 }
    );
  }
}
