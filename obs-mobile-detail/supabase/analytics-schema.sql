create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  page_path text not null,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_name on analytics_events(event_name);
create index if not exists idx_analytics_events_created_at on analytics_events(created_at desc);
