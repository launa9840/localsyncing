import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    cloudinaryName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    cloudinaryPreset: !!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    cloudinaryApiKey: !!process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    // Show partial values for debugging (not full secrets)
    supabaseUrlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
    cloudinaryNameValue: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  };

  return NextResponse.json({
    success: true,
    environment: envCheck,
    allConfigured: Object.values(envCheck).every(v => v === true || typeof v === 'string'),
  });
}
