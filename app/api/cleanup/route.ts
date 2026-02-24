import { NextRequest, NextResponse } from 'next/server';
import { RealtimeService } from '@/lib/realtime-service';
import { deleteFile, getFilePathFromUrl } from '@/lib/supabase';

/**
 * Cleanup API - Removes expired files from storage
 * Can be called manually or via cron job
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication here for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // If CRON_SECRET is set, require it for authentication
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all expired file URLs
    const expiredUrls = await RealtimeService.cleanupAllExpiredFiles();

    // Delete files from Supabase Storage
    let supabaseDeleteCount = 0;
    for (const url of expiredUrls) {
      try {
        const filePath = getFilePathFromUrl(url);
        if (filePath) {
          await deleteFile(filePath);
          supabaseDeleteCount++;
        }
      } catch (error) {
        console.error('Failed to delete file from Supabase:', error);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        filesDeleted: expiredUrls.length,
        supabaseDeleted: supabaseDeleteCount,
        message: `Cleaned up ${expiredUrls.length} expired files (${supabaseDeleteCount} from storage)`,
      },
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Cleanup failed',
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check cleanup status
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      message: 'Cleanup endpoint is active',
      info: 'POST to this endpoint to trigger cleanup',
      expirationPolicy: '3 days (72 hours)',
    },
  });
}
