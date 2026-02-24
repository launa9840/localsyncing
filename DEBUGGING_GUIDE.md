# Debugging Guide - Database Operations

## ✅ Logging Added

I've added comprehensive console logging to help you see exactly what's happening with your database operations.

## How the Data Flow Works

Your app uses this architecture:

```
Frontend (Dashboard.tsx)
    ↓
API Routes (/api/sync, /api/upload)
    ↓
RealtimeService (lib/realtime-service.ts)
    ↓
Supabase Database (sync_data table)
```

## Where to See the Logs

### Production (Vercel)
1. Go to https://vercel.com/dashboard
2. Click your project
3. Click **Logs** tab
4. You'll see all console.log output in real-time

### Local Development
Open your terminal where you run `npm run dev` - all logs appear there.

## What the Logs Show

### When Fetching Data (GET /api/sync)
```
[API] Fetching data for IP: 192.168.1.100
[RealtimeService] Fetching data for IP: 192.168.1.100
[RealtimeService] Found existing data: { textLength: 50, filesCount: 2 }
[API] Data retrieved: { textLength: 50, filesCount: 2, isLocked: false }
```

### When Uploading Text
```
[API] POST action: updateText for IP: 192.168.1.100
[API] Updating text, length: 50
[API] Action completed successfully
```

### When Uploading File
```
[API] POST action: addFile for IP: 192.168.1.100
[API] Adding file: document.pdf
[RealtimeService] Adding file: document.pdf for IP: 192.168.1.100
[RealtimeService] File added successfully, total files: 3
[API] Action completed successfully
```

### When Creating New Entry (First Time)
```
[RealtimeService] No data found, creating default entry
[RealtimeService] Created new entry
```

## How to Check if Data is in Database

### Method 1: Supabase Dashboard
1. Go to https://bsjtjcfumzxnrlqvefzh.supabase.co
2. Click **Table Editor**
3. Click **sync_data** table
4. You should see rows with:
   - `ip_address` - Your device IP
   - `text_content` - Your synced text
   - `files` - JSON array of uploaded files
   - `created_at` - When created
   - `last_updated` - Last modification time

### Method 2: Check Vercel Logs
1. Upload a file or type text
2. Go to Vercel → Logs
3. Look for `[RealtimeService] File added successfully` or similar
4. If you see errors, they'll show up here

### Method 3: Browser Console
Open browser DevTools (F12) → Console tab
- Network errors will show here
- API responses will be visible

## Common Issues and Solutions

### Issue: "Supabase is not configured"
**Solution:** Check environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: No data appearing in table
**Possible causes:**
1. Environment variables not set in Vercel
2. RLS policy not created (run the SQL schema)
3. Different IP addresses (each IP has separate data)

**Check logs for:**
```
[RealtimeService] Error creating sync data: ...
[API] Error in POST: ...
```

### Issue: Files upload but don't show
**Check:**
1. Vercel logs for `[RealtimeService] File added successfully`
2. Supabase table - check the `files` column (should be JSON array)
3. Browser console for errors

### Issue: Data not persisting
**Check:**
1. Is the `sync_data` table created?
2. Are RLS policies set up?
3. Check Vercel logs for database errors

## Testing Checklist

After deployment, test these scenarios:

### 1. Text Sync
- [ ] Type text in textarea
- [ ] Check Vercel logs for `[API] Updating text`
- [ ] Refresh page - text should persist
- [ ] Check Supabase table - `text_content` should be updated

### 2. File Upload
- [ ] Upload a file
- [ ] Check Vercel logs for `[RealtimeService] File added successfully`
- [ ] File should appear in list
- [ ] Refresh page - file should still be there
- [ ] Check Supabase table - `files` column should have JSON array

### 3. Multiple Devices
- [ ] Open app on two devices
- [ ] Each device should have separate data (different IPs)
- [ ] Check Supabase table - should see multiple rows

## Vercel Logs Quick Access

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# View logs in terminal
vercel logs
```

Or use the web dashboard: https://vercel.com/[your-username]/localsyncing/logs

## Next Steps

1. **Wait for deployment** (1-2 minutes)
2. **Open Vercel logs** in a separate tab
3. **Use your app** (type text, upload file)
4. **Watch the logs** in real-time
5. **Check Supabase table** to verify data is saved

If you see any errors in the logs, copy them and I can help you fix them!

## Summary

The data IS being saved to the database through the API routes. The logging will help you:
- ✅ See exactly when data is saved
- ✅ Identify any errors immediately
- ✅ Verify the database operations are working
- ✅ Debug any issues that come up

Check the Vercel logs after deployment to see everything working! 🎉
