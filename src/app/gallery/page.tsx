import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { galleryUploads } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Carousel-ready gallery structure for recent detailing work and before-and-after proof."
};

export default function GalleryPage() {
  const [featured, ...galleryItems] = galleryUploads;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Fresh gallery uploads are now staged inside a cleaner proof library."
        body="This gallery now pulls from the uploaded image set directly, with one featured stage and a responsive proof grid that can expand into a richer carousel pass next."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Uploaded Set</p>
              <h2 className="section-title mt-4">{galleryUploads.length} gallery images are now live in the project.</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[32rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <Image src={featured.src} alt={featured.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm uppercase tracking-[0.22em] text-obs-sand/85">{featured.label}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {galleryItems.map((item, index) => (
                <div
                  key={item.src}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${
                    index >= galleryItems.length - 2 ? "sm:col-span-2 min-h-[10rem]" : "min-h-[14rem]"
                  }`}
                >
                  <Image src={item.src} alt={item.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-obs-fog/90">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
