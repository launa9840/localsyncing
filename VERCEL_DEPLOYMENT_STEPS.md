# 🚀 Vercel Deployment Steps

## Step 1: Add Environment Variables to Vercel

This is the MOST IMPORTANT step. Without these, your app won't work on Vercel.

### Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your project (should be named `localsyncing` or similar)
3. Click **Settings** tab at the top
4. Click **Environment Variables** in the left sidebar

### Add Variable 1: Supabase URL
Click **Add New** button and enter:

```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://bsjtjcfumzxnrlqvefzh.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

Click **Save**

### Add Variable 2: Supabase Anon Key
Click **Add New** button again and enter:

```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzanRqY2Z1bXp4bnJscXZlZnpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjQzMTgsImV4cCI6MjA4NzQ0MDMxOH0.PDYxg9Yt350sBjbJ43olchRLwRh6h5FUH9rmnCiAIEc
Environments: ✅ Production ✅ Preview ✅ Development
```

Click **Save**

### Verify Variables Are Added
You should now see both variables listed:
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY

## Step 2: Redeploy Your App

After adding the environment variables:

1. Click **Deployments** tab at the top
2. Find the most recent deployment in the list
3. Click the **three dots (...)** menu on the right side
4. Click **Redeploy**
5. In the popup, click **Redeploy** again to confirm

## Step 3: Wait for Deployment

You'll see:
- **Building** status (takes 1-2 minutes)
- Progress bar showing build steps
- Then **Ready** status with a green checkmark

## Step 4: Test Your App

Once deployment is complete:

1. Click **Visit** button or go to your app URL
2. Try typing text in the textarea
3. Try uploading a file
4. Refresh the page - everything should persist!

## Step 5: Check Logs (If Issues)

If something doesn't work:

1. Go to **Logs** tab in Vercel
2. You'll see console.log output from your app
3. Look for errors like:
   - `[API] Error in POST: ...`
   - `[RealtimeService] Error: ...`
   - `Supabase is not configured`

## Step 6: Verify Database

Check that data is being saved:

1. Go to Supabase: https://bsjtjcfumzxnrlqvefzh.supabase.co
2. Click **Table Editor**
3. Click **sync_data** table
4. You should see rows with your data

## Troubleshooting

### Issue: "Supabase is not configured" error

**Solution:** Environment variables not set correctly
- Go back to Step 1
- Verify both variables are added
- Make sure they're enabled for Production
- Redeploy again

### Issue: App loads but data doesn't save

**Solution:** Check Vercel logs
- Go to Logs tab
- Look for database errors
- Verify Supabase table exists
- Check RLS policies are set up

### Issue: Files upload but don't appear

**Solution:** Check Supabase Storage
- Verify `uploads` bucket exists
- Check bucket policies allow public read
- Check Vercel logs for upload errors

## Quick Checklist

Before deployment works, you need:

- ✅ Supabase `sync_data` table created (run SQL schema)
- ✅ Supabase `uploads` bucket created
- ✅ Bucket policies set (public read, authenticated write)
- ✅ RLS policies on `sync_data` table
- ✅ Environment variables added to Vercel
- ✅ Redeployed after adding variables

## Summary

The key steps are:
1. **Add environment variables** to Vercel (most important!)
2. **Redeploy** the app
3. **Test** that everything works
4. **Check logs** if there are issues

Your app should work perfectly after following these steps! 🎉

## Need Help?

If you see any errors:
1. Copy the error message from Vercel logs
2. Check which step failed
3. Verify all environment variables are set correctly
