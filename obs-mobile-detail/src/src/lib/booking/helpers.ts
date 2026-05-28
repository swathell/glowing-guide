import { bookingPackages } from "@/lib/booking/config";
import { BookingClassification } from "@/lib/booking/types";

export function getPackageById(id: string) {
  return bookingPackages.find((item) => item.id === id);
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(cents / 100);
}

export function createPublicReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `OBS-${stamp}-${rand}`;
}

export function estimateTotalCents(basePriceCents: number, classification: BookingClassification) {
  return basePriceCents + classification.surchargeCents;
}
