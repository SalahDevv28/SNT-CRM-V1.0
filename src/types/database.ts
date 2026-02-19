// Database schema types for SNT CRM

export type UserRole = 'admin' | 'broker' | 'agent';
export type LeadStatus = 'new' | 'prospecting' | 'nurturing' | 'under_contract' | 'closed' | 'lost';
export type LeadSource = 'website' | 'referral' | 'cold_call' | 'email' | 'social_media' | 'mls' | 'other';
export type PropertyType = 'single_family' | 'condo' | 'townhouse' | 'land' | 'multi_family' | 'commercial';
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'off_market';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'new' | 'in_progress' | 'completed';
export type InteractionType = 'call' | 'email' | 'meeting' | 'note' | 'sms';
export type EventType = 'showing' | 'meeting' | 'open_house' | 'blocked_time';
export type CommunicationType = 'email' | 'sms' | 'internal_message';
export type CommunicationDirection = 'inbound' | 'outbound';
export type CommunicationStatus = 'draft' | 'sent' | 'delivered' | 'failed';
export type ImportStatus = 'processing' | 'completed' | 'failed';
export type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'export';
export type AuditStatus = 'success' | 'failure';

// Office
export interface Office {
  id: string;
  broker_id: string | null;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

// User (extends Supabase auth.users)
export interface User {
  id: string;
  email: string;
  role: UserRole;
  office_id: string | null;
  broker_id: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Lead
export interface Lead {
  id: string;
  user_id: string;
  office_id: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  budget_min: number | null;
  budget_max: number | null;
  property_type: PropertyType | null;
  location_preference: string | null;
  lead_source: LeadSource;
  status: LeadStatus;
  score: number;
  next_follow_up: string | null;
  last_contact_at: string | null;
  stage_changed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Property
export interface Property {
  id: string;
  mls_id: string | null;
  user_id: string | null;
  office_id: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: number | null;
  longitude: number | null;
  price: number | null;
  bed_count: number | null;
  bath_count: number | null;
  sqft: number | null;
  lot_size: number | null;
  year_built: number | null;
  property_type: PropertyType | null;
  status: PropertyStatus;
  description: string | null;
  list_date: string | null;
  sold_date: string | null;
  days_on_market: number;
  is_mls: boolean;
  source_system: string | null;
  last_synced_at: string | null;
  raw_mls_data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// Interaction
export interface Interaction {
  id: string;
  lead_id: string;
  user_id: string;
  type: InteractionType;
  description: string;
  duration_minutes: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Lead-Property Relationship
export interface LeadProperty {
  id: string;
  lead_id: string;
  property_id: string;
  interaction_type: string | null;
  view_count: number;
  last_viewed_at: string | null;
  created_at: string;
  updated_at: string;
}

// Task
export interface Task {
  id: string;
  user_id: string;
  assigned_to_user_id: string | null;
  lead_id: string | null;
  property_id: string | null;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  is_recurring: boolean;
  recurrence_rule: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

// Calendar Event
export interface CalendarEvent {
  id: string;
  user_id: string;
  event_type: EventType;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  property_id: string | null;
  attendees: Record<string, unknown> | null;
  external_calendar_id: string | null;
  created_at: string;
  updated_at: string;
}

// Communication
export interface Communication {
  id: string;
  user_id: string;
  lead_id: string | null;
  type: CommunicationType;
  direction: CommunicationDirection;
  subject: string | null;
  body: string | null;
  recipient: string | null;
  recipient_email: string | null;
  recipient_phone: string | null;
  status: CommunicationStatus;
  read_at: string | null;
  is_replied: boolean;
  created_at: string;
  updated_at: string;
}

// Lead Import
export interface LeadImport {
  id: string;
  user_id: string;
  office_id: string | null;
  file_name: string;
  total_rows: number;
  successful_rows: number;
  failed_rows: number;
  duplicate_rows: number;
  status: ImportStatus;
  error_details: Record<string, unknown> | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

// Audit Log
export interface AuditLog {
  id: string;
  user_id: string | null;
  action: AuditAction;
  resource_type: string;
  resource_id: string;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  status: AuditStatus;
  created_at: string;
}

// MLS Listing
export interface MlsListing {
  id: string;
  property_id: string | null;
  mls_id: string;
  source_system: string;
  raw_data: Record<string, unknown>;
  synced_at: string;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  message: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}