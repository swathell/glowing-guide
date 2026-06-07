alter table customers enable row level security;
alter table service_packages enable row level security;
alter table bookings enable row level security;
alter table booking_conditions enable row level security;
alter table booking_photos enable row level security;
alter table payments enable row level security;
alter table booking_events enable row level security;

-- This project currently writes and reads booking data from trusted server-side routes
-- using the Supabase service role key. No public client-side table access is required yet.
-- Leave anon/authenticated access closed until a real customer or admin portal exists.
