# 🔑 Cloudinary API Credentials Setup

## Quick Setup Guide

You need to add Cloudinary API credentials to enable file deletion.

---

## Step 1: Get Your API Credentials

1. Go to: **https://console.cloudinary.com/**
2. Log in to your account
3. Click on **"Dashboard"** (top left)
4. Scroll down to find **"API Keys"** section
5. You'll see:
   - **Cloud Name**: (you already have this)
   - **API Key**: Copy this number
   - **API Secret**: Click "Reveal" and copy

---

## Step 2: Add to Local Environment

Open your `.env.local` file and add:

```bash
# Cloudinary Server-Side Credentials (for file deletion)
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

Replace with your actual values from Step 1.

---

## Step 3: Add to Vercel (Production)

1. Go to: **https://vercel.com/dashboard**
2. Select your project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in sidebar
5. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `CLOUDINARY_API_KEY` | Your API Key | Production, Preview, Development |
| `CLOUDINARY_API_SECRET` | Your API Secret | Production, Preview, Development |

6. Click **"Save"**

---

## Step 4: Restart/Redeploy

### Local:
```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

### Vercel:
- Vercel will automatically redeploy when you save environment variables
- Or push a new commit to trigger deployment

---

## Step 5: Test

1. Upload a file
2. Click the delete button
3. Check console logs for "Cloudinary deletion successful"
4. Verify file is gone from Cloudinary dashboard

---

## Security Notes

⚠️ **NEVER commit these credentials to Git**
- They are in `.env.local` (already in `.gitignore`)
- Only add them to Vercel dashboard
- Never share them publicly

✅ **These credentials are server-side only**
- They never get sent to the browser
- Only used in `/api/delete-file` route
- Safe to use in production

---

## Troubleshooting

### "Cloudinary not configured on server"
- Double-check variable names (exact spelling)
- Restart dev server
- Check `.env.local` file exists

### "Invalid API credentials"
- Verify you copied the correct values
- Check for extra spaces or quotes
- Regenerate credentials in Cloudinary dashboard

### Still not working?
- Check browser console for errors
- Check server logs (terminal)
- Verify Cloudinary account is active
- Ensure API key has delete permissions

---

## What These Credentials Do

- **API Key**: Identifies your Cloudinary account
- **API Secret**: Authenticates server-side operations
- **Together**: Allow secure file deletion via API

Without these, files can be uploaded but not deleted from Cloudinary.

---

## Complete .env.local Example

```bash
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Cloudinary (File Storage) - Frontend
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset

# Cloudinary (File Storage) - Backend
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456

# Optional: Cron Job Security
CRON_SECRET=your-random-secret
```

---

## Ready to Deploy?

Once you've added the credentials:

1. ✅ Test locally (upload + delete)
2. ✅ Add to Vercel dashboard
3. ✅ Push to GitHub
4. ✅ Test on live site
5. ✅ Verify in Cloudinary dashboard

You're all set! Files will now be completely deleted from both systems.
