import { persistAnalyticsEvent } from "@/lib/analytics";
import { jsonError, jsonSuccess } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      eventName?: string;
      pagePath?: string;
      metadata?: Record<string, unknown>;
    };

    if (!payload.eventName || !payload.pagePath) {
      return jsonError("Missing analytics event payload", {
        status: 400,
        code: "INVALID_ANALYTICS_PAYLOAD"
      });
    }

    await persistAnalyticsEvent({
      eventName: payload.eventName as Parameters<typeof persistAnalyticsEvent>[0]["eventName"],
      pagePath: payload.pagePath,
      metadata: payload.metadata
    });

    return jsonSuccess({ tracked: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Analytics tracking failed", {
      status: 400,
      code: "ANALYTICS_TRACK_FAILED"
    });
  }
}
