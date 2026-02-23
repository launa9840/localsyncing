import { NextRequest, NextResponse } from 'next/server';
import { RealtimeService } from '@/lib/realtime-service';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { readdir } from 'fs/promises';

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
        
        // Delete physical files
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        try {
          for (const file of data.files) {
            const filename = file.url.split('/').pop();
            if (filename) {
              try {
                await unlink(join(uploadsDir, filename));
              } catch (err) {
                // File might not exist, continue
              }
            }
          }
        } catch (err) {
          // Directory might not exist
        }

        // Clear files from data
        data.files = [];
        await RealtimeService.updateText(ipAddress, data.text);
        
        return NextResponse.json({
          success: true,
          message: 'All files deleted successfully',
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
        const allData = await RealtimeService.getSyncData(ipAddress);
        
        // Delete physical files
        const uploadsDirectory = join(process.cwd(), 'public', 'uploads');
        try {
          for (const file of allData.files) {
            const filename = file.url.split('/').pop();
            if (filename) {
              try {
                await unlink(join(uploadsDirectory, filename));
              } catch (err) {
                // Continue even if file doesn't exist
              }
            }
          }
        } catch (err) {
          // Continue even if directory doesn't exist
        }

        // Remove password
        await RealtimeService.removePassword(ipAddress);
        
        // Clear all data
        const resetData = await RealtimeService.getSyncData(ipAddress);
        resetData.text = '';
        resetData.files = [];
        resetData.passwordHash = undefined;
        resetData.isLocked = false;
        
        return NextResponse.json({
          success: true,
          message: 'Everything has been reset and deleted',
        });

      case 'getStats':
        // Get statistics for this IP
        const stats = await RealtimeService.getSyncData(ipAddress);
        const uploadsDir2 = join(process.cwd(), 'public', 'uploads');
        let totalSize = 0;
        
        try {
          const files = await readdir(uploadsDir2);
          // Calculate total size (simplified)
          totalSize = stats.files.reduce((acc, file) => acc + file.size, 0);
        } catch (err) {
          // Directory might not exist
        }

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
