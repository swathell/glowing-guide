import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { featuredBlogPost, latestBlogPosts } from "@/data/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Car care advice, detailing tips, and seasonal mobile service guides from OBS Mobile Detailing."
};

export default function BlogPage() {
  const imageLedPosts = latestBlogPosts.slice(0, 2);
  const textPosts = latestBlogPosts.slice(2);

  return (
    <>
      <PageHero
        eyebrow="Insights & Guides"
        title="Car Care Advice, Detailing Tips & Seasonal Service Guides"
        body="Learn how to protect your vehicle, extend its finish, and make smarter detailing decisions throughout the year."
        actions={
          <>
            <Link href={`/blog/${featuredBlogPost.slug}`} className="button-primary">
              Read Featured Guide
            </Link>
            <Link href="/book" className="button-secondary">
              Book Mobile Detailing
            </Link>
          </>
        }
      />

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,rgba(184,98,47,0.18),transparent_62%)]" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <div className="max-w-md">
              <p className="eyebrow">Why We Write</p>
              <h2 className="section-title mt-4">Better vehicle care starts with better information.</h2>
              <p className="copy-muted mt-5">
                From ceramic coatings and interior protection to seasonal maintenance and
                mobile service tips, our guides help GTA drivers understand what works, what
                doesn&apos;t, and when professional detailing makes the biggest difference.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/82">Serving</p>
                <p className="mt-4 text-sm leading-7 text-obs-fog/74">
                  Toronto, Mississauga, Vaughan, Brampton, Markham, Richmond Hill, Oakville,
                  North York, and Scarborough.
                </p>
              </div>
            </div>

            <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[20rem] overflow-hidden">
                  <Image
                    src={featuredBlogPost.coverImage}
                    alt={featuredBlogPost.coverAlt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/78 via-black/28 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/85">
                      Featured Guide
                    </p>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-obs-fog/70">
                      {featuredBlogPost.category} • {featuredBlogPost.readTime}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/78">
                      {featuredBlogPost.date}
                    </p>
                    <h2 className="mt-4 font-display text-4xl leading-tight text-obs-fog md:text-5xl">
                      {featuredBlogPost.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-8 text-obs-fog/74 md:text-lg">
                      {featuredBlogPost.summary}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/blog/${featuredBlogPost.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-obs-sand transition hover:text-obs-fog"
                    >
                      Continue Reading
                    </Link>
                    <span className="text-xs uppercase tracking-[0.18em] text-obs-fog/48">
                      Useful for first-time detail bookings and package selection
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Latest Articles</p>
              <h2 className="section-title mt-4">Real answers to the questions drivers ask before they book.</h2>
            </div>
            <Link href="/contact" className="hidden text-sm font-semibold text-obs-sand md:inline-flex">
              Need help choosing a service?
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {imageLedPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/20"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative min-h-[16rem] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/15 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em]">
                      <span className="text-obs-sand/80">{post.category}</span>
                      <span className="text-obs-fog/45">{post.readTime}</span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-obs-fog transition group-hover:text-white">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-sm uppercase tracking-[0.16em] text-obs-fog/50">{post.date}</p>
                    <p className="mt-4 text-sm leading-7 text-obs-fog/74">{post.summary}</p>
                    <span className="mt-5 inline-flex text-sm font-semibold text-obs-sand">
                      Read Article
                    </span>
                  </div>
                </Link>
              </article>
            ))}

            {textPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em]">
                    <span className="text-obs-sand/80">{post.category}</span>
                    <span className="text-obs-fog/45">{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-obs-fog transition group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.16em] text-obs-fog/50">{post.date}</p>
                  <p className="mt-4 text-sm leading-7 text-obs-fog/74">{post.summary}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-obs-sand">
                    Learn More
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/8 py-16">
        <Container>
          <div className="flex flex-col gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Need Help Choosing a Service?</p>
              <h2 className="mt-4 font-display text-3xl text-obs-fog md:text-4xl">
                Not sure whether your vehicle needs a maintenance detail, interior reset, ceramic coating, or something more involved?
              </h2>
              <p className="mt-4 text-sm leading-7 text-obs-fog/72">
                Call us at {siteConfig.phone} or book online and we&apos;ll point you in the right direction.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${siteConfig.phone}`} className="button-secondary">
                Call Us
              </a>
              <Link href="/book" className="button-primary">
                Book Now
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
