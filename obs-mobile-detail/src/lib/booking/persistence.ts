import { getSupabaseAdminClient } from "@/lib/supabase";
import { BookingClassification } from "@/lib/booking/types";
import { createPublicReference, estimateTotalCents } from "@/lib/booking/helpers";
import { bookingSubmitSchema } from "@/lib/booking/validation";
import { ServicePackageRecord } from "@/lib/booking/types";

type SubmitPayload = Awaited<ReturnType<typeof bookingSubmitSchema.parseAsync>>;

async function cleanupPartialBooking(params: {
  bookingId?: string;
  customerId?: string;
}) {
  const supabase = getSupabaseAdminClient();

  if (params.bookingId) {
    await supabase.from("bookings").delete().eq("id", params.bookingId);
  }

  if (params.customerId) {
    await supabase.from("customers").delete().eq("id", params.customerId);
  }
}

export async function persistBooking(
  payload: SubmitPayload & { servicePackage: ServicePackageRecord },
  classification: BookingClassification
) {
  const supabase = getSupabaseAdminClient();
  let customerId: string | undefined;
  let bookingId: string | undefined;

  const { data: servicePackageRow, error: servicePackageError } = await supabase
    .from("service_packages")
    .select("id, slug")
    .eq("slug", payload.servicePackage.slug)
    .eq("active", true)
    .single();

  if (servicePackageError || !servicePackageRow) {
    throw new Error(
      servicePackageError?.message ||
        `Service package ${payload.servicePackage.slug} is not available in the database`
    );
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert({
      first_name: payload.customer.firstName,
      last_name: payload.customer.lastName,
      email: payload.customer.email,
      phone: payload.customer.phone,
      preferred_contact_method: payload.customer.preferredContactMethod
    })
    .select("id")
    .single();

  if (customerError || !customer) {
    throw new Error(customerError?.message || "Failed to create customer");
  }

  customerId = customer.id;

  const initialStatus =
    classification.finalMode === "manual_review"
      ? "pending_review"
      : classification.finalMode === "deposit_required"
        ? "awaiting_deposit"
        : "confirmed";

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      public_reference: createPublicReference(),
      customer_id: customer.id,
      service_package_id: servicePackageRow.id,
      status: initialStatus,
      booking_mode_final: classification.finalMode,
      vehicle_type: payload.vehicle.vehicleType,
      vehicle_make: payload.vehicle.vehicleMake,
      vehicle_model: payload.vehicle.vehicleModel,
      vehicle_year: payload.vehicle.vehicleYear,
      vehicle_size_class: payload.vehicle.vehicleType,
      service_city: payload.location.city,
      service_postal_code: payload.location.postalCode,
      service_address: payload.location.address,
      location_type: payload.location.locationType,
      access_notes: payload.location.accessNotes,
      preferred_date: payload.schedule.preferredDate || null,
      preferred_time_slot: payload.schedule.preferredTimeSlot || null,
      requested_date_range_start: payload.schedule.requestedDateRangeStart || null,
      requested_date_range_end: payload.schedule.requestedDateRangeEnd || null,
      estimated_total_cents: estimateTotalCents(payload.servicePackage.basePriceCents, classification),
      vehicle_surcharge_cents: classification.surchargeCents,
      deposit_required_cents: classification.depositRequiredCents,
      deposit_paid_cents: 0,
      pay_later_allowed: classification.payLaterAllowed,
      notes_customer: payload.notesCustomer
    })
    .select("id, public_reference, status")
    .single();

  if (bookingError || !booking) {
    await cleanupPartialBooking({ customerId });
    throw new Error(bookingError?.message || "Failed to create booking");
  }

  bookingId = booking.id;

  const { error: conditionError } = await supabase.from("booking_conditions").insert({
    booking_id: booking.id,
    pet_hair: payload.conditions.petHair,
    heavy_stains: payload.conditions.heavyStains,
    odor: payload.conditions.odor,
    mold_or_biohazard: payload.conditions.moldOrBiohazard,
    heavy_salt_buildup: payload.conditions.heavySaltBuildup,
    heavy_exterior_contamination: payload.conditions.heavyExteriorContamination,
    custom_scope_requested: payload.conditions.customScopeRequested,
    interior_condition_level: payload.conditions.interiorConditionLevel,
    exterior_condition_level: payload.conditions.exteriorConditionLevel
  });

  if (conditionError) {
    await cleanupPartialBooking({ bookingId, customerId });
    throw new Error(conditionError.message);
  }

  if (payload.uploadedPhotos.length) {
    const { error: photoError } = await supabase.from("booking_photos").insert(
      payload.uploadedPhotos.map((photo) => ({
        booking_id: booking.id,
        storage_path: photo.path,
        file_name: photo.fileName,
        mime_type: photo.mimeType,
        size_bytes: photo.sizeBytes,
        photo_kind: photo.photoKind
      }))
    );

    if (photoError) {
      await cleanupPartialBooking({ bookingId, customerId });
      throw new Error(photoError.message);
    }
  }

  const eventType =
    classification.finalMode === "manual_review" ? "flagged_for_review" : "submitted";

  const { error: eventError } = await supabase.from("booking_events").insert({
    booking_id: booking.id,
    event_type: eventType,
    actor_type: "customer",
    payload_json: {
      finalMode: classification.finalMode,
      reviewReasons: classification.reviewReasons
    }
  });

  if (eventError) {
    await cleanupPartialBooking({ bookingId, customerId });
    throw new Error(eventError.message);
  }

  return {
    id: booking.id,
    publicReference: booking.public_reference,
    status: booking.status
  };
}