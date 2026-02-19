export const LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'prospecting', label: 'Prospecting' },
  { value: 'nurturing', label: 'Nurturing' },
  { value: 'under_contract', label: 'Under Contract' },
  { value: 'closed', label: 'Closed' },
  { value: 'lost', label: 'Lost' },
] as const;

export const LEAD_SOURCES = [
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'cold_call', label: 'Cold Call' },
  { value: 'email', label: 'Email' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'mls', label: 'MLS' },
  { value: 'other', label: 'Other' },
] as const;

export const PROPERTY_TYPES = [
  { value: 'single_family', label: 'Single Family' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' },
  { value: 'multi_family', label: 'Multi-Family' },
  { value: 'commercial', label: 'Commercial' },
] as const;

export const PROPERTY_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
  { value: 'off_market', label: 'Off Market' },
] as const;

export const TASK_PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
] as const;

export const TASK_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
] as const;

export const INTERACTION_TYPES = [
  { value: 'call', label: 'Call' },
  { value: 'email', label: 'Email' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'note', label: 'Note' },
  { value: 'sms', label: 'SMS' },
] as const;

export const EVENT_TYPES = [
  { value: 'showing', label: 'Showing' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'open_house', label: 'Open House' },
  { value: 'blocked_time', label: 'Blocked Time' },
] as const;

export const COMMUNICATION_TYPES = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'internal_message', label: 'Internal Message' },
] as const;

export const COMMUNICATION_DIRECTIONS = [
  { value: 'inbound', label: 'Inbound' },
  { value: 'outbound', label: 'Outbound' },
] as const;

export const USER_ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'broker', label: 'Broker' },
  { value: 'agent', label: 'Agent' },
] as const;

export const IMPORT_STATUSES = [
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
] as const;
