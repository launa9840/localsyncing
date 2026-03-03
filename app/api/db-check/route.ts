import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getClientIp } from '@/lib/ip-utils';

export async function GET(request: NextRequest) {
  try {
    const ipAddress = getClientIp(request);
    
    if (!supabase) {
      return NextResponse.json({
        success: false,
        error: 'Supabase not configured',
      });
    }

    // Get all rows from sync_data table
    const { data: allRows, error: allError } = await supabase
      .from('sync_data')
      .select('*');

    // Get row for current IP
    const { data: currentRow, error: currentError } = await supabase
      .from('sync_data')
      .select('*')
      .eq('ip_address', ipAddress)
      .single();

    return NextResponse.json({
      success: true,
      currentIp: ipAddress,
      currentRow: currentRow || null,
      currentError: currentError?.message || null,
      allRows: allRows || [],
      allError: allError?.message || null,
      totalRows: allRows?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
