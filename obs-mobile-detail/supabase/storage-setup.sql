insert into storage.buckets (id, name, public)
values ('booking-photos', 'booking-photos', false)
on conflict (id) do nothing;

-- Storage access is handled server-side through the service role key.
-- Keep this bucket private and use signed URLs later for admin viewing if needed.
