# GitHub + Vercel Push Checklist

## What to push

Push the full `obs-mobile-detail` project folder contents to your GitHub repository root.

Important:
- The Next.js app should live at the repo root
- Do not push only `src/`
- Do not omit `package.json`
- Do not omit `supabase/` and `docs/`

## Before pushing

1. Confirm these files exist:
   - `package.json`
   - `.env.example`
   - `src/app/book/page.tsx`
   - `src/components/bookings/booking-form.tsx`
   - `src/app/api/bookings/classify/route.ts`
   - `src/app/api/bookings/submit/route.ts`
   - `src/app/api/bookings/upload/route.ts`
   - `src/app/api/payments/checkout/route.ts`
   - `src/app/api/stripe/webhook/route.ts`
   - `src/app/api/analytics/track/route.ts`
   - `src/app/admin/bookings/page.tsx`
   - `supabase/booking-schema.sql`
   - `supabase/seed-service-packages.sql`
   - `supabase/booking-policies.sql`
   - `supabase/storage-setup.sql`
   - `supabase/analytics-schema.sql`

2. If you are replacing an older repo structure:
   - remove any duplicate nested app folder
   - keep only one active Next.js app

## After pushing

1. In Vercel, set the project root to the app root if needed
2. Add all required environment variables
3. Redeploy

## Required Vercel environment variables

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

## Supabase steps

Run these in order:

1. `supabase/booking-schema.sql`
2. `supabase/seed-service-packages.sql`
3. `supabase/booking-policies.sql`
4. `supabase/storage-setup.sql`
5. `supabase/analytics-schema.sql`

## Stripe steps

1. Create a webhook endpoint:
   - `/api/stripe/webhook`
2. Add success URL:
   - `/book/success`
3. Add cancel URL:
   - `/book/cancelled`

## Smoke test after deploy

1. Open `/book`
2. Test a standard direct-book package
3. Test a deposit-required package
4. Test a manual-review package like boat or RV
5. Test image upload
6. Confirm owner email alert
7. Confirm customer email
