-- Add password_created_at column to track when password was set
ALTER TABLE sync_data 
ADD COLUMN IF NOT EXISTS password_created_at TIMESTAMP WITH TIME ZONE;

-- Update existing passwords to have current timestamp
UPDATE sync_data 
SET password_created_at = NOW() 
WHERE password_hash IS NOT NULL AND password_created_at IS NULL;
