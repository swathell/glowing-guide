export type BookingMode = "direct_book" | "deposit_required" | "manual_review";

export type DepositType = "none" | "fixed" | "percent";

export type BookingStatus =
  | "draft"
  | "submitted"
  | "pending_review"
  | "awaiting_deposit"
  | "confirmed"
  | "quoted"
  | "reschedule_requested"
  | "cancelled"
  | "completed"
  | "refunded";

export type VehicleType =
  | "sedan"
  | "coupe"
  | "small_suv"
  | "mid_suv"
  | "large_suv"
  | "pickup_truck"
  | "van"
  | "boat"
  | "rv"
  | "food_truck"
  | "other";

export type LocationType = "home" | "condo" | "office" | "commercial" | "other";

export type ContactMethod = "phone" | "text" | "email" | "whatsapp";

export type ConditionLevel = "standard" | "moderate" | "heavy";

export type ReviewReason =
  | "vehicle_surcharge"
  | "specialty_vehicle"
  | "outside_service_area"
  | "heavy_condition"
  | "mold_or_biohazard"
  | "custom_scope"
  | "photos_required"
  | "manual_quote_required";

export type ServicePackageRecord = {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  bookingMode: BookingMode;
  basePriceCents: number;
  durationMinutes: number;
  depositType: DepositType;
  depositValue: number;
  requiresPhotos: boolean;
  active: boolean;
};

export type BookingConditionInput = {
  petHair: boolean;
  heavyStains: boolean;
  odor: boolean;
  moldOrBiohazard: boolean;
  heavySaltBuildup: boolean;
  heavyExteriorContamination: boolean;
  customScopeRequested: boolean;
  interiorConditionLevel: ConditionLevel;
  exteriorConditionLevel: ConditionLevel;
};

export type BookingLocationInput = {
  city: string;
  postalCode: string;
  address: string;
  locationType: LocationType;
  accessNotes: string;
};

export type BookingVehicleInput = {
  vehicleType: VehicleType;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
};

export type BookingCustomerInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: ContactMethod;
};

export type BookingIntakeInput = {
  servicePackage: ServicePackageRecord;
  vehicle: BookingVehicleInput;
  conditions: BookingConditionInput;
  location: BookingLocationInput;
};

export type BookingClassification = {
  finalMode: BookingMode;
  surchargeCents: number;
  depositRequiredCents: number;
  payLaterAllowed: boolean;
  photosRequired: boolean;
  calendarAccessAllowed: boolean;
  reviewReasons: ReviewReason[];
};

export type BookingStepId =
  | "service"
  | "vehicle"
  | "condition"
  | "location"
  | "schedule"
  | "contact"
  | "review"
  | "payment"
  | "confirmation";

export type BookingStepDefinition = {
  id: BookingStepId;
  label: string;
  description: string;
};
