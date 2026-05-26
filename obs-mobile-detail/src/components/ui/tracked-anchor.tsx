"use client";

import { ReactNode } from "react";
import { trackEvent } from "@/lib/client-analytics";
import type { AnalyticsEventName } from "@/lib/analytics";

export function TrackedAnchor({
  href,
  className,
  children,
  eventName,
  metadata
}: {
  href: string;
  className?: string;
  children: ReactNode;
  eventName: AnalyticsEventName;
  metadata?: Record<string, unknown>;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        void trackEvent({
          eventName,
          pagePath: window.location.pathname,
          metadata
        });
      }}
    >
      {children}
    </a>
  );
}
