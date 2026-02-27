# ⚠️ IMPORTANT: Database Migration Required

## You Must Run This SQL Before Using the App

Your app now uses persistent user IDs instead of IP addresses. You need to update your Supabase database.

---

## Quick Steps (5 minutes)

### 1. Go to Supabase
https://app.supabase.com/

### 2. Select Your Project
Click on your `localsync` project

### 3. Open SQL Editor
Click "SQL Editor" in the left sidebar

### 4. Copy This SQL

```sql
-- Add user_id column
ALTER TABLE sync_data ADD COLUMN IF NOT EXISTS user_id TEXT;

-- Migrate existing data (preserves your current data)
UPDATE sync_data 
SET user_id = 'migrated_' || REPLACE(ip_address, '.', '_')
WHERE user_id IS NULL;

-- Make user_id required and unique
ALTER TABLE sync_data ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE sync_data ADD CONSTRAINT sync_data_user_id_unique UNIQUE (user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_sync_data_user_id ON sync_data(user_id);
```

### 5. Paste and Run
- Paste the SQL into the editor
- Click "Run" button
- Wait for "Success" message

### 6. Done!
Your database is now ready for the new system.

---

## What This Does

- ✅ Adds `user_id` column to your database
- ✅ Migrates existing IP-based data to user IDs
- ✅ Makes user_id unique (one clipboard per user)
- ✅ Creates index for fast lookups
- ✅ Keeps old `ip_address` column (backward compatible)

---

## After Migration

1. Visit your website
2. Check browser console
3. You should see: `[UserID] Generated new user ID: user_...`
4. Your data will now survive IP changes!

---

## Existing Data

Your old data is automatically migrated:
- IP `192.168.1.100` → User ID `migrated_192_168_1_100`
- Data is preserved
- Still accessible (but only from that specific IP until you add new data)

---

## Need Help?

If you see any errors:
1. Check the SQL syntax
2. Make sure you're in the correct project
3. Try running each statement separately
4. Check Supabase logs for details

---

## Verification

After running the SQL, verify it worked:

```sql
-- Check if user_id column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'sync_data' AND column_name = 'user_id';

-- Should return: user_id | text
```

---

That's it! Run the SQL and you're good to go. 🚀
