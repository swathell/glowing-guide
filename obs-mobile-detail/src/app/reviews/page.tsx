import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Customer reviews, service proof, recent jobs, and mobile detailing trust signals across the GTA."
};

const stats = [
  ["★★★★★", "Average review signal"],
  ["100+", "Vehicles detailed"],
  ["9+", "GTA service areas"],
  ["Mobile", "Home and office service"]
];

const recentJobs = [
  ["SUV Interior Reset", "Interior Detail + Pet Hair", "/images/owner-reference/service-work-01.png"],
  ["Paint Gloss Recovery", "Paint Correction", "/images/owner-reference/service-work-02.png"],
  ["Full Mobile Detail", "Interior + Exterior", "/images/owner-reference/service-work-03.png"]
];

export default function ReviewsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-obs-copper/35 bg-[#070809] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,103,24,0.32),transparent_32%)]" />
        <Container className="relative">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <span className="obs-tag">Customer Reviews</span>
              <span className="obs-tag">Real Services</span>
              <span className="obs-tag">GTA Drivers</span>
            </div>
            <h1 className="display-title mt-6 text-obs-fog">
              Reviews From Customers Who Booked OBS
            </h1>
            <p className="copy-muted mt-6 max-w-3xl">
              See customer names, service types, locations, ratings, and real service feedback
              before choosing your package.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="owner-card rounded-lg p-5">
                <p className="owner-price font-display text-4xl font-black">{value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-obs-fog/70">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-14 md:pb-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((review) => (
              <article key={`${review.name}-${review.service}-${review.location}`} className="owner-card rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl text-[#ffb347]">★★★★★</p>
                    <h2 className="mt-4 text-2xl font-black uppercase text-white">{review.name}</h2>
                  </div>
                  <span className="rounded-md bg-obs-copper px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                    {review.service}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-obs-fog/78">{review.quote}</p>
                <div className="mt-5 grid gap-2 border-t border-obs-copper/25 pt-4 text-xs font-black uppercase tracking-[0.14em] text-obs-fog/62">
                  <p>{review.vehicle || "Vehicle"} • {review.location || "GTA"}</p>
                  <p>{review.date}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-obs-copper/30 bg-black/28 py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Recent Work</p>
              <h2 className="section-title mt-3">Proof That Work Is Happening</h2>
            </div>
            <Link href="/gallery" className="button-primary">View Gallery</Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {recentJobs.map(([title, service, image]) => (
              <article key={title} className="owner-card-hot overflow-hidden rounded-xl p-3">
                <div className="relative min-h-[22rem] overflow-hidden rounded-lg">
                  <Image src={image} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="owner-kicker">{service}</p>
                    <h3 className="mt-2 text-2xl font-black uppercase text-white">{title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="owner-card-hot rounded-xl p-7 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow">Ready To Book?</p>
                <h2 className="section-title mt-3">Choose Your Service And OBS Comes To You.</h2>
                <p className="copy-muted mt-4">Call {siteConfig.phone} or book mobile detailing online.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="button-primary">Book Now</Link>
                <a href={`tel:${siteConfig.phone}`} className="button-secondary">Call Now</a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
