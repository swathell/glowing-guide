import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export default function BookingCancelledPage() {
  return (
    <>
      <PageHero
        eyebrow="Deposit Cancelled"
        title="Your deposit checkout was not completed."
        body="Your booking request is still on file, but the slot is not confirmed until the deposit is paid."
      />
      <section className="py-20 md:py-28">
        <Container>
          <Link href="/book" className="button-primary">
            Return to booking
          </Link>
        </Container>
      </section>
    </>
  );
}
