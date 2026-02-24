# 3-Day Auto-Delete Policy

## Overview
LocalSync implements a 3-day (72 hours) automatic expiration policy for all uploaded files. This ensures efficient storage management and prevents indefinite data accumulation.

## How It Works

### Timestamp Tracking
- Every file gets a `uploadedAt` timestamp when uploaded
- Text content gets a `createdAt` timestamp when first created
- All timestamps are stored in milliseconds (Unix epoch)

### Expiration Logic
Files are considered expired when:
```
Current Time - Upload Time > 72 hours (259,200,000 milliseconds)
```

### UI Countdown Display
Each file in the dashboard shows a countdown badge with:
- **Green**: More than 24 hours remaining
- **Yellow**: 6-24 hours remaining  
- **Orange**: Less than 6 hours remaining
- **Red**: Expired

Format examples:
- `2d 14h left` - 2 days, 14 hours remaining
- `5h 20m left` - 5 hours, 20 minutes remaining
- `30m left` - 30 minutes remaining
- `Expired` - File has expired

The countdown updates automatically every minute.

### Automatic Filtering
- When fetching sync data, expired files are automatically filtered out
- Users won't see expired files in their file list
- The filtering happens on every data fetch

### Cleanup Process
Expired files are removed from:
1. **In-memory storage** - Filtered automatically on fetch
2. **Supabase Storage** - Deleted via cleanup API

## Cleanup API

### Manual Cleanup
```bash
POST /api/cleanup
```

Triggers immediate cleanup of all expired files across all IPs.

### Automated Cleanup (Recommended)
Set up a cron job to run cleanup automatically:

#### Vercel Cron (Recommended for Vercel deployments)
Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cleanup",
    "schedule": "0 */6 * * *"
  }]
}
```
This runs cleanup every 6 hours.

#### Environment Variable
Set `CRON_SECRET` in your environment variables for security:
```
CRON_SECRET=your-secret-key-here
```

Then call the API with authentication:
```bash
curl -X POST https://your-domain.com/api/cleanup \
  -H "Authorization: Bearer your-secret-key-here"
```

## Implementation Files

### Core Files
- `lib/expiration-utils.ts` - Expiration logic and formatting
- `lib/realtime-service.ts` - Automatic filtering and cleanup methods
- `app/api/cleanup/route.ts` - Cleanup API endpoint
- `components/Dashboard.tsx` - UI countdown display

### Key Functions
- `isExpired(timestamp)` - Check if item is expired
- `getTimeRemaining(timestamp)` - Get milliseconds remaining
- `formatTimeRemaining(timestamp)` - Format as human-readable string
- `getExpirationColor(timestamp)` - Get color class based on time
- `filterExpired(items)` - Filter expired items from array

## Testing

### Test Expiration Locally
1. Upload a file
2. Manually modify the timestamp in storage to be 73 hours old
3. Refresh the page - file should not appear
4. Check countdown colors by modifying timestamps

### Test Cleanup API
```bash
# Check status
curl http://localhost:3000/api/cleanup

# Trigger cleanup
curl -X POST http://localhost:3000/api/cleanup
```

## Production Deployment

### Required Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
CRON_SECRET=your-secret-key (optional, for cron authentication)
```

### Vercel Deployment Steps
1. Push code to GitHub
2. Vercel will auto-deploy
3. Add environment variables in Vercel dashboard
4. Set up Vercel Cron (add vercel.json)
5. Test cleanup endpoint

## Storage Policies

### Supabase Storage Bucket Policies
Ensure your `uploads` bucket has:
- Public read access (for file downloads)
- Authenticated write access (for uploads)
- Service role delete access (for cleanup)

### Alternative: Supabase Storage Lifecycle
You can also set up Supabase Storage lifecycle policies to auto-delete files after 3 days, providing a backup cleanup mechanism.

## Monitoring

### Check Cleanup Status
```bash
GET /api/cleanup
```

Returns:
```json
{
  "success": true,
  "data": {
    "message": "Cleanup endpoint is active",
    "info": "POST to this endpoint to trigger cleanup",
    "expirationPolicy": "3 days (72 hours)"
  }
}
```

### Cleanup Response
```json
{
  "success": true,
  "data": {
    "filesDeleted": 5,
    "supabaseDeleted": 5,
    "message": "Cleaned up 5 expired files (5 from storage)"
  }
}
```

## Future Enhancements
- Add admin dashboard to view expiration statistics
- Email notifications before file expiration
- Configurable expiration time per user
- Bulk download before expiration
- Expiration extension feature
