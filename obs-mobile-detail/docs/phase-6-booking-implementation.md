# Phase 6 Booking Implementation Package

This package turns the live marketing shell into a build-ready booking system plan for Next.js, Vercel, Supabase, and Stripe.

## Data Model

Source files:
- `supabase/booking-schema.sql`
- `src/lib/booking/types.ts`
- `src/lib/booking/config.ts`

Core records:
- `customers`
- `service_packages`
- `bookings`
- `booking_conditions`
- `booking_photos`
- `payments`
- `booking_events`

Storage:
- private Supabase bucket: `booking-photos`

## Form Flow

1. Service selection
2. Vehicle details
3. Condition details
4. Location
5. Schedule
6. Contact
7. Review summary
8. Payment when required
9. Confirmation

Branch behavior:
- `direct_book`: goes to slot selection and can confirm without Stripe
- `deposit_required`: goes to slot selection and Stripe Checkout
- `manual_review`: skips live scheduling, collects photos/date range, and lands in owner review

Source files:
- `src/lib/booking/config.ts`
- `src/lib/booking/form.ts`

## API / Backend Requirements

Recommended route handlers:

- `POST /api/bookings/draft`
  - Create or update draft booking
  - Validate service package
  - Save partial progress

- `POST /api/bookings/classify`
  - Run booking rule engine
  - Return mode, surcharge, deposit, and review reasons

- `POST /api/bookings/upload`
  - Validate and upload files to Supabase Storage
  - Persist photo records

- `POST /api/bookings/submit`
  - Persist customer and booking state
  - Branch into direct-book, deposit-required, or manual-review submit path

- `POST /api/payments/checkout`
  - Create Stripe Checkout session for deposits
  - Move booking to `awaiting_deposit`

- `POST /api/stripe/webhook`
  - Verify Stripe signature
  - Mark payment paid
  - Confirm booking
  - Trigger notifications

- `POST /api/bookings/quote`
  - Owner/admin approval path for manual-review jobs
  - Set final price, deposit, and next step

## Stripe Logic

Use Stripe Checkout for deposits.

No deposit by default:
- Basic Interior
- Premium Interior
- Basic Full Detail
- Premium Full Detail
- Headlight Restoration
- Engine Bay Cleaning
- Wheel & Tire Coating
- Windshield Coating

Deposit required:
- Exterior Ceramic Coating
- Correction + Ceramic Coating
- 1-Step Correction
- 2-Step Correction
- 3-Step Correction

Manual review with post-approval deposit:
- Boat
- RV
- Food Truck
- Out-of-scope or high-risk jobs

Current recommendation:
- Fixed `C$50` deposits for ceramic/correction
- `20%` deposit for manual-review specialty jobs after owner approval

## Notification Workflow

Customer templates:
- `booking-submitted`
- `manual-review-received`
- `deposit-required`
- `deposit-confirmed`
- `booking-confirmed`
- `quote-ready`
- `reschedule-confirmed`
- `booking-cancelled`

Owner templates:
- `new-direct-booking`
- `new-manual-review`
- `deposit-paid`
- `deposit-failed`
- `quote-request`
- `reschedule-request`
- `cancellation-request`

Recommended provider:
- `Resend`

## Edge Cases

- Vans and trucks get `+C$35`
- Boats, RVs, food trucks always require manual review
- Mold or biohazard always requires manual review
- Three or more heavy-condition flags force manual review
- Out-of-area locations force manual review
- Stripe webhook is the payment source of truth
- Draft bookings should expire if deposit is not completed

## Build Notes

Recommended coding order:

1. Apply `supabase/booking-schema.sql`
2. Seed `service_packages`
3. Add Supabase server client helpers
4. Implement `booking-rules.ts`
5. Build the multi-step intake form
6. Add draft save and classify endpoints
7. Add Stripe Checkout flow
8. Add manual-review submit path
9. Add email notifications
10. Add a simple owner booking view

Assumptions:
- Calendar selection can start simple
- Owner operations remain email-first before a full internal dashboard
- The current page shell stays in place and receives the interactive flow next
