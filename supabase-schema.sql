-- SNT CRM Database Schema
-- Execute this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'broker', 'agent');
CREATE TYPE lead_status AS ENUM ('new', 'prospecting', 'nurturing', 'under_contract', 'closed', 'lost');
CREATE TYPE lead_source AS ENUM ('website', 'referral', 'cold_call', 'email', 'social_media', 'mls', 'other');
CREATE TYPE property_type AS ENUM ('single_family', 'condo', 'townhouse', 'land', 'multi_family', 'commercial');
CREATE TYPE property_status AS ENUM ('active', 'pending', 'sold', 'off_market');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE task_status AS ENUM ('new', 'in_progress', 'completed');
CREATE TYPE interaction_type AS ENUM ('call', 'email', 'meeting', 'note', 'sms');
CREATE TYPE event_type AS ENUM ('showing', 'meeting', 'open_house', 'blocked_time');
CREATE TYPE communication_type AS ENUM ('email', 'sms', 'internal_message');
CREATE TYPE communication_direction AS ENUM ('inbound', 'outbound');
CREATE TYPE communication_status AS ENUM ('draft', 'sent', 'delivered', 'failed');
CREATE TYPE import_status AS ENUM ('processing', 'completed', 'failed');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'view', 'export');
CREATE TYPE audit_status AS ENUM ('success', 'failure');

-- 1. offices table
CREATE TABLE offices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  broker_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role DEFAULT 'agent',
  office_id UUID REFERENCES offices(id) ON DELETE SET NULL,
  broker_id UUID REFERENCES users(id) ON DELETE SET NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  office_id UUID REFERENCES offices(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  budget_min DECIMAL(12,2),
  budget_max DECIMAL(12,2),
  property_type property_type,
  location_preference TEXT,
  lead_source lead_source DEFAULT 'other',
  status lead_status DEFAULT 'new',
  score INTEGER DEFAULT 0,
  next_follow_up TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  stage_changed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mls_id VARCHAR(100) UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  office_id UUID REFERENCES offices(id) ON DELETE SET NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  price DECIMAL(12,2),
  bed_count INTEGER,
  bath_count DECIMAL(3,1),
  sqft INTEGER,
  lot_size DECIMAL(10,2),
  year_built INTEGER,
  property_type property_type,
  status property_status DEFAULT 'active',
  description TEXT,
  list_date DATE,
  sold_date DATE,
  days_on_market INTEGER DEFAULT 0,
  is_mls BOOLEAN DEFAULT false,
  source_system VARCHAR(100),
  last_synced_at TIMESTAMPTZ,
  raw_mls_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. interactions table
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type interaction_type NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. lead_properties table (many-to-many relationship)
CREATE TABLE lead_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50),
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lead_id, property_id)
);

-- 7. tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  priority task_priority DEFAULT 'medium',
  status task_status DEFAULT 'new',
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. calendar_events table
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type event_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  attendees JSONB,
  external_calendar_id VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. communications table
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  type communication_type NOT NULL,
  direction communication_direction NOT NULL,
  subject VARCHAR(500),
  body TEXT,
  recipient VARCHAR(255),
  recipient_email VARCHAR(255),
  recipient_phone VARCHAR(20),
  status communication_status DEFAULT 'draft',
  read_at TIMESTAMPTZ,
  is_replied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. lead_imports table
CREATE TABLE lead_imports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  office_id UUID REFERENCES offices(id) ON DELETE SET NULL,
  file_name VARCHAR(255) NOT NULL,
  total_rows INTEGER DEFAULT 0,
  successful_rows INTEGER DEFAULT 0,
  failed_rows INTEGER DEFAULT 0,
  duplicate_rows INTEGER DEFAULT 0,
  status import_status DEFAULT 'processing',
  error_details JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. audit_log table
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action audit_action NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  status audit_status DEFAULT 'success',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. mls_listings table
CREATE TABLE mls_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  mls_id VARCHAR(100) UNIQUE NOT NULL,
  source_system VARCHAR(100),
  raw_data JSONB NOT NULL,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_office_id ON leads(office_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(score);
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_properties_office_id ON properties(office_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_state ON properties(state);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_interactions_lead_id ON interactions(lead_id);
CREATE INDEX idx_interactions_user_id ON interactions(user_id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to_user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_calendar_events_user_id ON calendar_events(user_id);
CREATE INDEX idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX idx_communications_user_id ON communications(user_id);
CREATE INDEX idx_communications_lead_id ON communications(lead_id);
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

-- Enable Row Level Security
ALTER TABLE offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE mls_listings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can view their own user record
CREATE POLICY "Users can view own user record" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own user record
CREATE POLICY "Users can update own user record" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Agents can view leads they own
CREATE POLICY "Agents can view own leads" ON leads
  FOR SELECT USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('broker', 'admin')
    )
  );

-- Agents can insert their own leads
CREATE POLICY "Agents can insert own leads" ON leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Agents can update their own leads
CREATE POLICY "Agents can update own leads" ON leads
  FOR UPDATE USING (auth.uid() = user_id);

-- Agents can delete their own leads
CREATE POLICY "Agents can delete own leads" ON leads
  FOR DELETE USING (auth.uid() = user_id);

-- Brokers and admins can view all leads in their office
CREATE POLICY "Brokers can view office leads" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('broker', 'admin')
      AND u.office_id = leads.office_id
    )
  );

-- Similar policies for properties
CREATE POLICY "Users can view own properties" ON properties
  FOR SELECT USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('broker', 'admin')
    )
  );

CREATE POLICY "Users can insert own properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = user_id);

-- Interactions: users can view interactions for leads they own
CREATE POLICY "Users can view own interactions" ON interactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM leads l WHERE l.id = interactions.lead_id AND l.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('broker', 'admin')
    )
  );

CREATE POLICY "Users can insert own interactions" ON interactions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM leads l WHERE l.id = interactions.lead_id AND l.user_id = auth.uid()
    )
  );

-- Tasks: users can view tasks assigned to them or created by them
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (
    auth.uid() = user_id
    OR auth.uid() = assigned_to_user_id
    OR EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('broker', 'admin')
    )
  );

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (
    auth.uid() = user_id
    OR auth.uid() = assigned_to_user_id
  );

-- Calendar events: users can view their own events
CREATE POLICY "Users can view own calendar events" ON calendar_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calendar events" ON calendar_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calendar events" ON calendar_events
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calendar events" ON calendar_events
  FOR DELETE USING (auth.uid() = user_id);

-- Communications: users can view their own communications
CREATE POLICY "Users can view own communications" ON communications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own communications" ON communications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Lead imports: users can view their own imports
CREATE POLICY "Users can view own imports" ON lead_imports
  FOR SELECT USING (auth.uid() = user_id);

-- Audit log: admins can view all audit logs
CREATE POLICY "Admins can view audit logs" ON audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- MLS listings: all authenticated users can view
CREATE POLICY "Users can view mls listings" ON mls_listings
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_offices_updated_at BEFORE UPDATE ON offices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interactions_updated_at BEFORE UPDATE ON interactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_properties_updated_at BEFORE UPDATE ON lead_properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communications_updated_at BEFORE UPDATE ON communications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mls_listings_updated_at BEFORE UPDATE ON mls_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample office (optional)
INSERT INTO offices (id, name, city, state) VALUES
  ('00000000-0000-0000-0000-000000000001', 'SNT Real Estate', 'New York', 'NY')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions
GRANT ALL ON offices TO authenticated;
GRANT ALL ON users TO authenticated;
GRANT ALL ON leads TO authenticated;
GRANT ALL ON properties TO authenticated;
GRANT ALL ON interactions TO authenticated;
GRANT ALL ON lead_properties TO authenticated;
GRANT ALL ON tasks TO authenticated;
GRANT ALL ON calendar_events TO authenticated;
GRANT ALL ON communications TO authenticated;
GRANT ALL ON lead_imports TO authenticated;
GRANT ALL ON audit_log TO authenticated;
GRANT ALL ON mls_listings TO authenticated;