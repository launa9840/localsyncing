-- Migration: Switch from IP-based to User ID-based system
-- This migration adds user_id column and migrates existing data

-- Step 1: Add user_id column (nullable initially for migration)
ALTER TABLE sync_data ADD COLUMN IF NOT EXISTS user_id TEXT;

-- Step 2: Migrate existing data (generate user IDs for existing IP addresses)
-- This preserves existing data by converting IP addresses to user IDs
UPDATE sync_data 
SET user_id = 'migrated_' || REPLACE(ip_address, '.', '_')
WHERE user_id IS NULL;

-- Step 3: Make user_id NOT NULL and UNIQUE
ALTER TABLE sync_data ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE sync_data ADD CONSTRAINT sync_data_user_id_unique UNIQUE (user_id);

-- Step 4: Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_sync_data_user_id ON sync_data(user_id);

-- Step 5: Drop old ip_address constraint and index (optional - keeps backward compatibility)
-- Uncomment these lines if you want to completely remove IP-based system:
-- DROP INDEX IF EXISTS idx_sync_data_ip;
-- ALTER TABLE sync_data DROP CONSTRAINT IF EXISTS sync_data_ip_address_key;
-- ALTER TABLE sync_data DROP COLUMN IF EXISTS ip_address;

-- Note: We're keeping ip_address column for now to maintain backward compatibility
-- You can remove it later once you're sure the migration is successful
