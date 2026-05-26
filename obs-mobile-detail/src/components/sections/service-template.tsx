import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServiceCategory } from "@/data/services";

export function ServiceTemplate({ category }: { category: ServiceCategory }) {
  return (
    <>
      <section className="border-b border-white/8 py-20 md:py-28">
        <Container className="content-grid">
          <div>
            <p className="eyebrow">{category.serviceType.replace("-", " ")}</p>
            <h1 className="display-title mt-4 text-obs-fog">{category.hero}</h1>
            <p className="copy-muted mt-6">{category.intro}</p>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Booking Path</p>
            <p className="mt-4 text-sm leading-7 text-obs-fog/72">
              {category.serviceType === "direct-book" &&
                "This category stays available for direct booking when no size or condition review flags are triggered."}
              {category.serviceType === "deposit" &&
                "These services stay bookable, but use deposit protection before the slot is fully confirmed."}
              {category.serviceType === "manual-review" &&
                "These services remain visible on the site but route into a request-and-review workflow."}
            </p>
            <Link href="/book" className="button-primary mt-6">
              Continue to booking
            </Link>
          </aside>
        </Container>
      </section>
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {category.packages.map((pkg) => (
              <article key={pkg.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl text-obs-fog">{pkg.name}</h2>
                    <p className="mt-4 text-sm leading-7 text-obs-fog/72">{pkg.summary}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-obs-sand">{pkg.price}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-obs-fog/55">{pkg.duration}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
