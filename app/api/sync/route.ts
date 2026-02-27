import { NextRequest, NextResponse } from 'next/server';
import { RealtimeService } from '@/lib/realtime-service';
import { ApiResponse, SyncData } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Get user ID from query parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    console.log('[API] Fetching data for user:', userId);
    const data = await RealtimeService.getSyncData(userId);
    console.log('[API] Data retrieved:', { 
      textLength: data.text.length, 
      filesCount: data.files.length,
      isLocked: data.isLocked 
    });
    
    const response: ApiResponse<SyncData> = {
      success: true,
      data,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('[API] Error fetching data:', error);
    const response: ApiResponse<SyncData> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action } = body;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    console.log('[API] POST action:', action, 'for user:', userId);
    
    let data: SyncData;
    
    if (action === 'updateText') {
      console.log('[API] Updating text, length:', body.text.length);
      data = await RealtimeService.updateText(userId, body.text);
    } else if (action === 'addFile') {
      console.log('[API] Adding file:', body.file.name);
      data = await RealtimeService.addFile(userId, body.file);
    } else if (action === 'deleteFile') {
      console.log('[API] Deleting file:', body.fileId);
      data = await RealtimeService.deleteFile(userId, body.fileId);
    } else if (action === 'setPassword') {
      console.log('[API] Setting password');
      data = await RealtimeService.setPassword(userId, body.passwordHash);
    } else if (action === 'removePassword') {
      console.log('[API] Removing password');
      data = await RealtimeService.removePassword(userId);
    } else if (action === 'verifyPassword') {
      console.log('[API] Verifying password');
      const isValid = await RealtimeService.verifyPassword(userId, body.passwordHash);
      return NextResponse.json({ success: true, data: { isValid } });
    } else {
      throw new Error('Invalid action');
    }
    
    console.log('[API] Action completed successfully');
    const response: ApiResponse<SyncData> = {
      success: true,
      data,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('[API] Error in POST:', error);
    const response: ApiResponse<SyncData> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
