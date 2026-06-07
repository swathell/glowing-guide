# OBS Mobile Detailing

Next.js + Tailwind production shell for a Vercel deployment.

## Included

- Homepage and core marketing pages
- Dynamic service category routes
- Dynamic service-area routes
- Booking page shell for the upcoming intake flow
- SEO foundations via metadata, `robots.ts`, and `sitemap.ts`
- Local image assets copied from the provided reference material

## Before Deploying

1. Install dependencies with `npm install`
2. Run locally with `npm run dev`
3. Connect the booking backend pieces that are still pending:
   - Supabase database and storage
   - Stripe deposit flow
   - Email notifications
   - Admin workflow
4. Add final production copy and real business review/gallery data

## Phase 6 setup files

Use these during production setup:

- `supabase/booking-schema.sql`
- `supabase/seed-service-packages.sql`
- `supabase/booking-policies.sql`
- `supabase/storage-setup.sql`
- `docs/phase-6-setup-notes.md`
- `docs/github-vercel-push-checklist.md`

## Notes

- This bundle does not include `node_modules`
- Package installation could not be run in this environment because registry access was blocked
- The site shell is structured for Vercel and ready for the next implementation pass
