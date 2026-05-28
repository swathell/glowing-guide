import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServiceCategory } from "@/data/services";

export function ServiceTemplate({ category }: { category: ServiceCategory }) {
  return (
    <>
      <section className="border-b border-white/8 py-20 md:py-28">
        <Container className="content-grid">
          <div>
            <p className="eyebrow">{category.eyebrow}</p>
            <h1 className="display-title mt-4 text-obs-fog">{category.hero}</h1>
            <p className="copy-muted mt-6">{category.intro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Availability</p>
                <p className="mt-3 text-sm leading-6 text-obs-fog/78">
                  {category.availability === "book-online"
                    ? "Online-first flow"
                    : category.availability === "call-to-schedule"
                      ? "Contact-led scheduling"
                      : "Best layered onto a primary service"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Pricing</p>
                <p className="mt-3 text-sm leading-6 text-obs-fog/78">From {category.priceFrom}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Role in site</p>
                <p className="mt-3 text-sm leading-6 text-obs-fog/78">{category.highlight}</p>
              </div>
            </div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">How this category should convert</p>
            <p className="mt-4 text-sm leading-7 text-obs-fog/72">
              {category.availability === "book-online" &&
                "This category should move quickly into the booking flow, with proof and package clarity doing most of the conversion work."}
              {category.availability === "call-to-schedule" &&
                "This category is better framed as fast to understand and easy to schedule, with trust and convenience carrying more weight than a dramatic booking experience."}
              {category.availability === "add-on-first" &&
                "These services should feel like relevant enhancements. Surface them near their parent services first, and let this page act as the cleaner reference library."}
            </p>
            <Link href={category.availability === "book-online" ? "/book" : "/contact"} className="button-primary mt-6">
              {category.availability === "book-online" ? "Continue to booking" : "Contact to schedule"}
            </Link>
            <div className="mt-6 border-t border-white/8 pt-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Ideal for</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-obs-fog/76">
                {category.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-14">
            {category.groups.map((group) => (
              <div key={group.title}>
                <div className="max-w-3xl">
                  <p className="eyebrow">{group.title}</p>
                  <h2 className="section-title mt-4">{group.intro}</h2>
                </div>
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  {group.packages.map((pkg) => (
                    <article key={pkg.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-display text-3xl text-obs-fog">{pkg.name}</h3>
                            {pkg.badge ? (
                              <span className="rounded-full border border-obs-sand/30 bg-obs-sand/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-obs-sand">
                                {pkg.badge}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-4 text-sm leading-7 text-obs-fog/72">{pkg.summary}</p>
                          {pkg.includes?.length ? (
                            <ul className="mt-5 grid gap-2 text-sm text-obs-fog/82">
                              {pkg.includes.map((item) => (
                                <li key={item} className="border-t border-white/8 pt-2">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-obs-sand">{pkg.price}</p>
                          {pkg.duration ? (
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-obs-fog/55">{pkg.duration}</p>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Proof strategy for this category</p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-obs-fog/76">{category.proofNote}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/gallery" className="button-secondary">
                View gallery
              </Link>
              <Link href="/reviews" className="button-secondary">
                Read reviews
              </Link>
              <Link href={category.availability === "book-online" ? "/book" : "/contact"} className="button-primary">
                {category.availability === "book-online" ? "Book this service" : "Ask about this service"}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
