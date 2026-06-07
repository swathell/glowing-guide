export const customerTemplates = [
  "booking-submitted",
  "manual-review-received",
  "deposit-required",
  "deposit-confirmed",
  "booking-confirmed",
  "quote-ready",
  "reschedule-confirmed",
  "booking-cancelled"
] as const;

export const ownerTemplates = [
  "new-direct-booking",
  "new-manual-review",
  "deposit-paid",
  "deposit-failed",
  "quote-request",
  "reschedule-request",
  "cancellation-request"
] as const;
