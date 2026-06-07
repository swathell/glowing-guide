create extension if not exists pgcrypto;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  preferred_contact_method text not null check (
    preferred_contact_method in ('phone', 'text', 'email', 'whatsapp')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists service_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_slug text not null,
  name text not null,
  booking_mode text not null check (
    booking_mode in ('direct_book', 'deposit_required', 'manual_review')
  ),
  base_price_cents integer not null,
  duration_minutes integer not null,
  deposit_type text not null check (
    deposit_type in ('none', 'fixed', 'percent')
  ),
  deposit_value integer not null default 0,
  requires_photos boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  customer_id uuid not null references customers(id),
  service_package_id uuid not null references service_packages(id),
  status text not null check (
    status in (
      'draft',
      'submitted',
      'pending_review',
      'awaiting_deposit',
      'confirmed',
      'quoted',
      'reschedule_requested',
      'cancelled',
      'completed',
      'refunded'
    )
  ),
  booking_mode_final text not null check (
    booking_mode_final in ('direct_book', 'deposit_required', 'manual_review')
  ),
  vehicle_type text not null,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year text not null,
  vehicle_size_class text,
  service_city text not null,
  service_postal_code text not null,
  service_address text not null,
  location_type text not null check (
    location_type in ('home', 'condo', 'office', 'commercial', 'other')
  ),
  access_notes text not null default '',
  preferred_date date,
  preferred_time_slot text,
  requested_date_range_start date,
  requested_date_range_end date,
  scheduled_start timestamptz,
  scheduled_end timestamptz,
  estimated_total_cents integer not null default 0,
  final_total_cents integer,
  vehicle_surcharge_cents integer not null default 0,
  deposit_required_cents integer not null default 0,
  deposit_paid_cents integer not null default 0,
  pay_later_allowed boolean not null default true,
  notes_customer text not null default '',
  notes_internal text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists booking_conditions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  pet_hair boolean not null default false,
  heavy_stains boolean not null default false,
  odor boolean not null default false,
  mold_or_biohazard boolean not null default false,
  heavy_salt_buildup boolean not null default false,
  heavy_exterior_contamination boolean not null default false,
  custom_scope_requested boolean not null default false,
  interior_condition_level text not null check (
    interior_condition_level in ('standard', 'moderate', 'heavy')
  ),
  exterior_condition_level text not null check (
    exterior_condition_level in ('standard', 'moderate', 'heavy')
  )
);

create table if not exists booking_photos (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes integer not null,
  photo_kind text not null check (
    photo_kind in ('interior', 'exterior', 'damage', 'specialty', 'other')
  ),
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  provider text not null default 'stripe' check (
    provider in ('stripe')
  ),
  payment_type text not null check (
    payment_type in ('deposit', 'full')
  ),
  status text not null check (
    status in ('pending', 'paid', 'failed', 'refunded', 'cancelled')
  ),
  amount_cents integer not null,
  currency text not null default 'cad',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  receipt_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists booking_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  event_type text not null check (
    event_type in (
      'submitted',
      'flagged_for_review',
      'deposit_requested',
      'deposit_paid',
      'confirmed',
      'quote_sent',
      'rescheduled',
      'cancelled',
      'completed'
    )
  ),
  actor_type text not null check (
    actor_type in ('system', 'customer', 'admin')
  ),
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_bookings_customer_id on bookings(customer_id);
create index if not exists idx_bookings_service_package_id on bookings(service_package_id);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_bookings_created_at on bookings(created_at desc);
create index if not exists idx_booking_photos_booking_id on booking_photos(booking_id);
create index if not exists idx_payments_booking_id on payments(booking_id);
create index if not exists idx_booking_events_booking_id on booking_events(booking_id);
