# 🚀 Quick Setup Guide - Get Running in 5 Minutes

## Current Status
✅ Code is gracefully handling missing Supabase config
✅ No more crashes with "Supabase is not configured" errors
✅ App will run with default empty data until you set up Supabase

## Step 1: Create .env.local File (1 minute)

Create a file named `.env.local` in the `localsync` folder with this content:

```env
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Cloudinary (File Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset-here
```

## Step 2: Set Up Supabase Database (2 minutes)

### A. Create Supabase Project
1. Go to: https://supabase.com/dashboard
2. Click **New Project**
3. Fill in:
   - Name: `localsync`
   - Database Password: (save this!)
   - Region: Choose closest to you
4. Click **Create new project**
5. Wait 1-2 minutes for setup

### B. Get Your Credentials
1. Go to **Settings** → **API**
2. Copy **Project URL** → Paste into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon public** key → Paste into `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### C. Create Database Table
1. Go to **SQL Editor** in left sidebar
2. Click **New Query**
3. Copy the entire contents of `SUPABASE_SCHEMA_SETUP.sql`
4. Paste into the editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

### D. Verify Table Created
1. Go to **Table Editor** in left sidebar
2. You should see `sync_data` table
3. Click on it to see the columns

## Step 3: Set Up Cloudinary (2 minutes)

### A. Create Cloudinary Account
1. Go to: https://cloudinary.com/users/register/free
2. Sign up (it's free!)

### B. Get Cloud Name
1. After login, you'll see your dashboard
2. At the top, copy your **Cloud Name** (e.g., `dxyz123abc`)
3. Paste into `.env.local` as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

### C. Create Upload Preset
1. Click **Settings** (gear icon) → **Upload** tab
2. Scroll to **Upload presets** section
3. Click **Add upload preset**
4. Set:
   - **Preset name**: `localsync_uploads`
   - **Signing Mode**: **Unsigned** (IMPORTANT!)
   - **Folder**: `localsync` (optional)
5. Click **Save**
6. Copy the preset name (`localsync_uploads`)
7. Paste into `.env.local` as `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

## Step 4: Run Your App! (30 seconds)

```bash
npm run dev
```

Open: http://localhost:3000

## ✅ What Should Work Now

- ✅ App loads without errors
- ✅ You can type text (saves to Supabase)
- ✅ You can upload files (saves to Cloudinary)
- ✅ Files show with countdown timers
- ✅ Data persists on refresh
- ✅ Password protection works
- ✅ 3-day expiration policy active

## 🔧 Troubleshooting

### "Cloudinary configuration missing"
- Check `.env.local` has both Cloudinary variables
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Text/Files Don't Save
- Check Supabase credentials are correct
- Verify `sync_data` table exists in Supabase
- Check browser console for errors

### Upload Widget Doesn't Open
- Verify upload preset is set to **Unsigned**
- Check cloud name is correct
- Restart dev server

### Still Getting Errors?
- Delete `.next` folder: `rm -rf .next` (or `Remove-Item -Recurse -Force .next` on Windows)
- Run `npm run dev` again

## 📝 Your .env.local Should Look Like This

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123abc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=localsync_uploads
```

## 🎉 You're Done!

Your LocalSync app is now running with:
- Supabase for database (sync data)
- Cloudinary for file storage (CDN)
- 3-day auto-expiration
- Password protection
- Real-time sync

Enjoy! 🚀
