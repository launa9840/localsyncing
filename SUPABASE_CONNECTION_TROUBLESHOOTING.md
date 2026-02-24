# 🔧 Supabase Connection Troubleshooting Guide

## 🎯 Let's Get You Connected!

Follow these steps carefully to connect your LocalSync project to Supabase.

---

## Step 1: Get Your Supabase Credentials

### 1.1 Go to Supabase Dashboard
1. Open [app.supabase.com](https://app.supabase.com)
2. Sign in to your account
3. Select your project (or create a new one)

### 1.2 Get Your API Keys
1. Click on **Settings** (gear icon) in the left sidebar
2. Click on **API** in the settings menu
3. You'll see two important values:

   **Copy these:**
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long string)

   ⚠️ **Important**: Use the **anon public** key, NOT the service_role key!

---

## Step 2: Create Storage Bucket

### 2.1 Create the Bucket
1. In Supabase dashboard, click **Storage** in the left sidebar
2. Click **"New bucket"** button
3. Fill in:
   - **Name**: `uploads` (must be exactly this, lowercase)
   - **Public bucket**: ✅ **CHECK THIS BOX** (very important!)
4. Click **"Create bucket"**

### 2.2 Set Storage Policies
1. Click on the `uploads` bucket you just created
2. Click the **"Policies"** tab
3. Click **"New Policy"** button
4. Select **"For full customization"**

**Add these 3 policies:**

#### Policy 1: Allow Public Uploads
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'uploads');
```

#### Policy 2: Allow Public Downloads
```sql
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'uploads');
```

#### Policy 3: Allow Public Deletes
```sql
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'uploads');
```

**Or use the simple way:**
1. Click "New Policy"
2. Choose "Allow public access" template
3. Select all operations: INSERT, SELECT, DELETE
4. Click "Save"

---

## Step 3: Configure Your Project

### Option A: Local Development

Create a file named `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-key-here
```

**Replace with your actual values!**

### Option B: Vercel Deployment

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **"Settings"**
4. Click **"Environment Variables"**
5. Add these two variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co`
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your anon key (the long string)
   - Environments: ✅ Production ✅ Preview ✅ Development

6. Click **"Save"**
7. **Redeploy** your application

---

## Step 4: Test the Connection

### 4.1 Local Testing
```bash
# In your project directory
npm run dev
```

Open http://localhost:3000 and try uploading a file.

### 4.2 Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any error messages
4. Common errors and solutions below

---

## 🆘 Common Issues & Solutions

### Issue 1: "Supabase is not configured"

**Cause**: Environment variables not set

**Solution**:
- Check `.env.local` file exists and has correct values
- Restart your dev server: `npm run dev`
- For Vercel: Check environment variables are set and redeploy

### Issue 2: "Failed to upload file: new row violates row-level security policy"

**Cause**: Storage policies not configured

**Solution**:
1. Go to Supabase → Storage → uploads bucket
2. Click "Policies" tab
3. Make sure you have all 3 policies (INSERT, SELECT, DELETE)
4. Verify bucket is set to **public**

### Issue 3: "Bucket not found"

**Cause**: Bucket name mismatch

**Solution**:
- Bucket must be named exactly `uploads` (lowercase)
- Check in Supabase → Storage
- If named differently, either:
  - Rename bucket to `uploads`, OR
  - Update code in `lib/supabase.ts` to match your bucket name

### Issue 4: Files upload but don't display

**Cause**: Bucket not public or SELECT policy missing

**Solution**:
1. Go to bucket settings
2. Make sure "Public bucket" is checked
3. Add SELECT policy (see Step 2.2 above)

### Issue 5: "Invalid API key"

**Cause**: Wrong key or typo

**Solution**:
- Make sure you're using the **anon public** key
- NOT the service_role key
- Check for typos or extra spaces
- Copy the key again from Supabase dashboard

### Issue 6: CORS errors

**Cause**: Supabase project not configured for your domain

**Solution**:
- This usually works automatically
- If issues persist, check Supabase → Settings → API → CORS

---

## 🧪 Quick Connection Test

Run this test to verify your connection:

### Test 1: Check Environment Variables

Create a test file `test-supabase.js`:

```javascript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log('Key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
```

Run: `node test-supabase.js`

**Expected output:**
```
Supabase URL: https://xxxxx.supabase.co
Supabase Key exists: true
Key length: 200+ characters
```

### Test 2: Upload a Test File

1. Start your app: `npm run dev`
2. Open http://localhost:3000
3. Try uploading a small image
4. Check browser console for errors
5. Check Supabase dashboard → Storage → uploads
6. File should appear there

---

## 📋 Verification Checklist

Before asking for help, verify:

- [ ] Supabase project created
- [ ] Storage bucket named `uploads` created
- [ ] Bucket is set to **public**
- [ ] All 3 storage policies added (INSERT, SELECT, DELETE)
- [ ] Copied Project URL from Supabase
- [ ] Copied anon public key (not service_role)
- [ ] Added to `.env.local` (local) or Vercel (production)
- [ ] Restarted dev server / redeployed
- [ ] No typos in environment variable names
- [ ] Values don't have quotes in .env.local

---

## 🎯 Still Having Issues?

### Share This Information:

1. **What error message do you see?**
   - Check browser console (F12)
   - Check terminal/command prompt
   - Take a screenshot

2. **Where are you testing?**
   - Local development (npm run dev)
   - Vercel deployment
   - Both

3. **What have you tried?**
   - Created bucket?
   - Added policies?
   - Set environment variables?

4. **Verification:**
   - Bucket name: _____
   - Environment variables set: Yes/No
   - Policies added: Yes/No

---

## 📞 Quick Help Commands

```bash
# Check if .env.local exists
ls -la .env.local

# Restart dev server
npm run dev

# Check Supabase package installed
npm list @supabase/supabase-js

# Reinstall if needed
npm install @supabase/supabase-js
```

---

## ✅ Success Indicators

You'll know it's working when:

✅ No errors in browser console  
✅ File uploads successfully  
✅ File appears in Supabase Storage dashboard  
✅ File can be downloaded  
✅ File can be deleted  

---

**Need more help? Share the specific error message you're seeing!**
