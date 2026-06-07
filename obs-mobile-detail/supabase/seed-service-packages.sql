insert into service_packages (
  slug,
  category_slug,
  name,
  booking_mode,
  base_price_cents,
  duration_minutes,
  deposit_type,
  deposit_value,
  requires_photos,
  active
)
values
  ('basic-interior-detail', 'interior-detailing', 'Basic Interior Detail', 'direct_book', 15000, 90, 'none', 0, false, true),
  ('premium-interior-detail', 'interior-detailing', 'Premium Interior Detail', 'direct_book', 20000, 150, 'none', 0, false, true),
  ('basic-full-detail', 'full-detail', 'Basic Full Detail', 'direct_book', 20000, 180, 'none', 0, false, true),
  ('premium-full-detail', 'full-detail', 'Premium Full Detail', 'direct_book', 25000, 240, 'none', 0, false, true),
  ('exterior-ceramic-coating', 'ceramic-protection', 'Exterior Ceramic Coating', 'deposit_required', 27500, 150, 'fixed', 5000, false, true),
  ('correction-plus-ceramic-coating', 'ceramic-protection', 'Correction + Ceramic Coating', 'deposit_required', 52500, 330, 'fixed', 5000, false, true),
  ('paint-correction-1-step', 'paint-correction', '1-Step Correction', 'deposit_required', 25000, 240, 'fixed', 5000, false, true),
  ('paint-correction-2-step', 'paint-correction', '2-Step Correction', 'deposit_required', 35000, 360, 'fixed', 5000, false, true),
  ('paint-correction-3-step', 'paint-correction', '3-Step Correction', 'deposit_required', 45000, 480, 'fixed', 5000, false, true),
  ('wheel-and-tire-coating', 'ceramic-protection', 'Wheel & Tire Coating', 'direct_book', 10000, 60, 'none', 0, false, true),
  ('windshield-coating', 'ceramic-protection', 'Windshield Coating', 'direct_book', 10000, 60, 'none', 0, false, true),
  ('headlight-restoration', 'add-ons', 'Headlight Restoration', 'direct_book', 6000, 60, 'none', 0, false, true),
  ('engine-bay-cleaning', 'add-ons', 'Engine Bay Cleaning', 'direct_book', 5000, 60, 'none', 0, false, true),
  ('boat-detailing', 'specialty-vehicles', 'Boat Detailing', 'manual_review', 27500, 180, 'percent', 20, true, true),
  ('rv-detailing', 'specialty-vehicles', 'RV Detailing', 'manual_review', 42500, 300, 'percent', 20, true, true),
  ('food-truck-detailing', 'specialty-vehicles', 'Food Truck Detailing', 'manual_review', 52500, 360, 'percent', 20, true, true)
on conflict (slug) do update set
  category_slug = excluded.category_slug,
  name = excluded.name,
  booking_mode = excluded.booking_mode,
  base_price_cents = excluded.base_price_cents,
  duration_minutes = excluded.duration_minutes,
  deposit_type = excluded.deposit_type,
  deposit_value = excluded.deposit_value,
  requires_photos = excluded.requires_photos,
  active = excluded.active;
