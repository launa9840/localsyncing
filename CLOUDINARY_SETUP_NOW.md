# 🚀 Cloudinary Setup - DO THIS NOW

## ✅ Code Pushed to GitHub

Your code is ready! Now follow these steps to deploy:

---

## STEP 1: Create Cloudinary Account (Free)

Go to: https://cloudinary.com/users/register/free

Sign up with your email (it's free!)

---

## STEP 2: Get Your Cloud Name

1. After logging in, you'll see your dashboard
2. At the top, you'll see **Cloud Name** (e.g., `dxyz123abc`)
3. **Copy this** - you'll need it soon

---

## STEP 3: Create Upload Preset

1. Click **Settings** (gear icon) at the top right
2. Click **Upload** tab in the left sidebar
3. Scroll down to **Upload presets** section
4. Click **Add upload preset** button
5. Fill in:
   - **Preset name**: `localsync_uploads`
   - **Signing Mode**: Select **Unsigned** (IMPORTANT!)
   - **Folder**: `localsync` (optional)
6. Click **Save**
7. **Copy the preset name** (`localsync_uploads`)

---

## STEP 4: Add Variables to Vercel

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Click **Settings** tab
4. Click **Environment Variables** in left sidebar

### Add Variable 1:
- **Key**: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- **Value**: (paste your cloud name from Step 2)
- **Environments**: Check all 3 boxes
- Click **Save**

### Add Variable 2:
- **Key**: `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- **Value**: `localsync_uploads` (or your preset name from Step 3)
- **Environments**: Check all 3 boxes
- Click **Save**

---

## STEP 5: Redeploy on Vercel

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (...)** on the right
4. Click **Redeploy**
5. Confirm by clicking **Redeploy** again
6. Wait 1-2 minutes for build to complete

---

## STEP 6: Test Your App

1. Once deployment shows **Ready** ✅
2. Click **Visit** to open your app
3. Try uploading a file
4. File should upload to Cloudinary
5. Check your Cloudinary dashboard - you'll see the file there!

---

## ✅ What's Fixed

### Vercel Cron Job
- Changed from every 6 hours to once daily
- Now compatible with Vercel Hobby plan
- No more deployment errors!

### File Storage
- Files now upload to Cloudinary (not Supabase)
- Faster delivery via CDN
- Automatic optimization
- 25GB free storage

### Database
- Still using Supabase for sync data
- File URLs stored in database
- 3-day expiration policy active

---

## Troubleshooting

### "Cloudinary configuration missing" Error
- Make sure you added BOTH variables to Vercel
- Check spelling is exact (copy from above)
- Redeploy after adding variables

### Upload Widget Doesn't Open
- Check upload preset is set to **Unsigned**
- Verify cloud name is correct
- Check browser console for errors

### Vercel Deployment Fails
- Check `vercel.json` has `"schedule": "0 0 * * *"`
- This is already fixed in the code
- Just redeploy

---

## Summary

1. ✅ Create Cloudinary account (free)
2. ✅ Get cloud name
3. ✅ Create upload preset (unsigned)
4. ✅ Add 2 variables to Vercel
5. ✅ Redeploy
6. ✅ Test file upload

Your app will be live with Cloudinary in about 5 minutes! 🎉

---

## Need Help?

Check `CLOUDINARY_MIGRATION.md` for detailed documentation.

Your Cloudinary dashboard: https://console.cloudinary.com/
