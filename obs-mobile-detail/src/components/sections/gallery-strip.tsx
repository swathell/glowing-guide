"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { galleryUploads } from "@/data/gallery";

const featuredImages = galleryUploads.slice(0, 8);

export function GalleryStripSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const activeImage = featuredImages[activeIndex];

  return (
    <section className="border-y border-white/8 bg-obs-surface py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Gallery</p>
            <h2 className="section-title mt-4">Real detailing proof, staged as a living carousel instead of a dead grid.</h2>
            <p className="copy-muted mt-5">
              Fresh uploads now rotate through the homepage so the work itself carries more of the trust load.
            </p>
          </div>
          <Link href="/gallery" className="text-sm font-semibold text-obs-sand md:inline-flex">
            View full gallery
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <div className="relative min-h-[24rem] sm:min-h-[30rem]">
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-cover transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-obs-sand/85">Featured Work</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl text-obs-fog sm:text-4xl">{activeImage.label}</p>
                    <p className="mt-2 max-w-md text-sm text-obs-fog/78">
                      Rotating recent work pulled from the current uploaded image set.
                    </p>
                  </div>
                  <div className="hidden gap-2 sm:flex">
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-lg text-obs-fog transition hover:bg-black/45"
                      onClick={() =>
                        setActiveIndex((current) =>
                          current === 0 ? featuredImages.length - 1 : current - 1
                        )
                      }
                      aria-label="Previous gallery image"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-lg text-obs-fog transition hover:bg-black/45"
                      onClick={() => setActiveIndex((current) => (current + 1) % featuredImages.length)}
                      aria-label="Next gallery image"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {featuredImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                  activeIndex === index
                    ? "border-obs-sand/70 bg-white/[0.05]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="relative aspect-[4/5]">
                  <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-obs-fog/90">{image.label}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
