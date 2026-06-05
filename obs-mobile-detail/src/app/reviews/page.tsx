import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Real reviews from OBS Mobile Detailing customers across Toronto and the GTA."
};

const reviewStats = [
  { label: "Average Rating", value: "★★★★★" },
  { label: "Vehicles Detailed", value: "100+" },
  { label: "Service Area", value: "Across the GTA" },
  { label: "Availability", value: "Fast Mobile Service" }
];

export default function ReviewsPage() {
  const featuredReview = testimonials.find((review) => review.featured) ?? testimonials[0];
  const remainingReviews = testimonials.filter((review) => review !== featuredReview);
  const topReviews = remainingReviews.slice(0, 2);
  const lowerReviews = remainingReviews.slice(2);

  return (
    <>
      <section className="border-b border-white/8 py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow">Reviews</p>
            <h1 className="display-title mt-4 text-obs-fog">Trusted By Drivers Across The GTA</h1>
            <p className="copy-muted mt-6 max-w-2xl">
              See what customers have to say about our mobile detailing services across Toronto
              and the Greater Toronto Area.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-4">
            {reviewStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">{stat.label}</p>
                <p className="mt-3 text-lg text-obs-fog">{stat.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 md:pb-16">
        <Container>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
            <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="eyebrow">Featured Review</p>
                <p className="mt-5 text-2xl text-[#e7ba45]">★★★★★</p>
                <p className="mt-6 font-display text-4xl leading-tight text-obs-fog md:text-5xl">
                  “{featuredReview.quote}”
                </p>
              </div>
              <div className="lg:pl-8 lg:border-l lg:border-white/8">
                <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/78">
                  {featuredReview.name}
                </p>
                <p className="mt-3 text-lg text-obs-fog">
                  {featuredReview.vehicle ? `${featuredReview.vehicle} • ` : ""}
                  {featuredReview.service}
                </p>
                <p className="mt-2 text-sm leading-7 text-obs-fog/66">
                  {featuredReview.location ? `${featuredReview.location} • ` : ""}
                  {featuredReview.date}
                </p>
                <p className="mt-6 text-sm leading-7 text-obs-fog/72">
                  This is the kind of feedback that matters most for a mobile detailing business:
                  trust, professionalism, convenience, and results that feel worth the booking.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="mb-8">
            <p className="eyebrow">Customer Reviews</p>
            <h2 className="section-title mt-4">Real customer experiences, not filler.</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {topReviews.map((review) => (
              <article
                key={`${review.name}-${review.service}`}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-sm text-[#e7ba45]">★★★★★</p>
                <h3 className="mt-5 font-display text-3xl text-obs-fog">{review.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-obs-sand/78">
                  {review.vehicle ? `${review.vehicle} • ` : ""}
                  {review.service}
                </p>
                <p className="mt-5 text-sm leading-7 text-obs-fog/76">{review.quote}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-obs-fog/50">
                  {review.location ? `${review.location} • ` : ""}
                  {review.date}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {lowerReviews.map((review) => (
              <article
                key={`${review.name}-${review.service}-${review.location}`}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-obs-fog">{review.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-obs-sand/74">
                      {review.service}
                    </p>
                  </div>
                  <p className="text-sm text-[#e7ba45]">★★★★★</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-obs-fog/74">{review.quote}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.16em] text-obs-fog/50">
                  {review.location ? `${review.location} • ` : ""}
                  {review.date}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/8 py-16">
        <Container>
          <div className="flex flex-col gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Ready To Experience The Difference?</p>
              <h2 className="mt-4 font-display text-3xl text-obs-fog md:text-4xl">
                Book your mobile detailing appointment today.
              </h2>
              <p className="mt-4 text-sm leading-7 text-obs-fog/72">
                If you&apos;d rather talk it through first, call us at {siteConfig.phone} and
                we&apos;ll help you choose the right service.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${siteConfig.phone}`} className="button-secondary">
                {siteConfig.phone}
              </a>
              <Link href="/book" className="button-primary">
                Book Now
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
