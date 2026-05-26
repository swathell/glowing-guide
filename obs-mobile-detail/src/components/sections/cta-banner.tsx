import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#1a1f22] to-[#181513] p-8 md:p-12">
          <p className="eyebrow">Ready To Book</p>
          <h2 className="section-title mt-4 max-w-3xl">Give the owner a cleaner operation and customers a better first impression.</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="button-primary">
              Start Booking
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="button-secondary">
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
