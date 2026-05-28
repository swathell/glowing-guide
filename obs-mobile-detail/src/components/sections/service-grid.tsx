import Link from "next/link";
import { serviceCategories } from "@/data/services";
import { Container } from "@/components/ui/container";

export function ServiceGridSection() {
  const detailing = serviceCategories.find((category) => category.slug === "detailing");
  const supportCategories = serviceCategories.filter((category) => category.slug !== "detailing");

  if (!detailing) {
    return null;
  }

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 className="section-title mt-4">Start with the service lane that matches the job, not a cluttered catch-all menu.</h2>
          <p className="copy-muted mt-5">
            Detailing stays front and center because it carries the strongest visual payoff. Oil
            changes, tire work, and extras stay tighter, clearer, and easier to scan.
          </p>
        </div>
        <div className="mt-12 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-white/8 bg-black/15 p-8 lg:border-b-0 lg:border-r">
                <p className="text-sm uppercase tracking-[0.2em] text-obs-sand/80">{detailing.eyebrow}</p>
                <h3 className="mt-4 font-display text-4xl text-obs-fog sm:text-5xl">{detailing.name}</h3>
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-obs-fog/55">
                  From {detailing.priceFrom}
                </p>
                <p className="mt-5 text-sm leading-7 text-obs-fog/74">{detailing.intro}</p>
                <p className="mt-6 text-sm leading-7 text-obs-fog/88">{detailing.highlight}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link href="/book" className="button-primary">
                    Book detailing
                  </Link>
                  <Link href={`/services/${detailing.slug}`} className="button-secondary">
                    View packages
                  </Link>
                </div>
              </div>
              <div className="grid gap-0 divide-y divide-white/8">
                {detailing.groups.flatMap((group) => group.packages).slice(0, 5).map((pkg) => (
                  <div key={pkg.name} className="grid gap-2 px-8 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6">
                    <div>
                      <p className="text-lg font-semibold text-obs-fog">{pkg.name}</p>
                      <p className="mt-2 text-sm leading-6 text-obs-fog/72">{pkg.summary}</p>
                    </div>
                    <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em] text-obs-sand">
                      {pkg.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-5">
            {supportCategories.map((category) => (
              <article
                key={category.slug}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition hover:bg-white/[0.045]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-obs-sand/80">
                      {category.eyebrow}
                    </p>
                    <h3 className="mt-4 font-display text-3xl text-obs-fog">{category.name}</h3>
                  </div>
                  <p className="text-sm uppercase tracking-[0.16em] text-obs-fog/55">
                    From {category.priceFrom}
                  </p>
                </div>
                <p className="mt-5 text-sm leading-7 text-obs-fog/74">{category.highlight}</p>
                <ul className="mt-6 space-y-3 text-sm text-obs-fog/82">
                  {category.groups[0].packages.slice(0, 3).map((pkg) => (
                    <li key={pkg.name} className="flex items-start justify-between gap-4 border-t border-white/8 pt-3">
                      <span>{pkg.name}</span>
                      <span className="whitespace-nowrap text-obs-sand">{pkg.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/8 pt-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-obs-fog/55">
                    {category.availability === "call-to-schedule"
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
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5 text-sm leading-7 text-obs-fog/72">
            <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Detailing</p>
            <p className="mt-3">The strongest before-and-after category, so it carries the heaviest proof and image weight.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5 text-sm leading-7 text-obs-fog/72">
            <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Maintenance</p>
            <p className="mt-3">Oil and tire services stay cleaner, faster, and more utility-led so people can act without decoding the offer.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5 text-sm leading-7 text-obs-fog/72">
            <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Extras</p>
            <p className="mt-3">Add-ons stay contextual, so they raise average order value without making the main path feel complicated.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
