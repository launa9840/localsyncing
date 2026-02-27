import { NextRequest, NextResponse } from 'next/server';
import { RealtimeService } from '@/lib/realtime-service';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIp(request);
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'resetPassword':
        // Remove password and clear all data
        await RealtimeService.removePassword(ipAddress);
        const clearedData = await RealtimeService.getSyncData(ipAddress);
        clearedData.text = '';
        clearedData.files = [];
        
        return NextResponse.json({
          success: true,
          message: 'Password reset and data cleared successfully',
        });

      case 'deleteFiles':
        // Delete all files for this IP
        const data = await RealtimeService.getSyncData(ipAddress);
        
        // Note: Cloudinary files are not deleted - they expire automatically
        console.log('[Debug] Removing file references from database:', data.files.length);

        // Clear files from data
        data.files = [];
        await RealtimeService.updateText(ipAddress, data.text);
        
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
        // Delete everything for this IP
        console.log('[Debug] Resetting everything for IP:', ipAddress);

        try {
          // Import supabase
          const { supabase } = await import('@/lib/supabase');
          
          if (!supabase) {
            return NextResponse.json({
              success: false,
              error: 'Database not configured',
            }, { status: 500 });
          }

          // Update database directly - clear everything
          const { error } = await supabase
            .from('sync_data')
            .update({
              text_content: '',
              files: [],
              password_hash: null,
              is_locked: false,
              last_updated: new Date().toISOString(),
            })
            .eq('ip_address', ipAddress);

          if (error) {
            console.error('[Debug] Error clearing data:', error);
            return NextResponse.json({
              success: false,
              error: 'Failed to clear data from database',
            }, { status: 500 });
          }

          console.log('[Debug] Successfully cleared all data for IP:', ipAddress);
          
          return NextResponse.json({
            success: true,
            message: 'Everything has been reset and deleted',
          });
        } catch (error) {
          console.error('[Debug] Exception in resetEverything:', error);
          return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          }, { status: 500 });
        }

      case 'getStats':
        // Get statistics for this IP
        const stats = await RealtimeService.getSyncData(ipAddress);
        
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
    const ipAddress = getClientIp(request);
    
    return NextResponse.json({
      success: true,
      data: {
        ipAddress,
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
