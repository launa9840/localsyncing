# 🚀 Supabase Storage - Quick Reference

## Environment Variables Needed

Add these to your deployment platform (Vercel/Netlify):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-long-key-here
```

---

## Where to Get These Values

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Vercel Setup (30 seconds)

1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Add both variables
4. Check all environments (Production, Preview, Development)
5. **Redeploy** your app

---

## Netlify Setup (30 seconds)

1. Go to your Netlify site
2. **Site settings** → **Environment variables**
3. Add both variables
4. **Redeploy** your site

---

## Create Storage Bucket

1. In Supabase dashboard: **Storage** → **New bucket**
2. Name: `uploads`
3. ✅ Check **Public bucket**
4. Click **Create bucket**

---

## Set Bucket Policies

Click on `uploads` bucket → **Policies** → **New Policy**

Use this template:
- Select: **"Allow public access"**
- Operations: INSERT, SELECT, DELETE
- Save

Or add manually:

```sql
-- Allow uploads
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'uploads');

-- Allow downloads
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'uploads');

-- Allow deletes
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'uploads');
```

---

## ✅ Test It

1. Deploy with environment variables
2. Upload a file in your app
3. Check Supabase Storage dashboard
4. File should appear in `uploads` bucket

---

## 🆘 Troubleshooting

**"Supabase is not configured"**
- Add environment variables
- Redeploy

**"Row-level security policy"**
- Add storage policies (see above)
- Make bucket public

**Files don't display**
- Check bucket is public
- Verify SELECT policy is enabled

---

**Setup Time: 2 minutes** ⚡

For detailed guide, see `SUPABASE_SETUP.md`
