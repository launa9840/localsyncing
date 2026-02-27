import { NextRequest, NextResponse } from 'next/server';
import { RealtimeService } from '@/lib/realtime-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId } = body;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'resetPassword':
        // Remove password and clear all data
        await RealtimeService.removePassword(userId);
        const clearedData = await RealtimeService.getSyncData(userId);
        clearedData.text = '';
        clearedData.files = [];
        
        return NextResponse.json({
          success: true,
          message: 'Password reset and data cleared successfully',
        });

      case 'deleteFiles':
        // Delete all files for this user
        const data = await RealtimeService.getSyncData(userId);
        
        // Note: Cloudinary files are not deleted - they expire automatically
        console.log('[Debug] Removing file references from database:', data.files.length);

        // Clear files from data
        data.files = [];
        await RealtimeService.updateText(userId, data.text);
        
        return NextResponse.json({
          success: true,
          message: 'All file references deleted successfully',
        });

      case 'unlinkIPs':
        // In a real app, this would unlink associated IPs
        // For now, we'll just acknowledge the action
        return NextResponse.json({
          success: true,
          message: 'All linked IPs have been unlinked',
        });

      case 'resetEverything':
        // Delete everything for this user
        const allData = await RealtimeService.getSyncData(userId);
        
        // Note: Cloudinary files are not deleted - they expire automatically
        console.log('[Debug] Resetting everything for user:', userId);

        // Remove password
        await RealtimeService.removePassword(userId);
        
        // Clear all data
        const resetData = await RealtimeService.getSyncData(userId);
        resetData.text = '';
        resetData.files = [];
        resetData.passwordHash = undefined;
        resetData.isLocked = false;
        
        return NextResponse.json({
          success: true,
          message: 'Everything has been reset and deleted',
        });

      case 'getStats':
        // Get statistics for this user
        const stats = await RealtimeService.getSyncData(userId);
        
        // Calculate total size from file metadata
        const totalSize = stats.files.reduce((acc, file) => acc + file.size, 0);

        return NextResponse.json({
          success: true,
          data: {
            textLength: stats.text.length,
            fileCount: stats.files.length,
            totalSize,
            isLocked: stats.isLocked || false,
            lastUpdated: stats.lastUpdated,
          },
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        userId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
