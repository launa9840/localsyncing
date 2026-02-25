# 🗑️ Cloudinary Auto-Delete Setup

## The Problem

Currently:
- ✅ Your app removes file references from database after 3 days
- ❌ Files stay in Cloudinary forever (using your storage quota)
- ⚠️ You're storing files that users can't access

## The Solution

Set up Cloudinary to automatically delete files after 3 days using tags.

## How It Works Now

### 1. Files Are Tagged on Upload
Your code now tags all uploads with:
- `localsync` - Identifies files from your app
- `expires_3days` - Marks for 3-day expiration
- Stored in `localsync` folder for organization

### 2. Two-Part Expiration System

**Part 1: Database Cleanup (Already Working)**
- Cron job runs daily at midnight
- Removes file references older than 3 days from database
- Files disappear from your app UI

**Part 2: Cloudinary Cleanup (You Need to Set Up)**
- Cloudinary auto-deletes files with `expires_3days` tag
- Frees up your storage quota
- Keeps costs down

## Set Up Cloudinary Auto-Delete

### Option 1: Manual Cleanup Script (Recommended for Free Plan)

Since Cloudinary's free plan doesn't have auto-delete, you can manually delete old files periodically.

#### Using Cloudinary Dashboard:
1. Go to: https://console.cloudinary.com/
2. Click **Media Library**
3. Filter by tag: `expires_3days`
4. Sort by upload date
5. Select files older than 3 days
6. Click **Delete**

#### Using Cloudinary API (Advanced):
You can create a script to auto-delete files. Here's how:

1. Get your API credentials from Cloudinary dashboard
2. Create a cleanup script (Node.js example):

```javascript
// cleanup-cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
});

async function deleteOldFiles() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
  try {
    // Get files with expires_3days tag
    const result = await cloudinary.api.resources_by_tag('expires_3days', {
      type: 'upload',
      max_results: 500
    });
    
    const filesToDelete = result.resources.filter(file => {
      const uploadDate = new Date(file.created_at);
      return uploadDate < threeDaysAgo;
    });
    
    console.log(`Found ${filesToDelete.length} files to delete`);
    
    for (const file of filesToDelete) {
      await cloudinary.uploader.destroy(file.public_id);
      console.log(`Deleted: ${file.public_id}`);
    }
    
    console.log('Cleanup complete!');
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

deleteOldFiles();
```

3. Run this script weekly or monthly to clean up old files

### Option 2: Cloudinary Add-ons (Paid Plans)

If you upgrade to a paid Cloudinary plan, you can use:

1. **Auto-Upload with Expiration**
   - Set TTL (Time To Live) on uploads
   - Files auto-delete after specified time

2. **Scheduled Tasks**
   - Create automated cleanup tasks
   - Run on schedule

## Current Code Changes

### What I Updated

**File**: `components/CloudinaryUpload.tsx`

Added these options to upload:
```javascript
tags: ['localsync', 'expires_3days'], // Tag for identification
folder: 'localsync', // Organize in folder
```

### Benefits

1. **Easy Identification**
   - All your app's files tagged with `localsync`
   - Easy to find in Cloudinary dashboard

2. **Expiration Tracking**
   - `expires_3days` tag marks files for deletion
   - Can filter and delete in bulk

3. **Organization**
   - Files stored in `localsync` folder
   - Separate from other Cloudinary assets

## Verification

### Check Tags Are Working

1. Upload a file in your app
2. Go to Cloudinary dashboard → Media Library
3. Find the uploaded file
4. Check it has tags: `localsync`, `expires_3days`
5. Check it's in `localsync` folder

## Storage Management

### Free Plan Limits
- 25 GB storage
- 25 GB bandwidth/month
- No auto-delete features

### Recommendations

**For Free Plan:**
1. Manually delete old files monthly
2. Monitor storage usage in dashboard
3. Set up alerts when approaching limit

**For Paid Plan:**
1. Set up auto-delete rules
2. Configure lifecycle policies
3. Automated cleanup

## Alternative: Use Cloudinary Transformations

You can also use Cloudinary's transformation URLs with expiration:

```javascript
// Generate URL with expiration
const expiringUrl = cloudinary.url(publicId, {
  sign_url: true,
  type: 'authenticated',
  expires_at: Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60) // 3 days
});
```

This requires:
- Authenticated delivery type
- Signed URLs
- More complex setup

## Summary

### What's Implemented ✅
- Files tagged with `localsync` and `expires_3days`
- Files organized in `localsync` folder
- Database cleanup removes references after 3 days

### What You Need to Do 🔴
- Manually delete old files from Cloudinary periodically, OR
- Set up automated cleanup script, OR
- Upgrade to paid plan for auto-delete features

### Current Behavior
1. User uploads file → Stored in Cloudinary with tags
2. File URL saved to database
3. After 3 days → Database removes reference (file disappears from app)
4. File still in Cloudinary → You need to delete manually or with script

## Recommended Approach

**For now (Free Plan):**
1. Monitor Cloudinary storage usage
2. Manually delete files with `expires_3days` tag monthly
3. Set calendar reminder to clean up

**Future (If Needed):**
1. Create automated cleanup script
2. Run as cron job or GitHub Action
3. Or upgrade to paid Cloudinary plan

Your app now tags files correctly for easy cleanup! 🎉
