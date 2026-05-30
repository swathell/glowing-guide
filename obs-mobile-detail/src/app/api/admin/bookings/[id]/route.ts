import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { hasEnvVars } from "@/lib/env-guard";

const allowedStatuses = new Set([
  "pending_review",
  "awaiting_deposit",
  "confirmed",
  "quoted",
  "cancelled",
  "completed"
]);

function getEventTypeForStatus(status: string) {
  switch (status) {
    case "pending_review":
      return "flagged_for_review";
    case "awaiting_deposit":
      return "deposit_requested";
    case "quoted":
      return "quote_sent";
    case "cancelled":
      return "cancelled";
    case "completed":
      return "completed";
    case "confirmed":
    default:
      return "confirmed";
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!hasEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])) {
    return jsonError("Admin booking updates are unavailable.", {
      status: 503,
      code: "ADMIN_UPDATE_UNAVAILABLE"
    });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: string; notesInternal?: string };
    if (!body.status) {
      return jsonError("Missing booking status", { status: 400, code: "MISSING_STATUS" });
    }

    if (!allowedStatuses.has(body.status)) {
      return jsonError("Invalid booking status", { status: 400, code: "INVALID_STATUS" });
    }

    const supabase = getSupabaseAdminClient();
    const { data: existingBooking, error: existingBookingError } = await supabase
      .from("bookings")
      .select("id, status")
      .eq("id", id)
      .single();

    if (existingBookingError || !existingBooking) {
      return jsonError(existingBookingError?.message || "Unable to load booking", {
        status: 400,
        code: "BOOKING_LOOKUP_FAILED"
      });
    }

    const { data, error } = await supabase
      .from("bookings")
      .update({
        status: body.status,
        notes_internal: body.notesInternal ?? "",
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select("id, status, notes_internal")
      .single();

    if (error || !data) {
      return jsonError(error?.message || "Unable to update booking", {
        status: 400,
        code: "BOOKING_UPDATE_FAILED"
      });
    }

    if (existingBooking.status !== body.status) {
      await supabase.from("booking_events").insert({
        booking_id: id,
        event_type: getEventTypeForStatus(body.status),
        actor_type: "admin",
        payload_json: {
          previousStatus: existingBooking.status,
          status: body.status
        }
      });
    }

    return jsonSuccess({ booking: data });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to update booking", {
      status: 400,
      code: "BOOKING_UPDATE_FAILED"
    });
  }
}
