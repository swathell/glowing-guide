import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { Container } from "@/components/ui/container";

const posts = [
  {
    title: "The complete guide to mobile detailing in the GTA",
    date: "May 30, 2026",
    category: "Guide",
    image: "/images/obs-products-driveway.png",
    body:
      "How driveway access, vehicle size, salt buildup, and package scope affect what a mobile detail actually needs on arrival."
  },
  {
    title: "Paint protection is not one decision",
    date: "May 22, 2026",
    category: "Protection",
    image: "/images/obs-foam-wash.png",
    body:
      "A practical breakdown of wash prep, surface inspection, sealants, and when a deeper correction conversation makes sense."
  },
  {
    title: "Interior resets for family vehicles",
    date: "May 12, 2026",
    category: "Interior",
    image: "/images/obs-hand-wipe.png",
    body:
      "What separates a light refresh from a true reset when crumbs, pet hair, stains, and winter debris have built up over time."
  }
];

export default function BlogPage() {
  return (
    <SiteShell>
      <section className="border-b border-obs-line bg-obs-fog text-obs-ink">
        <Container className="grid min-h-[calc(100svh-5rem)] items-stretch gap-10 py-12 lg:grid-cols-[0.56fr_0.44fr]">
          <div className="flex flex-col justify-center py-8">
            <p className="mb-5 border-l-4 border-obs-copper pl-4 text-sm font-bold uppercase text-obs-copper">
              Shop notes
            </p>
            <h1 className="font-display text-5xl leading-[0.98] md:text-7xl">
              Better vehicle care starts with better information.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-obs-muted">
              Straightforward guidance for choosing packages, understanding vehicle condition, and keeping a clean car
              easier to maintain between appointments.
            </p>
          </div>
          <article className="relative min-h-[31rem] overflow-hidden bg-obs-ink text-obs-fog">
            <Image src="/images/obs-products-driveway.png" alt="" fill priority className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-obs-ink via-obs-ink/58 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
              <p className="text-sm uppercase text-obs-copper">Featured field note</p>
              <h2 className="mt-4 font-display text-4xl">Mobile work has a different checklist.</h2>
              <p className="mt-4 leading-7 text-obs-sand">
                A clean appointment depends on access, prep, equipment, weather, and the honesty of the vehicle
                condition notes.
              </p>
            </div>
          </article>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-obs-line pb-7 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase text-obs-copper">Latest reads</p>
              <h2 className="mt-3 font-display text-4xl text-obs-fog">Practical notes from the detail bay.</h2>
            </div>
            <p className="max-w-md leading-7 text-obs-sand">
              Field-tested advice on package choice, condition, protection, maintenance, and timing.
            </p>
          </div>

          <div className="divide-y divide-obs-line border-b border-obs-line">
            {posts.map((post, index) => (
              <article key={post.title} className="grid gap-6 py-8 md:grid-cols-[8rem_1fr_15rem] md:items-center">
                <div className="text-sm text-obs-sand">
                  <p className="text-obs-copper">{post.category}</p>
                  <p className="mt-2">{post.date}</p>
                </div>
                <div>
                  <h3 className="font-display text-3xl text-obs-fog">{post.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-obs-sand">{post.body}</p>
                  <Link href="/blog" className="mt-5 inline-block text-sm font-bold uppercase text-obs-copper">
                    Read note
                  </Link>
                </div>
                <div className="relative h-44 overflow-hidden md:h-36">
                  <Image src={post.image} alt="" fill className="object-cover" sizes="240px" />
                  <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center bg-obs-copper text-sm font-bold text-obs-fog">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
