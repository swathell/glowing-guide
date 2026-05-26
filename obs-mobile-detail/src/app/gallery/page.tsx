import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

const galleryItems = [
  { src: "/images/gallery/gallery-truck.png", label: "Exterior" },
  { src: "/images/gallery/contact.png", label: "Contact Moment" },
  { src: "/images/gallery/booking.png", label: "Booking Context" },
  { src: "/images/gallery/testimonials.png", label: "Review Section Reference" }
];

export const metadata: Metadata = {
  title: "Gallery",
  description: "Carousel-ready gallery structure for recent detailing work and before-and-after proof."
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Built for a carousel-led gallery that still scales into a fuller media library."
        body="This page uses a large featured stage, thumbnail-friendly structure, and room for service tags or before-and-after grouping."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="relative min-h-[32rem] overflow-hidden rounded-2xl">
              <Image src={galleryItems[0].src} alt="" fill className="object-cover" />
            </div>
            <div className="grid gap-4">
              {galleryItems.slice(1).map((item) => (
                <div key={item.src} className="relative min-h-[10rem] overflow-hidden rounded-2xl">
                  <Image src={item.src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
