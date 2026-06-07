import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="obs-performance-line rounded-2xl border border-white/10 bg-gradient-to-r from-[#1a1f22] to-[#181513] p-8 pt-10 md:p-12 md:pt-14">
          <p className="eyebrow">Ready To Book</p>
          <h2 className="section-title mt-4 max-w-3xl">Choose the package, confirm the vehicle, and we come to you.</h2>
          <p className="copy-muted mt-5 max-w-2xl">
            Standard detailing can move quickly online. Larger jobs, heavy condition flags, and
            maintenance requests get a clear quote path instead of a confusing dead end.
          </p>
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
