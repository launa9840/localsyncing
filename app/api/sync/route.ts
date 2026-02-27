import { NextRequest, NextResponse } from 'next/server';
import { RealtimeService } from '@/lib/realtime-service';
import { ApiResponse, SyncData } from '@/types';

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

export async function GET(request: NextRequest) {
  try {
    const ipAddress = getClientIp(request);
    
    console.log('[API] Fetching data for IP:', ipAddress);
    const data = await RealtimeService.getSyncData(ipAddress);
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
    const ipAddress = getClientIp(request);
    const body = await request.json();
    const { action } = body;
    
    console.log('[API] POST action:', action, 'for IP:', ipAddress);
    
    let data: SyncData;
    
    if (action === 'updateText') {
      console.log('[API] Updating text, length:', body.text.length);
      data = await RealtimeService.updateText(ipAddress, body.text);
    } else if (action === 'addFile') {
      console.log('[API] Adding file:', body.file.name);
      data = await RealtimeService.addFile(ipAddress, body.file);
    } else if (action === 'deleteFile') {
      console.log('[API] Deleting file:', body.fileId);
      data = await RealtimeService.deleteFile(ipAddress, body.fileId);
    } else if (action === 'setPassword') {
      console.log('[API] Setting password');
      data = await RealtimeService.setPassword(ipAddress, body.passwordHash);
    } else if (action === 'removePassword') {
      console.log('[API] Removing password');
      data = await RealtimeService.removePassword(ipAddress);
    } else if (action === 'verifyPassword') {
      console.log('[API] Verifying password');
      const isValid = await RealtimeService.verifyPassword(ipAddress, body.passwordHash);
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
