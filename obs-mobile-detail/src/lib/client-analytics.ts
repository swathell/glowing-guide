"use client";

import type { AnalyticsEventName } from "@/lib/analytics";

type TrackPayload = {
  eventName: AnalyticsEventName;
  pagePath: string;
  metadata?: Record<string, unknown>;
};

export async function trackEvent(payload: TrackPayload) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/track", blob);
      return;
    }

    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    });
  } catch {
    // Analytics should never block UX.
  }
}
