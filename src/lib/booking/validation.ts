import { z } from "zod";
import { bookingPackages } from "@/lib/booking/config";

const packageIds = bookingPackages.map((item) => item.id) as [string, ...string[]];

export const bookingDraftSchema = z.object({
  servicePackageId: z.enum(packageIds),
  vehicle: z.object({
    vehicleType: z.enum([
      "sedan",
      "coupe",
      "small_suv",
      "mid_suv",
      "large_suv",
      "pickup_truck",
      "van",
      "boat",
      "rv",
      "food_truck",
      "other"
    ]),
    vehicleMake: z.string().min(1).max(60),
    vehicleModel: z.string().min(1).max(60),
    vehicleYear: z.string().min(4).max(4)
  }),
  conditions: z.object({
    petHair: z.boolean(),
    heavyStains: z.boolean(),
    odor: z.boolean(),
    moldOrBiohazard: z.boolean(),
    heavySaltBuildup: z.boolean(),
    heavyExteriorContamination: z.boolean(),
    customScopeRequested: z.boolean(),
    interiorConditionLevel: z.enum(["standard", "moderate", "heavy"]),
    exteriorConditionLevel: z.enum(["standard", "moderate", "heavy"])
  }),
  location: z.object({
    city: z.string().min(1).max(60),
    postalCode: z.string().min(3).max(12),
    address: z.string().min(3).max(200),
    locationType: z.enum(["home", "condo", "office", "commercial", "other"]),
    accessNotes: z.string().max(400)
  })
});

export const bookingSubmitSchema = bookingDraftSchema.extend({
  schedule: z.object({
    preferredDate: z.string().optional(),
    preferredTimeSlot: z.string().optional(),
    requestedDateRangeStart: z.string().optional(),
    requestedDateRangeEnd: z.string().optional()
  }),
  customer: z.object({
    firstName: z.string().min(1).max(60),
    lastName: z.string().min(1).max(60),
    email: z.string().email(),
    phone: z.string().min(7).max(30),
    preferredContactMethod: z.enum(["phone", "text", "email", "whatsapp"])
  }),
  notesCustomer: z.string().max(1000).default(""),
  uploadedPhotos: z
    .array(
      z.object({
        path: z.string().min(1),
        fileName: z.string().min(1),
        mimeType: z.string().min(1),
        sizeBytes: z.number().int().nonnegative(),
        photoKind: z.enum(["interior", "exterior", "damage", "specialty", "other"])
      })
    )
    .default([])
});

export const checkoutSchema = z.object({
  bookingId: z.string().uuid()
});
