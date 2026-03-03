-- ============================================
-- FIX: Enable Anonymous Access to sync_data Table
-- ============================================
-- This fixes the issue where data is not being saved to Supabase
-- because Row Level Security (RLS) is blocking anonymous writes

-- Step 1: Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'sync_data';

-- Step 2: Disable RLS (simplest solution for this use case)
ALTER TABLE sync_data DISABLE ROW LEVEL SECURITY;

-- OR Step 2 Alternative: Keep RLS enabled but add permissive policies
-- (Uncomment these if you want to keep RLS enabled)

/*
-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow anonymous select" ON sync_data;
DROP POLICY IF EXISTS "Allow anonymous insert" ON sync_data;
DROP POLICY IF EXISTS "Allow anonymous update" ON sync_data;
DROP POLICY IF EXISTS "Allow anonymous delete" ON sync_data;

-- Allow anonymous users to SELECT
CREATE POLICY "Allow anonymous select" ON sync_data
FOR SELECT TO anon
USING (true);

-- Allow anonymous users to INSERT
CREATE POLICY "Allow anonymous insert" ON sync_data
FOR INSERT TO anon
WITH CHECK (true);

-- Allow anonymous users to UPDATE
CREATE POLICY "Allow anonymous update" ON sync_data
FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Allow anonymous users to DELETE
CREATE POLICY "Allow anonymous delete" ON sync_data
FOR DELETE TO anon
USING (true);
*/

-- Step 3: Verify the fix
-- Try inserting a test row
INSERT INTO sync_data (ip_address, text_content, files, created_at, last_updated, is_locked)
VALUES ('test-ip', 'test text', '[]'::jsonb, NOW(), NOW(), false)
ON CONFLICT (ip_address) DO UPDATE SET text_content = 'test text updated';

-- Check if it worked
SELECT * FROM sync_data WHERE ip_address = 'test-ip';

-- Clean up test data
DELETE FROM sync_data WHERE ip_address = 'test-ip';
