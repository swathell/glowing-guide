import Link from "next/link";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-3">
              <span className="obs-tag">Customer proof</span>
              <span className="obs-tag">Service-specific reviews</span>
            </div>
            <h2 className="section-title mt-6">Reviews should make the operation feel real.</h2>
            <p className="copy-muted mt-5">
              Each review is tied to a service, vehicle type, and location so customers can
              recognize the work they are about to book.
            </p>

            <article className="obs-panel obs-performance-line mt-10 rounded-[1.8rem] p-7 pt-9">
              <p className="text-sm text-[#e7ba45]">★★★★★</p>
              <p className="mt-6 font-display text-4xl leading-tight text-obs-fog">
                “{featured.quote}”
              </p>
              <p className="mt-6 text-sm uppercase tracking-[0.18em] text-obs-sand/80">
                {featured.name}
              </p>
              <p className="mt-2 text-sm text-obs-fog/70">
                {featured.location ? `${featured.location} • ` : ""}
                {featured.service}
              </p>
            </article>
          </div>

          <div>
            <div className="grid gap-5 md:grid-cols-2">
              {rest.slice(0, 4).map((review) => (
                <article
                  key={`${review.name}-${review.service}-${review.location}`}
                  className="obs-panel rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:bg-white/[0.06]"
                >
                  <p className="text-sm text-[#e7ba45]">★★★★★</p>
                  <h3 className="mt-5 text-xl font-semibold text-obs-fog">{review.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-obs-sand/75">
                    {review.vehicle ? `${review.vehicle} • ` : ""}
                    {review.service}
                  </p>
                  <p className="mt-5 line-clamp-5 text-sm leading-7 text-obs-fog/78">
                    {review.quote}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-obs-fog/50">
                    {review.location ? `${review.location} • ` : ""}
                    {review.date}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-5 flex justify-start">
              <Link href="/reviews" className="button-secondary">
                Read More Reviews
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
