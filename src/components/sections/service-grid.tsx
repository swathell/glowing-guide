import Link from "next/link";
import { serviceCategories } from "@/data/services";
import { Container } from "@/components/ui/container";

export function ServiceGridSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 className="section-title mt-4">Service depth without the clutter.</h2>
          <p className="copy-muted mt-5">
            Standard packages stay easy to book. Higher-complexity work stays visible, but moves
            through a smarter review path.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceCategories.map((category) => (
            <article
              key={category.slug}
              className="surface-border rounded-xl bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-obs-sand/80">
                {category.serviceType === "direct-book"
                  ? "Direct Book"
                  : category.serviceType === "deposit"
                    ? "Deposit"
                    : "Review Required"}
              </p>
              <h3 className="mt-4 font-display text-3xl text-obs-fog">{category.name}</h3>
              <p className="mt-4 text-sm leading-6 text-obs-fog/72">{category.intro}</p>
              <ul className="mt-6 space-y-3 text-sm text-obs-fog/80">
                {category.packages.slice(0, 2).map((pkg) => (
                  <li key={pkg.name} className="flex items-start justify-between gap-4 border-t border-white/8 pt-3">
                    <span>{pkg.name}</span>
                    <span className="whitespace-nowrap text-obs-sand">{pkg.price}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/services/${category.slug}`} className="mt-6 inline-flex text-sm font-semibold text-obs-sand">
                Explore service
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
