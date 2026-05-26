import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export default function BookingSuccessPage() {
  return (
    <>
      <PageHero
        eyebrow="Deposit Confirmed"
        title="Your deposit has been received."
        body="We’ve recorded your payment. Your booking is now confirmed and the team will follow up if anything else is needed."
      />
      <section className="py-20 md:py-28">
        <Container>
          <Link href="/" className="button-primary">
            Return home
          </Link>
        </Container>
      </section>
    </>
  );
}
