-- Create sync_data table for persistent storage
CREATE TABLE IF NOT EXISTS sync_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT UNIQUE NOT NULL,
  text_content TEXT DEFAULT '',
  files JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_updated TIMESTAMPTZ DEFAULT now(),
  password_hash TEXT,
  is_locked BOOLEAN DEFAULT false
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_sync_data_ip ON sync_data(ip_address);
CREATE INDEX IF NOT EXISTS idx_sync_data_created_at ON sync_data(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE sync_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is a local network tool)
CREATE POLICY "Allow all operations" ON sync_data
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create view for active data (only last 3 days)
CREATE OR REPLACE VIEW active_sync_data AS
SELECT * FROM sync_data 
WHERE created_at > now() - interval '3 days';

-- Create function to auto-update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update last_updated
DROP TRIGGER IF EXISTS update_sync_data_last_updated ON sync_data;
CREATE TRIGGER update_sync_data_last_updated
  BEFORE UPDATE ON sync_data
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated();
