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
  
  // Fallback for development
  return '127.0.0.1';
}

export async function GET(request: NextRequest) {
  try {
    const ipAddress = getClientIp(request);
    const data = await RealtimeService.getSyncData(ipAddress);
    
    const response: ApiResponse<SyncData> = {
      success: true,
      data,
    };
    
    return NextResponse.json(response);
  } catch (error) {
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
    
    let data: SyncData;
    
    if (body.action === 'updateText') {
      data = await RealtimeService.updateText(ipAddress, body.text);
    } else if (body.action === 'addFile') {
      data = await RealtimeService.addFile(ipAddress, body.file);
    } else if (body.action === 'deleteFile') {
      data = await RealtimeService.deleteFile(ipAddress, body.fileId);
    } else if (body.action === 'setPassword') {
      data = await RealtimeService.setPassword(ipAddress, body.passwordHash);
    } else if (body.action === 'removePassword') {
      data = await RealtimeService.removePassword(ipAddress);
    } else if (body.action === 'verifyPassword') {
      const isValid = await RealtimeService.verifyPassword(ipAddress, body.passwordHash);
      return NextResponse.json({ success: true, data: { isValid } });
    } else {
      throw new Error('Invalid action');
    }
    
    const response: ApiResponse<SyncData> = {
      success: true,
      data,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<SyncData> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
