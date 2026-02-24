# Database Migration Guide

## Overview
We've migrated from in-memory storage to Supabase PostgreSQL database for persistent data storage.

## Benefits
- ✅ Data persists across server restarts
- ✅ Supports multiple server instances
- ✅ Better scalability
- ✅ Built-in 3-day expiration with database views
- ✅ Automatic timestamp management

## Migration Steps

### Step 1: Create Database Table

1. Go to your Supabase dashboard: https://bsjtjcfumzxnrlqvefzh.supabase.co
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `supabase-schema.sql`
5. Click **Run** or press `Ctrl+Enter`

You should see: "Success. No rows returned"

### Step 2: Verify Table Creation

1. Go to **Table Editor** in Supabase dashboard
2. You should see a new table called `sync_data`
3. Verify the columns:
   - `id` (uuid)
   - `ip_address` (text)
   - `text_content` (text)
   - `files` (jsonb)
   - `created_at` (timestamptz)
   - `last_updated` (timestamptz)
   - `password_hash` (text)
   - `is_locked` (boolean)

### Step 3: Deploy Updated Code

The code has already been updated in `lib/realtime-service.ts`. Now deploy:

```bash
# Build and test locally
npm run build

# Commit and push
git add .
git commit -m "Migrate to Supabase database for persistent storage"
git push origin main
```

Vercel will automatically deploy the changes.

### Step 4: Test the Migration

After deployment:

1. **Test Text Sync**
   - Type some text in the dashboard
   - Refresh the page
   - Text should persist (it didn't before!)

2. **Test File Upload**
   - Upload a file
   - Refresh the page
   - File should still be there

3. **Test Password Protection**
   - Enable password protection
   - Refresh the page
   - Should still be locked

4. **Test Expiration**
   - Upload a file
   - Check the countdown timer
   - Verify it shows correct time remaining

## What Changed

### Before (In-Memory)
```typescript
const storage = new Map<string, SyncData>();
// Data lost on server restart
```

### After (Database)
```typescript
await supabase
  .from('sync_data')
  .select('*')
  .eq('ip_address', ipAddress)
// Data persists forever (until expired)
```

## Database Schema

### sync_data Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| ip_address | TEXT | Unique identifier per device |
| text_content | TEXT | Synced text content |
| files | JSONB | Array of uploaded files |
| created_at | TIMESTAMPTZ | When record was created |
| last_updated | TIMESTAMPTZ | Auto-updated on changes |
| password_hash | TEXT | SHA-256 password hash |
| is_locked | BOOLEAN | Password protection status |

### active_sync_data View
Automatically filters data older than 3 days:
```sql
SELECT * FROM sync_data 
WHERE created_at > now() - interval '3 days'
```

## Automatic Features

### 1. Auto-Update Timestamp
The `last_updated` column automatically updates whenever you modify a row.

### 2. Expiration Filtering
The code automatically filters expired files on every fetch.

### 3. Cleanup API
The `/api/cleanup` endpoint now:
- Queries all sync_data entries
- Removes expired files from each entry
- Deletes files from Supabase Storage
- Runs automatically every 6 hours via Vercel Cron

## Troubleshooting

### Error: "Supabase is not configured"
- Check environment variables in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Error: "relation 'sync_data' does not exist"
- Run the SQL schema in Supabase SQL Editor
- Verify table was created in Table Editor

### Error: "permission denied for table sync_data"
- Check Row Level Security (RLS) policies
- Ensure the "Allow all operations" policy exists

### Data Not Persisting
- Check Supabase logs in dashboard
- Verify API calls are successful
- Check browser console for errors

## Performance Considerations

### Indexes
We've created indexes on:
- `ip_address` - Fast lookups by IP
- `created_at` - Fast expiration queries

### JSONB for Files
Files are stored as JSONB for:
- Flexible schema
- Fast queries
- Efficient storage

### Connection Pooling
Supabase automatically handles connection pooling, so you don't need to worry about database connections.

## Rollback (If Needed)

If you need to rollback to in-memory storage:

1. Restore the old `lib/realtime-service.ts` from git history
2. Redeploy

```bash
git checkout HEAD~1 -- lib/realtime-service.ts
git commit -m "Rollback to in-memory storage"
git push origin main
```

## Next Steps

- ✅ Monitor Supabase dashboard for usage
- ✅ Set up database backups (automatic in Supabase)
- ✅ Consider adding database indexes if needed
- ✅ Monitor query performance in Supabase logs

## Support

If you encounter issues:
1. Check Supabase logs in dashboard
2. Check Vercel deployment logs
3. Review browser console errors
4. Verify environment variables are set
