# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for file uploads in LocalSync.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (or create an account)
4. Click "New Project"
5. Fill in:
   - **Name**: localsync (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait ~2 minutes for setup to complete

### Step 2: Create Storage Bucket

1. In your Supabase dashboard, click **Storage** in the left sidebar
2. Click **"New bucket"**
3. Fill in:
   - **Name**: `uploads`
   - **Public bucket**: ✅ Check this box (files need to be publicly accessible)
4. Click **"Create bucket"**

### Step 3: Set Bucket Policies (Important!)

1. Click on the `uploads` bucket you just created
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Choose **"For full customization"**
5. Add these policies:

#### Policy 1: Allow Public Uploads
```sql
-- Policy Name: Allow public uploads
-- Allowed operation: INSERT

CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'uploads');
```

#### Policy 2: Allow Public Downloads
```sql
-- Policy Name: Allow public downloads
-- Allowed operation: SELECT

CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'uploads');
```

#### Policy 3: Allow Public Deletes
```sql
-- Policy Name: Allow public deletes
-- Allowed operation: DELETE

CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'uploads');
```

**Or use the UI:**
1. Click "New Policy"
2. Select "Allow public access" template
3. Choose operations: INSERT, SELECT, DELETE
4. Save

### Step 4: Get Your API Keys

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"**
3. Copy these two values:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)

### Step 5: Add Environment Variables

#### For Local Development:

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Click **"Settings"**
3. Click **"Environment Variables"**
4. Add these two variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project.supabase.co`
   - Environment: Production, Preview, Development (check all)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your anon key (the long string)
   - Environment: Production, Preview, Development (check all)

5. Click **"Save"**
6. **Redeploy** your application for changes to take effect

#### For Netlify Deployment:

1. Go to your Netlify site dashboard
2. Click **"Site settings"**
3. Click **"Environment variables"**
4. Click **"Add a variable"**
5. Add both variables (same as Vercel above)
6. **Redeploy** your site

---

## ✅ Verify Setup

After deploying with environment variables:

1. Go to your deployed app
2. Try uploading a file
3. Check your Supabase Storage dashboard
4. You should see the file in the `uploads` bucket

---

## 🔧 Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure you added both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy after adding environment variables
- Check for typos in variable names

### Error: "Failed to upload file: new row violates row-level security policy"
- You need to add the storage policies (Step 3)
- Make sure the bucket is set to **public**
- Check that all three policies (INSERT, SELECT, DELETE) are enabled

### Error: "Bucket not found"
- Make sure the bucket name is exactly `uploads`
- Check that the bucket was created successfully

### Files upload but don't display
- Verify the bucket is set to **public**
- Check the SELECT policy is enabled
- Try accessing the file URL directly in your browser

---

## 📊 Storage Limits

**Supabase Free Tier:**
- Storage: 1 GB
- Bandwidth: 2 GB/month
- File uploads: Up to 50 MB per file

**For Production:**
- Consider upgrading to Pro plan for more storage
- Monitor usage in Supabase dashboard
- Set up alerts for storage limits

---

## 🔒 Security Notes

1. **Public Bucket**: Files are publicly accessible via URL
2. **No Authentication**: Anyone can upload/delete (by design for LocalSync)
3. **For Production**: Consider adding:
   - File type validation
   - Size limits
   - Rate limiting
   - Virus scanning

---

## 📞 Need Help?

- [Supabase Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Discord](https://discord.supabase.com)
- Check the `/support` page in your app

---

**Setup Time: ~5 minutes** ⚡

Your LocalSync app will now use Supabase Storage for all file uploads! 🎉
