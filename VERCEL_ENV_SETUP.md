# 🔧 Vercel Environment Variables Setup

## The Problem

You're seeing "Cloudinary Not Configured" error on the live site because environment variables are missing in Vercel.

## Exact Variable Names Required

The code looks for these EXACT variable names (case-sensitive):

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

⚠️ **IMPORTANT**: They MUST start with `NEXT_PUBLIC_` to work in the browser!

## Step-by-Step Fix

### 1. Go to Vercel Dashboard
https://vercel.com/dashboard

### 2. Select Your Project
Click on your `localsyncing` project

### 3. Go to Settings → Environment Variables
- Click **Settings** tab at top
- Click **Environment Variables** in left sidebar

### 4. Add Variable 1: Cloud Name

Click **Add New** button:

```
Key (copy exactly):
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

Value:
[Your Cloudinary cloud name - e.g., dxyz123abc]

Environments:
✅ Production
✅ Preview
✅ Development
```

Click **Save**

### 5. Add Variable 2: Upload Preset

Click **Add New** button again:

```
Key (copy exactly):
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

Value:
[Your upload preset name - e.g., localsync_uploads]

Environments:
✅ Production
✅ Preview
✅ Development
```

Click **Save**

### 6. Verify Variables Are Added

You should now see both variables listed:
- ✅ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- ✅ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

### 7. Redeploy

**Option A: Trigger Redeploy from Vercel**
1. Go to **Deployments** tab
2. Click three dots (...) on latest deployment
3. Click **Redeploy**
4. Wait 1-2 minutes

**Option B: Push a Small Change**
```bash
# Make any small change and push
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```

## How to Get Your Cloudinary Values

### Cloud Name
1. Go to: https://console.cloudinary.com/
2. Log in
3. You'll see your **Cloud Name** at the top of the dashboard
4. Copy it (e.g., `dxyz123abc`)

### Upload Preset
1. In Cloudinary dashboard, click **Settings** (gear icon)
2. Click **Upload** tab
3. Scroll to **Upload presets** section
4. If you don't have one:
   - Click **Add upload preset**
   - Name: `localsync_uploads`
   - Signing Mode: **Unsigned** (IMPORTANT!)
   - Click **Save**
5. Copy the preset name

## Verification

### After Redeployment

1. **Check Browser Console** (F12)
   - In development, you'll see:
   ```
   [Cloudinary Config Check] {
     cloudName: '✅ Set',
     uploadPreset: '✅ Set'
   }
   ```

2. **Check UI**
   - Error message should be gone
   - Upload button should work
   - Clicking upload opens Cloudinary widget

3. **Test Upload**
   - Click "Upload File" button
   - Widget should open
   - Upload a file
   - File should appear in your list

## Common Mistakes

### ❌ Wrong Variable Names
```
CLOUDINARY_CLOUD_NAME          ❌ Missing NEXT_PUBLIC_
NEXT_PUBLIC_CLOUD_NAME         ❌ Wrong name
next_public_cloudinary_cloud_name  ❌ Wrong case
```

### ✅ Correct Variable Names
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME     ✅ Correct!
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET  ✅ Correct!
```

### ❌ Not Checking All Environments
Make sure you check ALL THREE boxes:
- ✅ Production
- ✅ Preview
- ✅ Development

### ❌ Not Redeploying
After adding variables, you MUST redeploy for changes to take effect!

## Troubleshooting

### Still Seeing Error After Redeploy?

1. **Hard Refresh Browser**
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

2. **Check Vercel Logs**
   - Go to Deployments → Click latest → View Function Logs
   - Look for errors

3. **Verify Variables in Vercel**
   - Settings → Environment Variables
   - Both variables should be listed
   - Click on each to verify the value is correct

4. **Check Variable Values**
   - Cloud Name should NOT have spaces or special characters
   - Upload Preset should match exactly what's in Cloudinary

### Error: "Upload preset must be unsigned"

Your upload preset in Cloudinary is set to "Signed". Fix:
1. Go to Cloudinary → Settings → Upload
2. Find your preset
3. Change **Signing Mode** to **Unsigned**
4. Save

## Current Cron Configuration ✅

Your `vercel.json` is correctly configured:
```json
{
  "crons": [{
    "path": "/api/cleanup",
    "schedule": "0 0 * * *"
  }]
}
```

This runs once daily at midnight (Hobby plan compatible). ✅

## Summary

1. ✅ Variable names are correct in code
2. ✅ Cron config is Hobby plan compatible
3. ✅ Error message now shows which variables are missing
4. ✅ Development logging added
5. 🔴 **YOU NEED TO**: Add variables to Vercel and redeploy

Follow the steps above and your Cloudinary upload will work! 🚀
