import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { Container } from "@/components/ui/container";

const gallery = [
  {
    title: "Driveway prep",
    image: "/images/obs-products-driveway.png",
    tag: "Setup"
  },
  {
    title: "Foam contact wash",
    image: "/images/obs-foam-wash.png",
    tag: "Exterior"
  },
  {
    title: "Hood clarity pass",
    image: "/images/obs-gallery-hood.png",
    tag: "Finish"
  },
  {
    title: "Front-end reset",
    image: "/images/obs-gallery-front.png",
    tag: "Transform"
  },
  {
    title: "Panel wipe",
    image: "/images/obs-hand-wipe.png",
    tag: "Care"
  },
  {
    title: "Process proof",
    image: "/images/obs-gallery-process.png",
    tag: "Inspection"
  }
];

export default function GalleryPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-obs-line bg-obs-ink">
        <Container className="relative grid min-h-[calc(100svh-5rem)] gap-8 py-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="z-10">
            <p className="mb-5 border-l-4 border-obs-copper pl-4 text-sm font-bold uppercase text-obs-sand">
              Transformation proof
            </p>
            <h1 className="font-display text-5xl leading-[0.98] text-obs-fog md:text-7xl">
              Work that holds up under inspection light.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-obs-sand">
              Real service moments, finish checks, driveway setups, and surface work from a mobile detailing process
              built around visible transformation.
            </p>
            <Link
              href="/book"
              className="mt-9 inline-block bg-obs-copper px-5 py-3 text-sm font-bold uppercase text-obs-fog transition hover:bg-obs-fog hover:text-obs-ink"
            >
              Book a transformation
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {gallery.slice(0, 4).map((item, index) => (
              <figure
                key={item.title}
                className={`relative overflow-hidden ${index === 0 ? "min-h-72 md:min-h-96" : "min-h-56 md:min-h-72"}`}
              >
                <Image src={item.image} alt={item.title} fill priority={index < 2} className="object-cover" sizes="32vw" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-obs-ink to-transparent p-4 pt-16">
                  <span className="font-display text-xl text-obs-fog">{item.title}</span>
                  <span className="bg-obs-copper px-2 py-1 text-xs font-bold uppercase text-obs-fog">{item.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
            <aside>
              <p className="text-sm uppercase text-obs-copper">Evidence grid</p>
              <h2 className="mt-4 font-display text-4xl text-obs-fog">Proof from the work itself.</h2>
              <p className="mt-5 leading-7 text-obs-sand">
                Look for process, surface clarity, setup, and finished details instead of generic shine shots.
              </p>
            </aside>

            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((item) => (
                <figure key={`${item.title}-grid`} className="group relative min-h-72 overflow-hidden border border-obs-line">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obs-ink/88 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="text-sm uppercase text-obs-copper">{item.tag}</p>
                      <h3 className="mt-1 font-display text-2xl text-obs-fog">{item.title}</h3>
                    </div>
                    <span className="h-10 w-10 border-b-2 border-r-2 border-obs-copper" aria-hidden="true" />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
