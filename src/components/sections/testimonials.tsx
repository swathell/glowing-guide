import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">Reviews</p>
          <h2 className="section-title mt-4">Interactive testimonials that still communicate in the default state.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((review) => (
            <article
              key={review.name}
              className="group surface-border rounded-xl bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <p className="text-sm text-[#e7ba45]">★★★★★</p>
              <h3 className="mt-5 font-display text-3xl text-obs-fog">{review.name}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-obs-sand/75">{review.service}</p>
              <p className="mt-5 line-clamp-4 text-sm leading-7 text-obs-fog/78 transition group-hover:text-obs-fog">
                {review.quote}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-obs-fog/50">{review.date}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
