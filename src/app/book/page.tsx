import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BookingForm } from "@/components/bookings/booking-form";

export const metadata: Metadata = {
  title: "Book Online",
  description: "Direct booking for standard services, structured review for specialty jobs, and deposit-aware scheduling."
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="A booking shell designed to qualify jobs without scaring off normal customers."
        body="This page is ready for the multi-step intake flow. Standard jobs move quickly; higher-complexity work branches into review, photos, and deposit logic."
      />
      <section className="py-20 md:py-28">
        <Container>
          <BookingForm />
        </Container>
      </section>
    </>
  );
}
