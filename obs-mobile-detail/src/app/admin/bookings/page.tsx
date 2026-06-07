import { getSupabaseAdminClient } from "@/lib/supabase";
import { AdminBookingActions } from "@/components/admin/admin-booking-actions";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { hasEnvVars, missingEnvVars } from "@/lib/env-guard";

export const dynamic = "force-dynamic";

function formatMoney(cents?: number | null) {
  if (typeof cents !== "number") {
    return "—";
  }

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(cents / 100);
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not scheduled";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}

function prettifyStatus(value?: string | null) {
  return value ? value.replaceAll("_", " ") : "—";
}

export default async function AdminBookingsPage() {
  if (!hasEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])) {
    const missing = missingEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);

    return (
      <>
        <PageHero
          eyebrow="Owner View"
          title="Admin dashboard setup is incomplete."
          body="This route is live, but the owner dashboard cannot load until the required Supabase environment variables are added in production."
        />
        <section className="py-20 md:py-28">
          <Container>
            <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 text-obs-fog">
              <p className="text-sm uppercase tracking-[0.18em] text-amber-100/80">Setup required</p>
              <p className="mt-4 text-lg text-obs-fog">
                Missing environment variables: {missing.join(", ")}
              </p>
              <p className="mt-4 text-sm leading-7 text-obs-fog/74">
                Add these in Vercel, redeploy, and then reopen <span className="text-obs-fog">/admin/bookings</span>.
              </p>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const supabase = getSupabaseAdminClient();
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      "id, public_reference, status, booking_mode_final, service_city, service_address, service_postal_code, location_type, created_at, updated_at, estimated_total_cents, final_total_cents, deposit_required_cents, deposit_paid_cents, preferred_date, preferred_time_slot, requested_date_range_start, requested_date_range_end, vehicle_type, vehicle_make, vehicle_model, vehicle_year, access_notes, notes_customer, notes_internal, customers(first_name,last_name,email,phone), service_packages(name,category_slug)"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  const items = bookings || [];

  const summary = {
    total: items.length,
    pendingReview: items.filter((booking) => booking.status === "pending_review").length,
    awaitingDeposit: items.filter((booking) => booking.status === "awaiting_deposit").length,
    confirmed: items.filter((booking) => booking.status === "confirmed").length,
    completed: items.filter((booking) => booking.status === "completed").length,
    revenueOpen: items.reduce((sum, booking) => sum + (booking.estimated_total_cents || 0), 0),
    depositsOutstanding: items.reduce((sum, booking) => {
      return sum + Math.max((booking.deposit_required_cents || 0) - (booking.deposit_paid_cents || 0), 0);
    }, 0)
  };

  const priorityQueues = [
    {
      title: "Review queue",
      body: "Jobs that still need a human decision, pricing confirmation, or photo review.",
      items: items.filter((booking) => booking.status === "pending_review").slice(0, 6)
    },
    {
      title: "Awaiting deposit",
      body: "Deposit-required bookings that need payment before they can be treated as confirmed.",
      items: items.filter((booking) => booking.status === "awaiting_deposit").slice(0, 6)
    },
    {
      title: "Recently confirmed",
      body: "The latest jobs that look ready to schedule, deliver, or complete.",
      items: items.filter((booking) => booking.status === "confirmed").slice(0, 6)
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Owner View"
        title="Owner dashboard for review, deposits, and booking follow-up."
        body="Use this screen to see what needs attention first, what money is still outstanding, and what each customer actually asked for before you open the database."
      />
      <section className="py-20 md:py-28">
        <Container>
          {error ? (
            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-obs-fog">
              Owner bookings are live, but this view could not read the latest rows yet. Check Supabase schema, policies, and environment variables.
            </div>
          ) : null}
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Open bookings</p>
              <p className="mt-4 font-display text-5xl text-obs-fog">{summary.total}</p>
              <p className="mt-3 text-sm leading-6 text-obs-fog/68">Recent jobs currently visible in the owner dashboard.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Pending review</p>
              <p className="mt-4 font-display text-5xl text-obs-fog">{summary.pendingReview}</p>
              <p className="mt-3 text-sm leading-6 text-obs-fog/68">Manual review jobs that still need a decision or quote.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Awaiting deposit</p>
              <p className="mt-4 font-display text-5xl text-obs-fog">{summary.awaitingDeposit}</p>
              <p className="mt-3 text-sm leading-6 text-obs-fog/68">Jobs waiting on payment before they can be treated as confirmed.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Deposits outstanding</p>
              <p className="mt-4 font-display text-5xl text-obs-fog">{formatMoney(summary.depositsOutstanding)}</p>
              <p className="mt-3 text-sm leading-6 text-obs-fog/68">Remaining deposit amount across the visible queue.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {priorityQueues.map((queue) => (
              <section key={queue.title} className="rounded-2xl border border-white/10 bg-black/15 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">{queue.title}</p>
                <p className="mt-3 text-sm leading-6 text-obs-fog/68">{queue.body}</p>
                <div className="mt-5 space-y-3">
                  {queue.items.length ? (
                    queue.items.map((booking) => {
                      const customer = Array.isArray(booking.customers) ? booking.customers[0] : booking.customers;
                      const servicePackage = Array.isArray(booking.service_packages)
                        ? booking.service_packages[0]
                        : booking.service_packages;

                      return (
                        <div key={booking.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                          <p className="font-medium text-obs-fog">
                            {customer?.first_name} {customer?.last_name}
                          </p>
                          <p className="mt-1 text-sm text-obs-fog/68">{servicePackage?.name}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-obs-fog/54">
                            {booking.service_city} • {prettifyStatus(booking.status)}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-xl border border-dashed border-white/8 px-4 py-5 text-sm text-obs-fog/54">
                      Nothing here right now.
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {items.map((booking) => {
              const customer = Array.isArray(booking.customers) ? booking.customers[0] : booking.customers;
              const servicePackage = Array.isArray(booking.service_packages)
                ? booking.service_packages[0]
                : booking.service_packages;
              const outstandingDeposit = Math.max(
                (booking.deposit_required_cents || 0) - (booking.deposit_paid_cents || 0),
                0
              );

              return (
                <article key={booking.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr_0.82fr]">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-display text-3xl text-obs-fog">
                            {customer?.first_name} {customer?.last_name}
                          </p>
                          <p className="mt-2 text-sm text-obs-fog/68">
                            {servicePackage?.name} • {booking.vehicle_year} {booking.vehicle_make}{" "}
                            {booking.vehicle_model}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-obs-fog/76">
                            {prettifyStatus(booking.status)}
                          </span>
                          <span className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-obs-fog/76">
                            {prettifyStatus(booking.booking_mode_final)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Customer</p>
                          <p className="mt-3 text-sm leading-6 text-obs-fog/76">{customer?.email}</p>
                          <p className="text-sm leading-6 text-obs-fog/76">{customer?.phone}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-obs-fog/54">
                            Ref {booking.public_reference}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Service details</p>
                          <p className="mt-3 text-sm leading-6 text-obs-fog/76">
                            {booking.service_city} • {booking.service_postal_code}
                          </p>
                          <p className="text-sm leading-6 text-obs-fog/76">{booking.service_address}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-obs-fog/54">
                            {booking.location_type}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Money</p>
                          <p className="mt-3 text-sm leading-6 text-obs-fog/76">
                            Estimate {formatMoney(booking.estimated_total_cents)}
                          </p>
                          <p className="text-sm leading-6 text-obs-fog/76">
                            Deposit due {formatMoney(booking.deposit_required_cents)}
                          </p>
                          <p className="text-sm leading-6 text-obs-fog/76">
                            Deposit open {formatMoney(outstandingDeposit)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Scheduling</p>
                          <p className="mt-3 text-sm leading-6 text-obs-fog/76">
                            Preferred date {formatDate(booking.preferred_date)}
                          </p>
                          <p className="text-sm leading-6 text-obs-fog/76">
                            Preferred slot {booking.preferred_time_slot || "Not provided"}
                          </p>
                          <p className="text-sm leading-6 text-obs-fog/76">
                            Review window {formatDate(booking.requested_date_range_start)} to{" "}
                            {formatDate(booking.requested_date_range_end)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Job flags</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-obs-fog/72">
                              {booking.booking_mode_final === "manual_review"
                                ? "Review job"
                                : booking.booking_mode_final === "deposit_required"
                                  ? "Deposit flow"
                                  : "Direct booking"}
                            </span>
                            <span className="rounded-full border border-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-obs-fog/72">
                              Created {formatDate(booking.created_at)}
                            </span>
                            {booking.deposit_required_cents && booking.deposit_required_cents > 0 ? (
                              <span className="rounded-full border border-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-obs-fog/72">
                                Deposit due
                              </span>
                            ) : null}
                          </div>
                          {booking.access_notes ? (
                            <p className="mt-4 text-sm leading-6 text-obs-fog/72">
                              Access notes: {booking.access_notes}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      {booking.notes_customer ? (
                        <div className="mt-4 rounded-2xl border border-white/8 bg-black/15 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Customer notes</p>
                          <p className="mt-3 text-sm leading-7 text-obs-fog/74">{booking.notes_customer}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="xl:col-span-2">
                      <AdminBookingActions
                        bookingId={booking.id}
                        initialStatus={booking.status}
                        initialNotesInternal={booking.notes_internal}
                        customerPhone={customer?.phone}
                        customerEmail={customer?.email}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
