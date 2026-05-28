import { BookingStepDefinition, ServicePackageRecord } from "@/lib/booking/types";

export const bookingSteps: BookingStepDefinition[] = [
  {
    id: "service",
    label: "Select service",
    description: "Choose a package and expose whether it is direct-book, deposit-based, or review-led."
  },
  {
    id: "vehicle",
    label: "Vehicle details",
    description: "Collect vehicle type, make, model, and year before any pricing logic runs."
  },
  {
    id: "condition",
    label: "Condition details",
    description: "Gather the condition flags that affect scope, review routing, and photo requirements."
  },
  {
    id: "location",
    label: "Location",
    description: "Confirm service area, property type, and access constraints."
  },
  {
    id: "schedule",
    label: "Schedule",
    description: "Direct-book flows get live slot selection. Review-led flows submit a preferred date range."
  },
  {
    id: "contact",
    label: "Contact details",
    description: "Collect the customer identity and preferred communication method."
  },
  {
    id: "review",
    label: "Review summary",
    description: "Show the owner-facing outcome before submit, including surcharge or review reasons."
  },
  {
    id: "payment",
    label: "Payment",
    description: "Deposit-required flows go to Stripe Checkout. Pay-later flows skip this step."
  },
  {
    id: "confirmation",
    label: "Confirmation",
    description: "Show the correct end state: confirmed, awaiting deposit, or pending review."
  }
];

export const bookingPackages: ServicePackageRecord[] = [
  {
    id: "basic-interior-detail",
    slug: "basic-interior-detail",
    categorySlug: "interior-detailing",
    name: "Basic Interior Detail",
    bookingMode: "direct_book",
    basePriceCents: 15000,
    durationMinutes: 90,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "premium-interior-detail",
    slug: "premium-interior-detail",
    categorySlug: "interior-detailing",
    name: "Premium Interior Detail",
    bookingMode: "direct_book",
    basePriceCents: 20000,
    durationMinutes: 150,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "basic-full-detail",
    slug: "basic-full-detail",
    categorySlug: "full-detail",
    name: "Basic Full Detail",
    bookingMode: "direct_book",
    basePriceCents: 20000,
    durationMinutes: 180,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "premium-full-detail",
    slug: "premium-full-detail",
    categorySlug: "full-detail",
    name: "Premium Full Detail",
    bookingMode: "direct_book",
    basePriceCents: 25000,
    durationMinutes: 240,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "exterior-ceramic-coating",
    slug: "exterior-ceramic-coating",
    categorySlug: "ceramic-protection",
    name: "Exterior Ceramic Coating",
    bookingMode: "deposit_required",
    basePriceCents: 27500,
    durationMinutes: 150,
    depositType: "fixed",
    depositValue: 5000,
    requiresPhotos: false,
    active: true
  },
  {
    id: "correction-plus-ceramic-coating",
    slug: "correction-plus-ceramic-coating",
    categorySlug: "ceramic-protection",
    name: "Correction + Ceramic Coating",
    bookingMode: "deposit_required",
    basePriceCents: 52500,
    durationMinutes: 330,
    depositType: "fixed",
    depositValue: 5000,
    requiresPhotos: false,
    active: true
  },
  {
    id: "paint-correction-1-step",
    slug: "paint-correction-1-step",
    categorySlug: "paint-correction",
    name: "1-Step Correction",
    bookingMode: "deposit_required",
    basePriceCents: 25000,
    durationMinutes: 240,
    depositType: "fixed",
    depositValue: 5000,
    requiresPhotos: false,
    active: true
  },
  {
    id: "paint-correction-2-step",
    slug: "paint-correction-2-step",
    categorySlug: "paint-correction",
    name: "2-Step Correction",
    bookingMode: "deposit_required",
    basePriceCents: 35000,
    durationMinutes: 360,
    depositType: "fixed",
    depositValue: 5000,
    requiresPhotos: false,
    active: true
  },
  {
    id: "paint-correction-3-step",
    slug: "paint-correction-3-step",
    categorySlug: "paint-correction",
    name: "3-Step Correction",
    bookingMode: "deposit_required",
    basePriceCents: 45000,
    durationMinutes: 480,
    depositType: "fixed",
    depositValue: 5000,
    requiresPhotos: false,
    active: true
  },
  {
    id: "wheel-and-tire-coating",
    slug: "wheel-and-tire-coating",
    categorySlug: "ceramic-protection",
    name: "Wheel & Tire Coating",
    bookingMode: "direct_book",
    basePriceCents: 10000,
    durationMinutes: 60,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "windshield-coating",
    slug: "windshield-coating",
    categorySlug: "ceramic-protection",
    name: "Windshield Coating",
    bookingMode: "direct_book",
    basePriceCents: 10000,
    durationMinutes: 60,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "headlight-restoration",
    slug: "headlight-restoration",
    categorySlug: "add-ons",
    name: "Headlight Restoration",
    bookingMode: "direct_book",
    basePriceCents: 6000,
    durationMinutes: 60,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "engine-bay-cleaning",
    slug: "engine-bay-cleaning",
    categorySlug: "add-ons",
    name: "Engine Bay Cleaning",
    bookingMode: "direct_book",
    basePriceCents: 5000,
    durationMinutes: 60,
    depositType: "none",
    depositValue: 0,
    requiresPhotos: false,
    active: true
  },
  {
    id: "boat-detailing",
    slug: "boat-detailing",
    categorySlug: "specialty-vehicles",
    name: "Boat Detailing",
    bookingMode: "manual_review",
    basePriceCents: 27500,
    durationMinutes: 180,
    depositType: "percent",
    depositValue: 20,
    requiresPhotos: true,
    active: true
  },
  {
    id: "rv-detailing",
    slug: "rv-detailing",
    categorySlug: "specialty-vehicles",
    name: "RV Detailing",
    bookingMode: "manual_review",
    basePriceCents: 42500,
    durationMinutes: 300,
    depositType: "percent",
    depositValue: 20,
    requiresPhotos: true,
    active: true
  },
  {
    id: "food-truck-detailing",
    slug: "food-truck-detailing",
    categorySlug: "specialty-vehicles",
    name: "Food Truck Detailing",
    bookingMode: "manual_review",
    basePriceCents: 52500,
    durationMinutes: 360,
    depositType: "percent",
    depositValue: 20,
    requiresPhotos: true,
    active: true
  }
];

export const gtaServiceArea = [
  "Toronto",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Oakville",
  "North York",
  "Scarborough"
];
