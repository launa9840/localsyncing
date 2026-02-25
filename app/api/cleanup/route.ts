import { NextRequest, NextResponse } from 'next/server';
import { RealtimeService } from '@/lib/realtime-service';

/**
 * Cleanup API - Removes expired files from database
 * Can be called manually or via cron job
 * Note: Cloudinary files are not deleted - they expire automatically
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

    // Get all expired file URLs and remove from database
    const expiredUrls = await RealtimeService.cleanupAllExpiredFiles();

    console.log('[Cleanup] Removed expired files from database:', expiredUrls.length);

    return NextResponse.json({
      success: true,
      data: {
        filesDeleted: expiredUrls.length,
        message: `Cleaned up ${expiredUrls.length} expired files from database`,
      },
    });
  } catch (error) {
    console.error('[Cleanup] Error:', error);
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
      storage: 'Cloudinary (files expire automatically)',
    },
  });
}
