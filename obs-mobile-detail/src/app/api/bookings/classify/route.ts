import { bookingDraftSchema } from "@/lib/booking/validation";
import { getPackageById } from "@/lib/booking/helpers";
import { classifyBooking } from "@/lib/booking/rules";
import { jsonError, jsonSuccess } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = await bookingDraftSchema.parseAsync(json);
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

    return jsonSuccess({
      classification,
      servicePackage
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to classify booking", {
      status: 400,
      code: "BOOKING_CLASSIFICATION_FAILED"
    });
  }
}
