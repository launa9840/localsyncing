# ⚡ Quick Start: Enable Cloudinary File Deletion

## What This Does
When you delete a file from your website, it will now be **permanently removed from Cloudinary** (not just the database).

---

## 🚀 Setup (5 Minutes)

### Step 1: Get Your Cloudinary API Credentials

1. Open: **https://console.cloudinary.com/**
2. Log in
3. Go to **Dashboard**
4. Find **"API Keys"** section
5. Copy these two values:
   - **API Key** (a number like `123456789012345`)
   - **API Secret** (click "Reveal" to see it)

---

### Step 2: Add to Local Development

Open `.env.local` and add:

```bash
CLOUDINARY_API_KEY=paste-your-api-key-here
CLOUDINARY_API_SECRET=paste-your-api-secret-here
```

Save the file and restart your dev server:
```bash
npm run dev
```

---

### Step 3: Add to Vercel (Production)

1. Go to: **https://vercel.com/dashboard**
2. Select your project
3. Go to: **Settings → Environment Variables**
4. Add two new variables:

**Variable 1:**
- Name: `CLOUDINARY_API_KEY`
- Value: (paste your API key)
- Environment: All (Production, Preview, Development)

**Variable 2:**
- Name: `CLOUDINARY_API_SECRET`
- Value: (paste your API secret)
- Environment: All (Production, Preview, Development)

5. Click **Save**

Vercel will automatically redeploy your app.

---

### Step 4: Test It

1. Go to your website
2. Upload a file
3. Click the delete button
4. Check your browser console - you should see:
   ```
   [Dashboard] Cloudinary deletion successful
   ```
5. Go to Cloudinary dashboard - file should be gone ✅

---

## ✅ That's It!

Your files will now be completely deleted from both Cloudinary and your database.

---

## 🔒 Security Notes

- These credentials are **server-side only**
- They **never** get sent to the browser
- Safe to use in production
- Never commit them to Git (already in `.gitignore`)

---

## 📚 More Information

- **Full Documentation**: See `CLOUDINARY_DELETE_COMPLETE.md`
- **Detailed Setup**: See `CLOUDINARY_API_SETUP.md`
- **Quick Reference**: See `DELETE_FEATURE_SUMMARY.md`

---

## ❓ Troubleshooting

### "Cloudinary not configured on server"
→ Add the API credentials to `.env.local` and restart

### Files not deleting from Cloudinary
→ Check Vercel environment variables are set correctly

### Old files can't be deleted
→ Files uploaded before this update don't have the metadata needed for deletion. They'll stay in Cloudinary until manually deleted.

---

## 🎉 Benefits

✅ No wasted storage space
✅ Lower costs
✅ Clean Cloudinary account
✅ Complete file deletion
✅ Secure implementation

---

Need help? Check the detailed guides in the documentation files!
