# 📦 Storage & Expiration Explained

## How Your 3-Day Expiration Works

### Two Storage Locations

**1. Cloudinary (File Storage)**
- Stores the actual files (images, videos, documents)
- Files stay until you delete them
- Uses your storage quota (25GB free)

**2. Supabase (Database)**
- Stores file metadata (URL, name, size, upload date)
- Stores text content
- Stores user settings

### Current Expiration Flow

```
Day 0: User uploads file
  ↓
  File → Cloudinary (stays forever)
  URL → Supabase database (with timestamp)
  ↓
Day 1-2: File visible in app
  ↓
Day 3: Cron job runs
  ↓
  Database removes file reference
  File disappears from app UI
  ↓
  BUT: File still in Cloudinary! ⚠️
```

## The Problem

**Files accumulate in Cloudinary:**
- Users can't see them (removed from database)
- Still using your storage quota
- Need manual cleanup

## The Solution (Now Implemented)

### 1. Files Are Now Tagged ✅

Every upload gets these tags:
- `localsync` - Identifies your app's files
- `expires_3days` - Marks for deletion
- Stored in `localsync` folder

### 2. Easy Cleanup

**Option A: Manual (Free Plan)**
1. Go to Cloudinary dashboard monthly
2. Filter by tag: `expires_3days`
3. Delete files older than 3 days
4. Takes 5 minutes

**Option B: Automated Script**
1. Create cleanup script (see `CLOUDINARY_AUTO_DELETE_SETUP.md`)
2. Run weekly/monthly
3. Auto-deletes old files

**Option C: Paid Plan**
1. Upgrade Cloudinary
2. Set up auto-delete rules
3. Fully automated

## What Happens Now

### When User Uploads File

```javascript
1. File uploads to Cloudinary
   - Tagged: localsync, expires_3days
   - Stored in: localsync folder
   - Returns: secure_url

2. App saves to database
   - URL: https://res.cloudinary.com/...
   - Name: document.pdf
   - Size: 1024000
   - uploadedAt: 1234567890
```

### After 3 Days

```javascript
1. Daily cron job runs (midnight)
   - Checks database for files > 3 days old
   - Removes file references from database
   - File disappears from app UI

2. File still in Cloudinary
   - Still using storage
   - Tagged with expires_3days
   - Ready for manual/automated cleanup
```

## Storage Usage

### Cloudinary Free Plan
- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month

### Typical Usage
- **Text file**: ~1 KB
- **Image**: 100 KB - 5 MB
- **Video**: 10 MB - 100 MB
- **Document**: 100 KB - 10 MB

### Example Capacity
With 25 GB storage:
- ~250,000 text files
- ~5,000 - 250,000 images
- ~250 - 2,500 videos
- ~2,500 - 250,000 documents

## Recommendations

### For Light Usage (< 100 files/day)
- Manual cleanup monthly
- Monitor storage in Cloudinary dashboard
- Free plan is sufficient

### For Medium Usage (100-1000 files/day)
- Set up automated cleanup script
- Run weekly
- Consider paid plan if approaching limits

### For Heavy Usage (> 1000 files/day)
- Upgrade to paid Cloudinary plan
- Set up auto-delete rules
- Monitor usage daily

## Monitoring Storage

### Check Cloudinary Usage
1. Go to: https://console.cloudinary.com/
2. Dashboard shows:
   - Storage used
   - Bandwidth used
   - Transformations used
3. Set up alerts when approaching limits

### Check Database Usage
1. Go to Supabase dashboard
2. Database size shown in settings
3. Free plan: 500 MB database

## Cost Optimization

### Keep Costs Low
1. **Regular Cleanup**
   - Delete old Cloudinary files monthly
   - Keeps storage under free limit

2. **Optimize Uploads**
   - Compress images before upload
   - Limit file sizes (current: 100MB max)
   - Use appropriate formats

3. **Monitor Usage**
   - Check Cloudinary dashboard weekly
   - Set up usage alerts
   - Track trends

## Summary

### Current Setup ✅
- Files upload to Cloudinary with expiration tags
- Database tracks files with timestamps
- Cron job removes old references daily
- Files organized in `localsync` folder

### What You Need to Do 🔴
- Manually delete old Cloudinary files periodically, OR
- Set up automated cleanup script

### Storage Locations
- **Cloudinary**: Actual files (need manual cleanup)
- **Supabase**: File metadata (auto-cleanup working)

### Expiration Timeline
- **Day 0-3**: File visible in app
- **Day 3+**: File hidden from app (database cleanup)
- **Manual**: Delete from Cloudinary when convenient

Your files are now properly tagged for easy cleanup! Check `CLOUDINARY_AUTO_DELETE_SETUP.md` for detailed cleanup instructions. 🎉
