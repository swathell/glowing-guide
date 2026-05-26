import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { AdminBookingActions } from "@/components/admin/admin-booking-actions";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { hasEnvVars } from "@/lib/env-guard";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  if (!hasEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])) {
    redirect("/book");
  }

  const supabase = getSupabaseAdminClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      "id, public_reference, status, booking_mode_final, service_city, created_at, estimated_total_cents, customers(first_name,last_name,email,phone), service_packages(name)"
    )
    .order("created_at", { ascending: false })
    .limit(25);

  return (
    <>
      <PageHero
        eyebrow="Owner View"
        title="Recent bookings, review queue, and status control."
        body="A lightweight admin surface for the owner to review incoming jobs, see booking mode, and move statuses without opening the database."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.8fr_0.8fr] gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.18em] text-obs-sand/80">
              <span>Customer</span>
              <span>Service</span>
              <span>Mode</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {(bookings || []).map((booking) => {
              const customer = Array.isArray(booking.customers) ? booking.customers[0] : booking.customers;
              const servicePackage = Array.isArray(booking.service_packages)
                ? booking.service_packages[0]
                : booking.service_packages;

              return (
                <div
                  key={booking.id}
                  className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.8fr_0.8fr] gap-4 border-b border-white/8 px-6 py-5 text-sm text-obs-fog/76"
                >
                  <div>
                    <p className="font-medium text-obs-fog">
                      {customer?.first_name} {customer?.last_name}
                    </p>
                    <p>{customer?.email}</p>
                    <p>{booking.public_reference}</p>
                  </div>
                  <div>
                    <p className="text-obs-fog">{servicePackage?.name}</p>
                    <p>{booking.service_city}</p>
                  </div>
                  <div>{booking.booking_mode_final.replaceAll("_", " ")}</div>
                  <div>{booking.status.replaceAll("_", " ")}</div>
                  <AdminBookingActions bookingId={booking.id} initialStatus={booking.status} />
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
