import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Interactive testimonial patterns for desktop hover and mobile tap behavior."
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="A trust layer that works before the hover effect even starts."
        body="Review cards are readable in their default state, then expand into fuller proof moments through hover or tap behavior in the next implementation pass."
      />
      <TestimonialsSection />
    </>
  );
}
