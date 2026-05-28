"use client";

import { useState, useTransition } from "react";

const statuses = ["pending_review", "awaiting_deposit", "confirmed", "quoted", "cancelled", "completed"];

export function AdminBookingActions({
  bookingId,
  initialStatus
}: {
  bookingId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-3">
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-obs-fog"
      >
        {statuses.map((entry) => (
          <option key={entry} value={entry}>
            {entry.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="button-secondary"
        disabled={pending}
        onClick={() => {
          setMessage("");
          startTransition(async () => {
            const response = await fetch(`/api/admin/bookings/${bookingId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status })
            });

            const payload = await response.json().catch(() => null);
            if (!response.ok) {
              setMessage(payload?.error || "Unable to update status");
              return;
            }

            setMessage("Saved");
          });
        }}
      >
        {pending ? "Saving..." : "Update status"}
      </button>
      {message ? <p className="text-xs text-obs-fog/62">{message}</p> : null}
    </div>
  );
}
