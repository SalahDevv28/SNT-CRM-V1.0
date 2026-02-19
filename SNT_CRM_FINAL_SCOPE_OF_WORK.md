# SNT CRM - Final Scope of Work

## 📋 Project Overview

**Project Name:** SNT CRM (Real Estate Customer Relationship Management System)
**Duration:** 10 weeks
**Team Size:** 1 developer + Cursor AI
**Budget:** ~$60,000 (1,200 dev hours @ $50/hr)
**Status:** Ready for Development

---

## 🎯 Project Goals

1. Build a secure, mobile-first CRM for real estate agents and brokers
2. Implement real-time lead management with drag-and-drop kanban boards
3. Integrate MLS/IDX data from RESO Web API
4. Provide role-specific dashboards (Agent, Broker, Property Manager)
5. Enable task management, calendar scheduling, and messaging
6. Ensure GDPR/CCPA compliance and data security
7. Achieve Lighthouse performance score of 90+
8. Deploy to production with zero critical bugs

---

## 📦 Complete Dependencies List

### Installation Command (Copy & Paste)

```bash
npm install @supabase/supabase-js zustand papaparse @dnd-kit/core @dnd-kit/utilities @dnd-kit/sortable recharts axios js-cookie react-hot-toast class-variance-authority clsx tailwind-merge date-fns fuse.js

npm install -D @types/papaparse @types/js-cookie typescript @types/react @types/react-dom @types/node eslint eslint-config-next prettier @testing-library/react @testing-library/jest-dom vitest @vitest/ui
```

### All Dependencies (37 packages)

#### Core Framework (4)
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14+ | React framework with App Router |
| `react` | 18+ | UI library |
| `react-dom` | 18+ | React DOM rendering |
| `typescript` | Latest | Type safety and development |

#### State Management (1)
| Package | Version | Purpose |
|---------|---------|---------|
| `zustand` | Latest | Lightweight global state management |

#### Database & Auth (1)
| Package | Version | Purpose |
|---------|---------|---------|
| `@supabase/supabase-js` | Latest | Supabase client for database, auth, real-time |

#### UI & Styling (5)
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | Latest | Utility-first CSS framework |
| `class-variance-authority` | Latest | Component variant management |
| `clsx` | Latest | Conditional class names |
| `tailwind-merge` | Latest | Merge Tailwind classes safely |
| `react-hot-toast` | Latest | Toast notifications |

#### Data Handling (4)
| Package | Version | Purpose |
|---------|---------|---------|
| `papaparse` | Latest | CSV parsing and handling |
| `axios` | Latest | HTTP client for API calls |
| `date-fns` | Latest | Date manipulation and formatting |
| `fuse.js` | Latest | Fuzzy search for leads/properties |

#### Drag & Drop (3)
| Package | Version | Purpose |
|---------|---------|---------|
| `@dnd-kit/core` | Latest | Drag-drop foundation |
| `@dnd-kit/utilities` | Latest | Helper utilities for drag-drop |
| `@dnd-kit/sortable` | Latest | Sortable lists and kanban boards |

#### Charts & Visualization (1)
| Package | Version | Purpose |
|---------|---------|---------|
| `recharts` | Latest | Interactive charts and graphs |

#### Authentication (1)
| Package | Version | Purpose |
|---------|---------|---------|
| `js-cookie` | Latest | Manage authentication tokens |

#### Development Dependencies (10)
| Package | Version | Purpose |
|---------|---------|---------|
| `@types/papaparse` | Latest | TypeScript types for papaparse |
| `@types/js-cookie` | Latest | TypeScript types for js-cookie |
| `@types/react` | Latest | React TypeScript types |
| `@types/react-dom` | Latest | React DOM TypeScript types |
| `@types/node` | Latest | Node.js TypeScript types |
| `eslint` | Latest | Code linting |
| `eslint-config-next` | Latest | Next.js ESLint config |
| `prettier` | Latest | Code formatting |
| `@testing-library/react` | Latest | React component testing |
| `@testing-library/jest-dom` | Latest | Jest DOM matchers |

#### Testing & Quality (2)
| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | Latest | Unit testing framework |
| `@vitest/ui` | Latest | Vitest UI for test results |

#### Optional (recommended for later)
```bash
# Performance & Optimization
npm install next-image-export-optimizer

# Forms & Validation
npm install react-hook-form zod

# Animations
npm install framer-motion

# Advanced Data Fetching
npm install react-query

# Alternative Notifications
npm install sonner

# Playwright for E2E Testing
npm install -D @playwright/test
```

### Dependency Explanations

**@supabase/supabase-js** - Core dependency for:
- PostgreSQL database access
- Real-time subscriptions (lead updates, property changes)
- Authentication (login/signup)
- File storage (documents, property photos)
- Row-Level Security enforcement

**zustand** - Global state for:
- Authentication state (current user, token)
- UI state (modals, sidebars, dropdowns)
- Dashboard filters (lead status, date range)
- User preferences

**papaparse** - CSV handling for:
- Importing leads from CSV files
- Bulk operations
- Data transformation
- Validation and error handling

**@dnd-kit** - Drag-and-drop for:
- Lead pipeline kanban board
- Reordering task lists
- Rearranging dashboard cards

**recharts** - Visualizations for:
- Revenue charts (broker dashboard)
- Lead metrics graphs
- Agent performance charts
- Activity analytics

**axios** - HTTP client for:
- API calls to custom endpoints
- RESO Web API integration (MLS)
- Google Calendar API
- Twilio SMS API
- Error handling and retries

**date-fns** - Date operations for:
- Formatting dates in user's timezone
- Calculating days on market
- Date range filtering
- Calendar operations

**fuse.js** - Search functionality for:
- Fuzzy matching leads by name
- Property search
- Agent search
- Fast local searching

---

## 📦 Technology Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **UI Components:** Custom + Radix UI primitives
- **Animations:** Framer Motion (optional)
- **Drag & Drop:** dnd-kit

### Backend & Database (Supabase BaaS)
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase GoTrue (Email, Magic Links, OAuth)
- **Auto-generated APIs:** PostgREST (instant CRUD endpoints)
- **Real-time:** Supabase Realtime Subscriptions
- **Edge Functions:** TypeScript/Deno (serverless)
- **Storage:** Supabase Storage (documents, photos)
- **Security:** Row Level Security (RLS) policies

### External APIs & Services
- **MLS Data:** RESO Web API (synced via Edge Functions)
- **Calendar:** Google Calendar + Outlook APIs
- **SMS:** Twilio (via Edge Functions)
- **Email:** SendGrid/SMTP (via Edge Functions)
- **Payments:** Stripe (via Edge Functions)

### Deployment
- **Frontend:** Vercel
- **Backend:** Supabase (managed)
- **Edge Functions:** Supabase Edge Runtime
- **CI/CD:** GitHub Actions
- **Version Control:** Git/GitHub

### Development Tools
- **Testing:** Vitest + Playwright
- **Linting:** ESLint
- **Formatting:** Prettier
- **Database CLI:** Supabase CLI
- **Package Manager:** npm

---

## 🏗️ Backend Architecture (Supabase BaaS - "Vibe Coding")

### Three-Tier Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  FRONTEND LAYER                         │
│         (Next.js + React + TypeScript)                  │
│  ├─ Pages (SSR/SSG)                                     │
│  ├─ Components (React)                                  │
│  ├─ State (Zustand)                                     │
│  └─ Real-time UI Updates (Supabase Realtime)            │
└─────────────────────────────────────────────────────────┘
                        ↓↑
┌─────────────────────────────────────────────────────────┐
│              SUPABASE MIDDLEWARE LAYER                  │
│         (Auto-generated APIs & Auth)                    │
│  ├─ PostgREST API (auto-generated CRUD)                │
│  ├─ Authentication (GoTrue)                             │
│  ├─ Realtime Subscriptions                              │
│  └─ Storage API (files & documents)                     │
└─────────────────────────────────────────────────────────┘
                        ↓↑
┌─────────────────────────────────────────────────────────┐
│            DATABASE & BACKEND LAYER                     │
│              (PostgreSQL + Rules)                       │
│  ├─ Database Tables (PostgreSQL)                        │
│  ├─ Row Level Security (RLS)                            │
│  ├─ Database Triggers                                   │
│  ├─ Edge Functions (TypeScript)                         │
│  └─ Custom Schemas & Rules                              │
└─────────────────────────────────────────────────────────┘
```

### Core Supabase Features

#### 1. **PostgREST Auto-Generated APIs**
- **No manual API routes needed** - every table automatically becomes a REST endpoint
- **Instant CRUD operations** - Create, Read, Update, Delete without writing backend code
- **Built-in filtering, sorting, pagination** - QueryBuilder-style parameters
- **Real-time capable** - instantly reflects database changes

Example: A `leads` table automatically provides:
- `GET /rest/v1/leads` - fetch all leads
- `POST /rest/v1/leads` - create lead
- `PATCH /rest/v1/leads?id=123` - update lead
- `DELETE /rest/v1/leads?id=123` - delete lead

#### 2. **Row Level Security (RLS) - Mandatory**
Every table must have RLS policies to ensure data isolation:

**Example RLS Policy for Leads Table:**
```sql
-- Users can only see their own leads
CREATE POLICY "Users see own leads"
ON leads FOR SELECT
USING (user_id = auth.uid());

-- Users can only update their own leads
CREATE POLICY "Users update own leads"
ON leads FOR UPDATE
USING (user_id = auth.uid());

-- Brokers can see all team leads
CREATE POLICY "Brokers see team leads"
ON leads FOR SELECT
USING (
  office_id IN (
    SELECT office_id FROM users WHERE id = auth.uid()
  )
);
```

#### 3. **Authentication (GoTrue)**
- **Email/Password:** Native email sign-up with password hashing
- **Magic Links:** Passwordless auth via email links
- **OAuth:** Google, GitHub, Microsoft OAuth providers
- **Session Management:** Automatic JWT token handling
- **User Context:** `auth.uid()` available in RLS policies

#### 4. **Edge Functions (Serverless)**
TypeScript/Deno functions for:
- **External API Calls:** RESO Web API MLS sync, Google Calendar sync
- **Email/SMS Notifications:** SendGrid emails, Twilio SMS
- **Scheduled Tasks:** Lead scoring, nightly reports via `pg_cron`
- **Webhooks:** Stripe payment confirmations, calendar invitations
- **Complex Logic:** Lead qualification, property matching algorithms

Example Edge Function for Lead Scoring:
```typescript
// supabase/functions/score-lead/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js"

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  )

  const { leadId } = await req.json()
  
  // Calculate lead score based on interactions
  const { data: interactions } = await supabase
    .from("interactions")
    .select("type")
    .eq("lead_id", leadId)

  let score = 0
  interactions?.forEach(({ type }) => {
    if (type === "call") score += 30
    if (type === "email") score += 20
    if (type === "meeting") score += 40
  })

  // Update lead score
  await supabase
    .from("leads")
    .update({ score })
    .eq("id", leadId)

  return new Response(JSON.stringify({ score }))
})
```

#### 5. **Database Triggers & Automation**
Automatic actions when data changes:

**Example: Auto-assign manager to new listing**
```sql
CREATE OR REPLACE FUNCTION assign_manager()
RETURNS TRIGGER AS $$
BEGIN
  -- Assign property manager automatically
  NEW.manager_id := (
    SELECT id FROM users 
    WHERE role = 'manager' 
    AND office_id = NEW.office_id
    LIMIT 1
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_assign_manager
BEFORE INSERT ON properties
FOR EACH ROW
EXECUTE FUNCTION assign_manager();
```

#### 6. **Realtime Subscriptions**
Instant updates on frontend when data changes:

**Example: Lead updates in real-time on agent dashboard**
```typescript
// Frontend: Listen to lead changes
const subscription = supabase
  .from('leads')
  .on('*', (payload) => {
    // Update UI instantly when lead is updated
    setLeads(prev => 
      prev.map(l => l.id === payload.new.id ? payload.new : l)
    )
  })
  .subscribe()
```

### Data Security Layers

#### Layer 1: Row Level Security (RLS)
- **Enforced at database level** (not app code)
- **Applies to all queries** (PostgREST, Edge Functions, CLI)
- **Cannot be bypassed** - even with direct SQL access

#### Layer 2: Authentication
- **JWT tokens** generated by GoTrue
- **Token expiration** (15min access, 7-day refresh)
- **OAuth providers** for enterprise security

#### Layer 3: Role-Based Access Control (RBAC)
- **Admin:** Full access to all data
- **Broker/Manager:** Access to team's data
- **Agent:** Access only to assigned leads/properties
- **Client:** Read-only access to specific properties

#### Layer 4: Data Validation
- **Database constraints** (NOT NULL, UNIQUE, CHECK)
- **Type enforcement** via PostgreSQL types
- **Custom validation** via triggers

### Lead Scoring & Routing Logic

**Automated Qualification System:**

```sql
-- Lead scoring calculation (via database trigger or Edge Function)
-- Score 0-100 based on:
-- - Property views: +5 per view (max 20)
-- - Email opens: +3 per open (max 15)
-- - Call interactions: +10 per call (max 30)
-- - Meeting scheduled: +20 per meeting (max 40)

CREATE OR REPLACE FUNCTION calculate_lead_score(lead_id UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- View score
  score := score + (
    SELECT COUNT(*) * 5 FROM interactions 
    WHERE lead_id = calculate_lead_score.lead_id 
    AND type = 'property_view'
  );
  
  -- Call score
  score := score + (
    SELECT COUNT(*) * 10 FROM interactions 
    WHERE lead_id = calculate_lead_score.lead_id 
    AND type = 'call'
  );
  
  -- Meeting score
  score := score + (
    SELECT COUNT(*) * 20 FROM interactions 
    WHERE lead_id = calculate_lead_score.lead_id 
    AND type = 'meeting'
  );

  RETURN LEAST(score, 100); -- Cap at 100
END;
$$ LANGUAGE plpgsql;
```

**Routing Rules:**
- **0-30 (Low):** Add to nurture sequence automatically
- **31-70 (Qualified):** Assign to available agent within 4 hours
- **71+ (Hot):** Immediate assignment + manager notification via Edge Function

### Implementation Order (Vibe Coding Flow)

1. **Initialize Supabase Project**
   ```bash
   supabase init
   supabase start
   ```

2. **Create PostgreSQL Schema**
   - Define all tables (leads, properties, interactions, etc.)
   - Add constraints and relationships
   - All tables created in one session

3. **Enable Row Level Security (RLS)**
   - Add RLS policies to every table immediately
   - Test policies with different user roles
   - Verify data isolation works

4. **Setup Authentication**
   - Configure OAuth providers (Google, GitHub)
   - Setup Magic Links
   - Test login flows

5. **Implement Realtime**
   - Enable Realtime extension for critical tables
   - Subscribe to changes in frontend
   - Test instant updates

6. **Create Edge Functions**
   - RESO API sync for MLS data
   - Lead scoring automation
   - Email/SMS notifications
   - Scheduled tasks (cron)

7. **Add Database Triggers**
   - Auto-assign managers to listings
   - Calculate lead scores
   - Log audit trail
   - Update denormalized fields

8. **Deploy & Monitor**
   - Use Supabase Dashboard for logs
   - Monitor function execution
   - Track query performance
   - Set up alerts

### Key "Vibe Coding" Principles

✅ **No manual API code** - PostgREST handles all CRUD
✅ **Security at database layer** - RLS enforced everywhere
✅ **Serverless functions** - No server management
✅ **Real-time by default** - Instant UI updates
✅ **TypeScript everywhere** - Type safety
✅ **Minimal boilerplate** - Focus on features
✅ **Automated triggers** - Less manual code
✅ **Instant feedback** - Changes reflected immediately

---

## 📦 Technology Stack

---

## 📁 Complete Folder Structure

```
snt-crm/src/
├── app/                              # Next.js pages
│   ├── (auth)/                       # Public auth routes
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── (protected)/                  # Protected routes
│   │   ├── dashboard/page.tsx        # Agent dashboard
│   │   ├── leads/                    # Lead management
│   │   ├── properties/               # Property management
│   │   ├── calendar/                 # Scheduling
│   │   ├── tasks/                    # Task management
│   │   ├── messaging/                # Communication
│   │   ├── broker/                   # Broker dashboard
│   │   └── layout.tsx
│   ├── api/                          # API routes
│   │   ├── auth/
│   │   ├── leads/
│   │   ├── properties/
│   │   ├── tasks/
│   │   ├── calendar/
│   │   ├── messaging/
│   │   └── upload/
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home redirect
│
├── components/                       # React components
│   ├── ui/                          # Base UI components
│   │   ├── Button.tsx, Card.tsx, Modal.tsx, Input.tsx, etc.
│   ├── layout/                      # Layout components
│   │   ├── Sidebar.tsx, Header.tsx, ProtectedLayout.tsx
│   ├── dashboard/                   # Dashboard components
│   │   ├── AgentDashboard.tsx, KPICard.tsx, ActivityTimeline.tsx
│   ├── leads/                       # Lead components
│   │   ├── LeadPipeline.tsx, LeadCard.tsx, LeadDetail.tsx, ImportWizard.tsx
│   ├── properties/                  # Property components
│   │   ├── PropertyGrid.tsx, PropertyCard.tsx, PropertyDetail.tsx
│   ├── broker/                      # Broker components
│   │   ├── BrokerDashboard.tsx, LeaderboardTable.tsx, AgentPerformance.tsx
│   ├── calendar/                    # Calendar components
│   │   ├── Calendar.tsx, EventModal.tsx, ShowingScheduler.tsx
│   ├── tasks/                       # Task components
│   │   ├── TaskDashboard.tsx, TaskList.tsx, TaskForm.tsx
│   ├── messaging/                   # Messaging components
│   │   ├── CommunicationHub.tsx, MessageThread.tsx, ComposeModal.tsx
│   └── analytics/                   # Analytics components
│       ├── ActivityAnalytics.tsx, PerformanceCharts.tsx
│
├── lib/                             # Business logic
│   ├── supabase.ts                 # Supabase client
│   ├── auth.ts                     # Auth functions
│   ├── api-client.ts               # HTTP utilities
│   ├── leadScoring.ts              # Lead scoring algorithm
│   ├── deduplication.ts            # Duplicate detection
│   ├── csv.ts                      # CSV parsing
│   ├── resoApi.ts                  # RESO API integration
│   ├── googleCalendar.ts           # Google Calendar
│   ├── formatters.ts               # Date/currency formatters
│   ├── validators.ts               # Input validation
│   ├── storage.ts                  # File storage
│   └── middleware.ts               # Route protection
│
├── hooks/                           # Custom React hooks
│   ├── useAuth.ts, useUser.ts, useLeads.ts, useProperties.ts
│   ├── useTasks.ts, useCalendarEvents.ts, useMessages.ts
│   ├── useDebounce.ts, usePagination.ts, useLocalStorage.ts
│   └── useSupabaseQuery.ts         # Real-time hook
│
├── stores/                          # Zustand global state
│   ├── authStore.ts                # Auth state
│   ├── uiStore.ts                  # UI state (modals, sidebars)
│   ├── leadStore.ts                # Lead filters/state
│   ├── propertyStore.ts            # Property state
│   └── agentDashboardStore.ts      # Dashboard state
│
├── types/                           # TypeScript types
│   ├── database.ts                 # Database schema types
│   ├── api.ts                      # API types
│   ├── leads.ts, properties.ts     # Domain types
│   └── index.ts                    # Type exports
│
├── config/                          # Configuration
│   ├── site.ts, navigation.ts, constants.ts, env.ts, theme.ts
│
├── constants/                       # Constants & enums
│   ├── leads.ts, properties.ts, roles.ts, messages.ts, errors.ts
│
├── utils/                           # General utilities
│   ├── string.ts, number.ts, date.ts, array.ts, validation.ts
│
└── styles/                          # Global styles
    ├── globals.css, variables.css
```

---

## 📦 Dependencies

### Installation Command
```bash
npm install @supabase/supabase-js zustand papaparse @dnd-kit/core @dnd-kit/utilities @dnd-kit/sortable recharts axios js-cookie react-hot-toast class-variance-authority clsx tailwind-merge date-fns fuse.js

npm install -D @types/papaparse @types/js-cookie typescript @types/react @types/react-dom @types/node eslint eslint-config-next prettier @testing-library/react @testing-library/jest-dom vitest @vitest/ui
```

### Core Packages (37 total)
- **React:** next, react, react-dom, typescript
- **State:** zustand
- **Database:** @supabase/supabase-js
- **UI:** tailwindcss, class-variance-authority, clsx, tailwind-merge
- **Data:** papaparse, axios, date-fns, fuse.js
- **Drag:** @dnd-kit/core, @dnd-kit/utilities, @dnd-kit/sortable
- **Charts:** recharts
- **Auth:** js-cookie
- **Notifications:** react-hot-toast
- **Testing:** vitest, @testing-library/react, @testing-library/jest-dom
- **Quality:** eslint, prettier
- **Plus 11 more development & optional packages**

---

## 🗄️ Database Schema

### 12 Core Tables

#### 1. users
- `id` (UUID, PK)
- `email` (string, unique)
- `role` (enum: admin, broker, agent)
- `office_id` (FK)
- `broker_id` (FK)
- `first_name`, `last_name`, `phone`
- `avatar_url`
- `created_at`, `updated_at`

#### 2. leads
- `id` (UUID, PK)
- `user_id` (FK) - agent owner
- `office_id` (FK)
- `first_name`, `last_name`, `email`, `phone`
- `budget_min`, `budget_max`
- `property_type`, `location_preference`
- `lead_source` (website, referral, cold_call, etc.)
- `status` (new, prospecting, nurturing, under_contract, closed, lost)
- `score` (0-100)
- `next_follow_up`, `last_contact_at`, `stage_changed_at`
- `notes`
- `created_at`, `updated_at`

#### 3. properties
- `id` (UUID, PK)
- `mls_id` (string, unique)
- `user_id` (FK) - listing agent
- `office_id` (FK)
- `address`, `city`, `state`, `zip_code`
- `latitude`, `longitude`
- `price`, `bed_count`, `bath_count`, `sqft`
- `lot_size`, `year_built`
- `property_type` (single_family, condo, townhouse, land, multi_family)
- `status` (active, pending, sold, off_market)
- `description`
- `list_date`, `sold_date`, `days_on_market`
- `is_mls`, `source_system`, `last_synced_at`
- `raw_mls_data` (JSONB)
- `created_at`, `updated_at`

#### 4. interactions
- `id` (UUID, PK)
- `lead_id` (FK)
- `user_id` (FK)
- `type` (call, email, meeting, note, sms)
- `description` (required)
- `duration_minutes` (for calls/meetings)
- `notes`
- `created_at`, `updated_at`

#### 5. lead_properties
- `id` (UUID, PK)
- `lead_id` (FK)
- `property_id` (FK)
- `interaction_type` (viewed, favorited, showing_scheduled, offered, under_contract)
- `view_count`
- `last_viewed_at`
- `created_at`, `updated_at`

#### 6. tasks
- `id` (UUID, PK)
- `user_id` (FK) - creator
- `assigned_to_user_id` (FK)
- `lead_id` (FK, nullable)
- `property_id` (FK, nullable)
- `title`, `description`
- `due_date`, `priority` (low, medium, high)
- `status` (new, in_progress, completed)
- `is_recurring`, `recurrence_rule`
- `completed_at`
- `created_at`, `updated_at`

#### 7. calendar_events
- `id` (UUID, PK)
- `user_id` (FK)
- `event_type` (showing, meeting, open_house, blocked_time)
- `title`, `description`
- `start_time`, `end_time`
- `location`, `property_id` (FK)
- `attendees` (JSONB array)
- `external_calendar_id` (for Google/Outlook sync)
- `created_at`, `updated_at`

#### 8. communications
- `id` (UUID, PK)
- `user_id` (FK)
- `lead_id` (FK, nullable)
- `type` (email, sms, internal_message)
- `direction` (inbound, outbound)
- `subject`, `body`
- `recipient`, `recipient_email`, `recipient_phone`
- `status` (draft, sent, delivered, failed)
- `read_at`, `is_replied`
- `created_at`, `updated_at`

#### 9. lead_imports
- `id` (UUID, PK)
- `user_id` (FK)
- `office_id` (FK)
- `file_name`, `total_rows`
- `successful_rows`, `failed_rows`, `duplicate_rows`
- `status` (processing, completed, failed)
- `error_details` (JSONB)
- `started_at`, `completed_at`
- `created_at`

#### 10. audit_log
- `id` (UUID, PK)
- `user_id` (FK)
- `action` (create, update, delete, view, export)
- `resource_type` (lead, property, task, etc.)
- `resource_id` (UUID)
- `old_values`, `new_values` (JSONB)
- `ip_address`, `user_agent`
- `status` (success, failure)
- `created_at`

#### 11. offices
- `id` (UUID, PK)
- `broker_id` (FK)
- `name`, `address`, `city`, `state`, `zip_code`, `phone`
- `created_at`, `updated_at`

#### 12. mls_listings
- `id` (UUID, PK)
- `property_id` (FK, nullable)
- `mls_id` (string, unique)
- `source_system` (MLS provider name)
- `raw_data` (JSONB)
- `synced_at`, `created_at`, `updated_at`

### Security
- **RLS Policies:** Agents see only their leads, brokers see team data
- **Encryption:** Sensitive data encrypted at rest
- **Audit Trail:** All actions logged to audit_log table
- **Rate Limiting:** API endpoints rate limited

---

## 📊 Development Phases

### Phase 1: Foundation (Weeks 1-2)
**Goal:** Set up project infrastructure and authentication

**Deliverables:**
- ✅ Next.js project initialized with folder structure
- ✅ Supabase project created with database schema
- ✅ Authentication system (signup/login/password reset)
- ✅ Protected routes middleware
- ✅ Zustand stores for auth state
- ✅ ESLint, Prettier, TypeScript configured

**Hours:** ~160
**Key Files:**
- `app/(auth)/login/page.tsx`
- `app/(auth)/signup/page.tsx`
- `lib/auth.ts`
- `stores/authStore.ts`
- `lib/middleware.ts`

**Acceptance Criteria:**
- Users can sign up with email
- Users can log in with email/password
- Users can reset password
- Unauthorized users redirected to login
- Database tables created with RLS policies

---

### Phase 2: Core Features (Weeks 3-5)
**Goal:** Build agent-facing features and dashboards

**Deliverables:**
- ✅ Agent Dashboard with KPI cards
- ✅ Lead Pipeline (kanban board with drag-drop)
- ✅ Lead Detail page (5 tabs: profile, activity, properties, documents, notes)
- ✅ Lead Import Wizard (5-step CSV import)
- ✅ Property Listing Grid (search, filters, sorting)
- ✅ UI Component Library (40+ components)

**Hours:** ~320
**Key Components:**
- `components/dashboard/AgentDashboard.tsx`
- `components/leads/LeadPipeline.tsx`
- `components/leads/LeadDetail.tsx`
- `components/leads/ImportWizard.tsx`
- `components/properties/PropertyGrid.tsx`

**Acceptance Criteria:**
- KPI cards display real-time data
- Leads drag smoothly between stages
- CSV import processes 10,000 leads in <30 seconds
- Property search returns results in <500ms
- Mobile responsive on all pages
- Lighthouse performance score ≥90

---

### Phase 3: Integrations (Weeks 6-8)
**Goal:** Integrate external APIs and advanced features

**Deliverables:**
- ✅ RESO Web API integration (MLS data sync every 15 min)
- ✅ Lead Scoring Algorithm (real-time scoring)
- ✅ Broker Dashboard (team metrics, leaderboards)
- ✅ Calendar Integration (Google + Outlook)
- ✅ Task Management (create, assign, track)
- ✅ Communication Hub (email/SMS inbox)
- ✅ Analytics Dashboard (charts, metrics)

**Hours:** ~480
**Key Features:**
- MLS data syncs automatically
- Lead scores calculated in real-time
- Broker can see team performance
- Showing scheduler with conflict detection
- Email/SMS templates
- Revenue charts, agent metrics

**Acceptance Criteria:**
- MLS data appears in CRM within 15 minutes
- Lead scores update instantly
- Broker dashboard loads in <3 seconds
- Calendar syncs with Google/Outlook
- SMS delivery tracked
- Task reminders send at correct times

---

### Phase 4: Polish & Launch (Weeks 9-10)
**Goal:** Optimize, test, and deploy to production

**Deliverables:**
- ✅ Performance optimization (Lighthouse 90+)
- ✅ Security audit (GDPR/CCPA compliance)
- ✅ Comprehensive testing (unit, integration, E2E)
- ✅ Bug fixes from QA
- ✅ User acceptance testing
- ✅ Production deployment
- ✅ Launch documentation

**Hours:** ~240
**Quality Metrics:**
- Lighthouse Performance: 90+
- Accessibility: 95+
- Code coverage: 70%+
- API response time: <500ms (95th percentile)
- Uptime: 99.5%

**Acceptance Criteria:**
- All critical user flows tested
- Zero critical bugs in production first week
- GDPR/CCPA compliance verified
- Performance targets met
- All user acceptance tests passed
- Deployment runbooks documented

---

## 🎯 Feature List by Dashboard

### Dashboard 1: Agent Dashboard
1. **KPI Cards**
   - Active leads this week
   - Properties showing this week
   - Pending deals
   - Revenue pipeline
   - Real-time updates, trend indicators

2. **Activity Timeline**
   - Recent interactions (calls, emails, meetings)
   - Property updates
   - Task completions
   - Scrollable, shows last 5 years with pagination

3. **Lead Pipeline (Kanban)**
   - 5 stages: New, Prospecting, Nurturing, Under Contract, Closed
   - Drag-drop cards between stages
   - Bulk actions (reassign, email, delete)
   - Search and filters
   - Real-time sync across users

4. **Lead Management**
   - Lead detail page (name, contact, budget, criteria, source)
   - Activity log (all interactions)
   - Linked properties
   - Document uploads (up to 20MB)
   - Lead scoring (Hot/Warm/Cold)

5. **CSV Import**
   - 5-step wizard
   - Duplicate detection
   - Field mapping
   - Batch processing (10,000+ leads)
   - Import history

6. **Property Listings**
   - Grid view with photos
   - Search, filter (price, location, type, status)
   - Property detail modal
   - Image gallery
   - Off-market property creation

---

### Dashboard 2: Broker Dashboard
1. **Team KPIs**
   - Total active leads
   - Properties listed
   - Closed deals (MTD)
   - Team revenue (MTD)
   - Average days on market

2. **Agent Leaderboard**
   - Top agents by deals, revenue, conversion rate
   - Filter by time period
   - Performance trends

3. **Team Performance**
   - Charts (revenue, leads by source, productivity)
   - Activity feed
   - Real-time updates
   - Date range filtering

4. **Agent Management**
   - Agent performance cards
   - Set targets (leads, deals, revenue)
   - Progress bars toward goals
   - Alert when underperforming
   - Last activity timestamp

5. **Lead Assignment**
   - Central inbox for new leads
   - Auto-scoring
   - Manual or round-robin assignment
   - Assignment tracking
   - Conversion metrics by source

6. **Compliance**
   - Audit logs (all user actions)
   - Data deletion requests
   - Consent management
   - Regulatory reporting

---

### Dashboard 3: Property Management
1. **Listings Grid/List**
   - Search all properties
   - Filters: price, location, type, status, agent
   - Sorting options
   - 50 per page with lazy load

2. **Property Detail**
   - Full property info (beds, baths, sqft, price, etc.)
   - Photo gallery (50+ images)
   - MLS data tab
   - Showings tab with feedback
   - Marketing materials (brochures, social posts)
   - Buyer lead matching

3. **MLS Sync**
   - Real-time data sync (every 15 min)
   - Status indicator
   - Manual refresh option
   - Field mapping
   - Price/status change history
   - IDX compliance

4. **Open House**
   - Schedule open house
   - Visitor sign-in form
   - Attendance tracking
   - Marketing promotion
   - ROI analytics

---

### Dashboard 4: Task & Calendar Management
1. **Calendar**
   - Month, week, day views
   - Google Calendar + Outlook sync
   - Event creation/edit
   - Showing scheduler with conflict detection
   - All-day events, reminders

2. **Task Management**
   - Task inbox (due date, priority)
   - Create task (linked to lead/property)
   - Bulk actions, filter, sort
   - Recurring tasks
   - Task templates
   - Reminders (email, SMS)

3. **Communication Hub**
   - Unified inbox (emails, SMS)
   - Email templates
   - SMS with character count
   - Message threads
   - Compliance logging
   - Delivery/read tracking

4. **Analytics**
   - Activity metrics (calls, emails, meetings by agent)
   - Lead engagement
   - Conversion rates
   - Performance charts
   - Export reports (PDF, CSV)

---

## 🔐 Security & Compliance

### Authentication & Authorization
- Email/password signup and login
- Google OAuth option
- Password reset with tokens
- Session management (24hr expiration)
- 2FA optional for brokers
- Role-based access control (Agent, Broker, Admin)

### Data Protection
- HTTPS enforced
- Database encryption at rest
- Sensitive field encryption (SSN, financial data)
- Row-Level Security (RLS) policies
- Audit logging of all actions
- GDPR compliance (right to deletion, data exports)
- CCPA compliance (opt-out tracking)

### Security Measures
- Input validation on all forms
- SQL injection prevention (parameterized queries)
- XSS protection (input sanitization)
- CSRF tokens on state-changing operations
- Rate limiting on API endpoints
- Regular security audits

---

## 📈 Performance Targets

| Metric | Target |
|--------|--------|
| **Lighthouse Performance** | 90+ |
| **Lighthouse Accessibility** | 95+ |
| **First Contentful Paint (FCP)** | <2 seconds (4G) |
| **Largest Contentful Paint (LCP)** | <2.5 seconds |
| **Cumulative Layout Shift (CLS)** | <0.1 |
| **API Response Time** | <500ms (95th percentile) |
| **Database Query Time** | <100ms |
| **Bundle Size** | <200KB gzipped |
| **Mobile Performance** | 4G optimized |
| **Uptime** | 99.5% monthly |
| **Page Load Time** | <3 seconds |

---

## 🧪 Testing Strategy

### Unit Testing
- Component rendering
- Hook functionality
- Utility functions
- Target: 70%+ coverage
- Tool: Vitest

### Integration Testing
- Component + hook interaction
- State management
- API call handling
- Error scenarios
- Tool: Vitest + React Testing Library

### E2E Testing
- Critical user flows
- Multi-step processes
- Form submissions
- Authentication
- Tool: Playwright

### Load Testing
- 100+ concurrent users
- Database query performance
- API endpoint stress testing
- Cache effectiveness

### Security Testing
- OWASP Top 10
- SQL injection tests
- XSS prevention
- CSRF protection
- Authentication flow

---

## 🚀 Deployment

### Environment Setup
- **Dev:** Local development with Supabase local
- **Staging:** Vercel preview, separate Supabase project
- **Production:** Vercel, production Supabase

### CI/CD Pipeline
- GitHub Actions on push to main
- Run ESLint + TypeScript checks
- Run test suite
- Build Next.js app
- Deploy to Vercel preview
- Manual approval for production

### Database Migrations
- Test on staging first
- Run migrations before deployment
- Backup before each migration
- Rollback plan in place

### Monitoring & Alerts
- Vercel Analytics for performance
- Sentry for error tracking
- Uptime monitoring (99.5% target)
- Alert on: API errors, high latency, database connection issues

---

## 📋 GitHub Issues

### Phase 1 Issues
| # | Title | Hours | Owner |
|---|-------|-------|-------|
| 1 | Project Setup & Authentication | 16 | Lead Dev |
| 2 | Database Schema Design | 12 | DB Architect |

### Phase 2 Issues
| # | Title | Hours | Owner |
|---|-------|-------|-------|
| 3 | Lead Management Pipeline | 24 | Frontend Dev |
| 4 | Property Listing Module | 20 | Frontend Dev |

### Phase 3 Issues
| # | Title | Hours | Owner |
|---|-------|-------|-------|
| 5 | RESO Web API Integration | 20 | Backend Dev |
| 6 | Automated Lead Scoring | 16 | Full Stack |
| 7 | Broker Dashboard | 24 | Frontend Dev |
| 8 | Calendar Integration | 18 | Full Stack |
| 9 | Communication Hub | 16 | Backend Dev |

### Phase 4 Issues
| # | Title | Hours | Owner |
|---|-------|-------|-------|
| 10 | Performance Optimization | 16 | DevOps |
| 11 | Security Audit & Compliance | 12 | Security |
| 12 | E2E Testing & QA | 20 | QA Engineer |

---

## ✅ Acceptance Criteria

### Phase 1 Complete When:
- ✅ Users can sign up/login
- ✅ All database tables created
- ✅ RLS policies working
- ✅ Protected routes functional
- ✅ ESLint/Prettier configured
- ✅ TypeScript strict mode enabled

### Phase 2 Complete When:
- ✅ Agent dashboard displays KPIs
- ✅ Lead pipeline drag-drop works
- ✅ CSV import processes 10k leads in <30s
- ✅ Property grid has search/filters
- ✅ All pages responsive on mobile
- ✅ Lighthouse score ≥90
- ✅ All user workflows tested

### Phase 3 Complete When:
- ✅ MLS data syncs every 15 min
- ✅ Lead scores calculate in real-time
- ✅ Broker dashboard shows team metrics
- ✅ Calendar syncs with Google/Outlook
- ✅ Task reminders send at correct times
- ✅ SMS delivery tracked
- ✅ All APIs integrated and tested

### Phase 4 Complete When:
- ✅ Lighthouse performance ≥90
- ✅ All critical user flows tested
- ✅ Security audit completed
- ✅ GDPR/CCPA compliance verified
- ✅ Zero critical bugs first week
- ✅ Deployed to production
- ✅ User documentation complete

---

## 📅 Weekly Timeline

| Week | Phase | Focus | Deliverable |
|------|-------|-------|-------------|
| 1-2 | 1 | Foundation | Auth, DB, infrastructure |
| 3 | 2 | Dashboard | Agent dashboard MVP |
| 4 | 2 | Leads | Pipeline, detail page |
| 5 | 2 | Properties | Listings, import |
| 6 | 3 | Integrations | MLS API, lead scoring |
| 7 | 3 | Advanced | Broker dashboard, calendar |
| 8 | 3 | Finishing | Messaging, analytics |
| 9 | 4 | Testing | QA, bug fixes |
| 10 | 4 | Launch | Performance, deployment |

---

## 📚 Documentation

### For Developers
- Architecture guide (folder structure, patterns, naming conventions)
- Component development guide (templates, best practices)
- API documentation (endpoints, authentication, errors)
- Database schema documentation (tables, relationships, RLS)
- Deployment guide (CI/CD, environment setup)

### For Users
- Feature walkthroughs (video + screenshots)
- FAQ (common questions)
- Video tutorials (lead management, property searches)
- User guide (how to use each feature)
- Troubleshooting (common issues, solutions)

### For Operations
- Deployment runbook
- Monitoring setup
- Backup procedures
- Disaster recovery plan
- Incident response plan

---

## 💰 Resource Requirements

### Development Team
- **1 Full-stack Developer** (primary)
- **Cursor AI** (assistant)
- **Part-time** Project Manager (oversight)

### Infrastructure
- Vercel (hosting) - $20-50/month
- Supabase (database) - $10-25/month
- Custom domain - $10-20/year
- Email service (SendGrid) - $20-50/month
- SMS service (Twilio) - $0.01-0.02 per message

### Total Cost
- **Development:** ~1,200 hours × $50 = $60,000
- **Infrastructure (Year 1):** ~$1,000-2,000
- **Total Year 1:** ~$61,000-62,000

---

## 🎯 Success Metrics

### Code Quality
- TypeScript strict mode enabled
- ESLint passing
- 70%+ test coverage
- No "any" types
- No console.logs in production

### Performance
- Lighthouse Performance: 90+
- API response time: <500ms
- Bundle size: <200KB gzipped
- First load: <3 seconds
- Mobile: 4G optimized

### User Experience
- Mobile responsive
- Accessible (WCAG AA)
- No broken features
- Fast searches (results <500ms)
- Smooth animations

### Security
- GDPR/CCPA compliant
- No critical vulnerabilities
- All data encrypted
- Audit logs comprehensive
- RLS policies working

### Business
- Zero critical bugs (first month)
- 90%+ user adoption
- 99.5% uptime
- <30s lead import time
- <15min MLS sync time

---

## 🚫 Out of Scope

- Mobile native apps (iOS/Android)
- Video conferencing
- Document collaboration (Google Docs)
- Accounting/bookkeeping
- Blockchain integration
- AI chatbots
- Custom CRM plugins
- Multi-tenant architecture (single-broker only)
- Offline mode
- Dark mode theme

---

## 📞 Support & Maintenance

### During Development
- Daily monitoring and testing
- Weekly sync meetings
- Bug fixes within 24 hours (critical)
- Feature updates every 2 weeks

### Post-Launch (Month 1-3)
- Daily monitoring
- Weekly check-ins with stakeholders
- Bug hotfixes within 24 hours
- Performance monitoring
- User feedback collection

### Ongoing
- Monthly security patches
- Quarterly feature releases
- Quarterly database optimization
- Annual security audit
- Daily uptime monitoring

---

## 📝 Sign-Off

**Project Owner:**
- Name: _________________
- Signature: _________________
- Date: _________________

**Development Lead:**
- Name: _________________
- Signature: _________________
- Date: _________________

**Approved By:**
- Name: _________________
- Signature: _________________
- Date: _________________

---

**Version:** 1.0
**Date:** February 2026
**Status:** Ready for Development
**Next Step:** Review and sign off, then begin Phase 1

