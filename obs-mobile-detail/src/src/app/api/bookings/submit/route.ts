import { bookingSubmitSchema } from "@/lib/booking/validation";
import { getPackageById } from "@/lib/booking/helpers";
import { classifyBooking } from "@/lib/booking/rules";
import { persistBooking } from "@/lib/booking/persistence";
import { sendCustomerSubmissionEmail, sendOwnerAlertEmail } from "@/lib/booking/email";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { hasEnvVars, missingEnvVars } from "@/lib/env-guard";

export async function POST(request: Request) {
  try {
    if (!hasEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])) {
      return jsonError("Booking is temporarily unavailable. Please try again shortly.", {
        status: 503,
        code: "BOOKING_SERVICE_UNAVAILABLE",
        details: {
          missing: missingEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])
        }
      });
    }

    const json = await request.json();
    const payload = await bookingSubmitSchema.parseAsync(json);
    const servicePackage = getPackageById(payload.servicePackageId);

    if (!servicePackage) {
      return jsonError("Unknown service package", { status: 400, code: "UNKNOWN_SERVICE_PACKAGE" });
    }

    const classification = classifyBooking({
      servicePackage,
      vehicle: payload.vehicle,
      conditions: payload.conditions,
      location: payload.location
    });

    const booking = await persistBooking(
      {
        ...payload,
        servicePackage
      },
      classification
    );

    await Promise.allSettled([
      sendCustomerSubmissionEmail({
        email: payload.customer.email,
        firstName: payload.customer.firstName,
        bookingReference: booking.publicReference,
        finalMode: classification.finalMode
      }),
      sendOwnerAlertEmail({
        bookingReference: booking.publicReference,
        customerName: `${payload.customer.firstName} ${payload.customer.lastName}`,
        serviceName: servicePackage.name,
        finalMode: classification.finalMode
      })
    ]);

    return jsonSuccess({
      booking,
      classification
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to submit booking", {
      status: 400,
      code: "BOOKING_SUBMIT_FAILED"
    });
  }
}
