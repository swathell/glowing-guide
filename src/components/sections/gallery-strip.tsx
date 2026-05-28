import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const images = [
  "/images/gallery/gallery-truck.png",
  "/images/gallery/contact.png",
  "/images/gallery/booking.png"
];

export function GalleryStripSection() {
  return (
    <section className="border-y border-white/8 bg-obs-surface py-20 md:py-28">
      <Container>
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Gallery</p>
            <h2 className="section-title mt-4">A carousel-led proof layer, not a buried album.</h2>
          </div>
          <Link href="/gallery" className="hidden text-sm font-semibold text-obs-sand md:inline-flex">
            View full gallery
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-[1.6fr_0.8fr_0.8fr]">
          {images.map((image, index) => (
            <div key={image} className={index === 0 ? "relative min-h-[28rem] overflow-hidden rounded-xl" : "relative min-h-[13.5rem] overflow-hidden rounded-xl md:min-h-[28rem]"}>
              <Image src={image} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
