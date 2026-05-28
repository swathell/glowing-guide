import Link from "next/link";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/data/blog";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="max-w-2xl">
              <p className="eyebrow">Reviews</p>
              <h2 className="section-title mt-4">People should leave the homepage feeling like the work is real and the process is calm.</h2>
              <p className="copy-muted mt-5">
                Social proof matters more when it sounds grounded, mentions the actual service, and
                sits beside real proof instead of floating alone.
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((review) => (
                <article
                  key={review.name}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.06]"
                >
                  <p className="text-sm text-[#e7ba45]">★★★★★</p>
                  <h3 className="mt-5 font-display text-3xl text-obs-fog">{review.name}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-obs-sand/75">{review.service}</p>
                  <p className="mt-5 line-clamp-5 text-sm leading-7 text-obs-fog/78 transition group-hover:text-obs-fog">
                    {review.quote}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-obs-fog/50">{review.date}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <article className="rounded-3xl border border-white/10 bg-black/15 p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Follow the work</p>
              <h3 className="mt-4 font-display text-4xl text-obs-fog">Stay close to recent jobs, process clips, and local updates.</h3>
              <p className="mt-4 text-sm leading-7 text-obs-fog/74">
                The strongest social proof for mobile service is seeing the work often enough that
                it stops feeling hypothetical.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-obs-fog/80 transition hover:border-obs-sand/50 hover:text-obs-fog"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">From the blog</p>
                  <h3 className="mt-4 font-display text-3xl text-obs-fog">Short reads that answer real service questions.</h3>
                </div>
                <Link href="/blog" className="hidden text-sm font-semibold text-obs-sand sm:inline-flex">
                  View all
                </Link>
              </div>
              <div className="mt-6 space-y-4">
                {blogPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post.slug}
                    href="/blog"
                    className="block rounded-2xl border border-white/8 bg-black/15 p-5 transition hover:bg-black/25"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/76">{post.category}</p>
                    <h4 className="mt-3 text-lg font-semibold text-obs-fog">{post.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-obs-fog/72">{post.summary}</p>
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
