import { getSupabaseAdminClient } from "@/lib/supabase";
import { hasEnvVars } from "@/lib/env-guard";

export type AnalyticsEventName =
  | "booking_started"
  | "booking_submitted"
  | "manual_review_submitted"
  | "deposit_checkout_started"
  | "deposit_paid"
  | "phone_clicked"
  | "whatsapp_clicked";

export async function persistAnalyticsEvent(params: {
  eventName: AnalyticsEventName;
  pagePath: string;
  metadata?: Record<string, unknown>;
}) {
  if (!hasEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  await supabase.from("analytics_events").insert({
    event_name: params.eventName,
    page_path: params.pagePath,
    metadata_json: params.metadata || {}
  });
}
