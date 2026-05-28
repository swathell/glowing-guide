import Link from "next/link";
import { serviceCategories } from "@/data/services";
import { Container } from "@/components/ui/container";

export function ServiceGridSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 className="section-title mt-4">A clearer mobile auto services catalog with detailing still carrying the proof.</h2>
          <p className="copy-muted mt-5">
            OBS now needs to sell more than detailing, but without becoming messy. The structure
            below keeps the broader offer visible while preserving detailing as the emotional, image-led flagship.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {serviceCategories.map((category) => (
            <article
              key={category.slug}
              className="surface-border rounded-xl bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-obs-sand/80">
                {category.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-3xl text-obs-fog">{category.name}</h3>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-obs-fog/55">
                From {category.priceFrom}
              </p>
              <p className="mt-4 text-sm leading-6 text-obs-fog/72">{category.intro}</p>
              <p className="mt-5 text-sm leading-6 text-obs-fog/84">{category.highlight}</p>
              <ul className="mt-6 space-y-3 text-sm text-obs-fog/80">
                {category.groups[0].packages.slice(0, 3).map((pkg) => (
                  <li key={pkg.name} className="flex items-start justify-between gap-4 border-t border-white/8 pt-3">
                    <span className="max-w-[70%]">{pkg.name}</span>
                    <span className="whitespace-nowrap text-obs-sand">{pkg.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/8 pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-fog/55">
                  {category.availability === "book-online"
                    ? "Book online"
                    : category.availability === "call-to-schedule"
                      ? "Call to schedule"
                      : "Best added to a main service"}
                </p>
                <Link href={`/services/${category.slug}`} className="inline-flex text-sm font-semibold text-obs-sand">
                  Explore service
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Architecture Note</p>
              <h3 className="mt-4 font-display text-3xl text-obs-fog">Detailing stays the visual engine. Oil and tire stay crisp and utility-led.</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceCategories.map((category) => (
                <div key={category.slug} className="border-t border-white/8 pt-4 text-sm leading-6 text-obs-fog/76">
                  <p className="font-semibold text-obs-fog">{category.name}</p>
                  <p className="mt-2">{category.proofNote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
