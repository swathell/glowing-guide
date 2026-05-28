import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { hasEnvVars } from "@/lib/env-guard";

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
    const body = (await request.json()) as { status?: string };
    if (!body.status) {
      return jsonError("Missing booking status", { status: 400, code: "MISSING_STATUS" });
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: body.status })
      .eq("id", id)
      .select("id, status")
      .single();

    if (error || !data) {
      return jsonError(error?.message || "Unable to update booking", {
        status: 400,
        code: "BOOKING_UPDATE_FAILED"
      });
    }

    await supabase.from("booking_events").insert({
      booking_id: id,
      event_type: body.status === "completed" ? "completed" : body.status === "cancelled" ? "cancelled" : "confirmed",
      actor_type: "admin",
      payload_json: {
        status: body.status
      }
    });

    return jsonSuccess({ booking: data });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to update booking", {
      status: 400,
      code: "BOOKING_UPDATE_FAILED"
    });
  }
}
