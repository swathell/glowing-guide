import {
  BookingClassification,
  BookingIntakeInput,
  BookingMode,
  ReviewReason,
  VehicleType
} from "@/lib/booking/types";
import { gtaServiceArea } from "@/lib/booking/config";

const LARGE_VEHICLE_SURCHARGE_CENTS = 3500;
const DEFAULT_FIXED_DEPOSIT_CENTS = 5000;

const specialtyVehicles = new Set<VehicleType>(["boat", "rv", "food_truck", "other"]);
const surchargeVehicles = new Set<VehicleType>(["pickup_truck", "van"]);

function cityWithinServiceArea(city: string) {
  return gtaServiceArea.some((entry) => entry.toLowerCase() === city.trim().toLowerCase());
}

function hasHeavyCondition(input: BookingIntakeInput) {
  const { conditions } = input;
  const heavyToggleCount = [
    conditions.petHair,
    conditions.heavyStains,
    conditions.odor,
    conditions.heavySaltBuildup,
    conditions.heavyExteriorContamination
  ].filter(Boolean).length;

  return (
    conditions.interiorConditionLevel === "heavy" ||
    conditions.exteriorConditionLevel === "heavy" ||
    heavyToggleCount >= 3
  );
}

function calculateDepositCents(mode: BookingMode, input: BookingIntakeInput) {
  if (mode === "direct_book") {
    return 0;
  }

  if (input.servicePackage.depositType === "fixed") {
    return input.servicePackage.depositValue || DEFAULT_FIXED_DEPOSIT_CENTS;
  }

  if (input.servicePackage.depositType === "percent") {
    return Math.round(input.servicePackage.basePriceCents * (input.servicePackage.depositValue / 100));
  }

  return 0;
}

export function classifyBooking(input: BookingIntakeInput): BookingClassification {
  const reviewReasons: ReviewReason[] = [];
  const vehicleType = input.vehicle.vehicleType;

  let finalMode: BookingMode = input.servicePackage.bookingMode;
  let surchargeCents = 0;
  let photosRequired = input.servicePackage.requiresPhotos;
  let calendarAccessAllowed = finalMode !== "manual_review";

  if (!cityWithinServiceArea(input.location.city)) {
    finalMode = "manual_review";
    calendarAccessAllowed = false;
    reviewReasons.push("outside_service_area");
  }

  if (specialtyVehicles.has(vehicleType)) {
    finalMode = "manual_review";
    calendarAccessAllowed = false;
    photosRequired = true;
    reviewReasons.push("specialty_vehicle", "photos_required", "manual_quote_required");
  }

  if (surchargeVehicles.has(vehicleType)) {
    surchargeCents += LARGE_VEHICLE_SURCHARGE_CENTS;
    reviewReasons.push("vehicle_surcharge");
  }

  if (input.conditions.moldOrBiohazard) {
    finalMode = "manual_review";
    calendarAccessAllowed = false;
    photosRequired = true;
    reviewReasons.push("mold_or_biohazard", "photos_required", "manual_quote_required");
  } else if (hasHeavyCondition(input)) {
    if (finalMode === "direct_book") {
      finalMode = "manual_review";
      calendarAccessAllowed = false;
    }
    photosRequired = true;
    reviewReasons.push("heavy_condition", "photos_required");
  }

  if (input.conditions.customScopeRequested) {
    finalMode = "manual_review";
    calendarAccessAllowed = false;
    reviewReasons.push("custom_scope", "manual_quote_required");
  }

  if (finalMode === "deposit_required") {
    calendarAccessAllowed = true;
  }

  return {
    finalMode,
    surchargeCents,
    depositRequiredCents: calculateDepositCents(finalMode, input),
    payLaterAllowed: finalMode !== "deposit_required",
    photosRequired,
    calendarAccessAllowed,
    reviewReasons: Array.from(new Set(reviewReasons))
  };
}
