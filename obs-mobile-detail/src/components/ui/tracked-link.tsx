"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/client-analytics";
import type { AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  eventName: AnalyticsEventName;
  metadata?: Record<string, unknown>;
};

export function TrackedLink({
  children,
  className,
  eventName,
  metadata,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      className={className}
      onClick={() => {
        void trackEvent({
          eventName,
          pagePath: typeof props.href === "string" ? props.href : window.location.pathname,
          metadata
        });
      }}
    >
      {children}
    </Link>
  );
}
