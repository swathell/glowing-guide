# Phase 6 Setup Notes

## Required environment variables

Use `.env.local` locally and Vercel project environment variables in production.

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `BOOKING_ALERT_EMAIL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## Supabase setup

1. Run `supabase/booking-schema.sql`
2. Run `supabase/seed-service-packages.sql`
3. Run `supabase/analytics-schema.sql`
4. Create private storage bucket: `booking-photos`

## Stripe setup

1. Create a Stripe account and enable CAD payments
2. Add checkout success URL:
   - `/book/success`
3. Add checkout cancel URL:
   - `/book/cancelled`
4. Point Stripe webhook to:
   - `/api/stripe/webhook`

## Resend setup

1. Verify a sending domain
2. Update the `from` address in `src/lib/booking/email.ts` if needed

## Current operational scope

- Standard services can submit directly
- Deposit-required services redirect to Stripe Checkout
- Manual-review jobs store intake and photo data, then notify the owner
- Owner access is available at `/admin/bookings` with basic auth credentials from environment variables
