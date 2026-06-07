"use client";

import { useState, useTransition } from "react";

const statuses = ["pending_review", "awaiting_deposit", "confirmed", "quoted", "cancelled", "completed"];

export function AdminBookingActions({
  bookingId,
  initialStatus,
  initialNotesInternal,
  customerPhone,
  customerEmail
}: {
  bookingId: string;
  initialStatus: string;
  initialNotesInternal?: string | null;
  customerPhone?: string | null;
  customerEmail?: string | null;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [notesInternal, setNotesInternal] = useState(initialNotesInternal || "");
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
      <textarea
        value={notesInternal}
        onChange={(event) => setNotesInternal(event.target.value)}
        rows={4}
        className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-obs-fog placeholder:text-obs-fog/32"
        placeholder="Internal notes for follow-up, pricing, access, or scheduling"
      />
      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-obs-fog/56">
        {customerPhone ? (
          <a href={`tel:${customerPhone}`} className="rounded-full border border-white/10 px-3 py-2 hover:text-obs-fog">
            Call
          </a>
        ) : null}
        {customerEmail ? (
          <a href={`mailto:${customerEmail}`} className="rounded-full border border-white/10 px-3 py-2 hover:text-obs-fog">
            Email
          </a>
        ) : null}
      </div>
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
              body: JSON.stringify({ status, notesInternal })
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
