import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with server-side credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicId, resourceType } = body;

    // Validate inputs
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('[Cloudinary Delete] Missing API credentials');
      return NextResponse.json(
        { success: false, error: 'Cloudinary not configured on server' },
        { status: 500 }
      );
    }

    console.log('[Cloudinary Delete] Attempting to delete:', { publicId, resourceType });

    // Determine resource type (default to 'raw' for non-image files)
    const type = resourceType || 'raw';

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
      invalidate: true, // Invalidate CDN cache
    });

    console.log('[Cloudinary Delete] Result:', result);

    // Check if deletion was successful
    if (result.result === 'ok' || result.result === 'not found') {
      // 'not found' is also acceptable (file already deleted)
      return NextResponse.json({
        success: true,
        message: 'File deleted from Cloudinary',
        result: result.result,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `Cloudinary deletion failed: ${result.result}`,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[Cloudinary Delete] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete file from Cloudinary',
      },
      { status: 500 }
    );
  }
}
