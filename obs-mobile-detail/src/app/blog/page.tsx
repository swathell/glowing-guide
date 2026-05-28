import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Service education, detailing insights, and mobile auto care articles from OBS."
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="An editorial surface for trust, education, and higher-intent search traffic."
        body="The blog should support authority, SEO, and customer confidence without feeling like a template add-on. These preview articles give the section a cleaner structure now."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Editorial role</p>
              <h2 className="section-title mt-4">Use articles to answer service questions before the user has to ask them.</h2>
              <p className="copy-muted mt-5">
                This section is best used for care education, seasonal service guidance, and high-trust explanations of premium detailing work.
              </p>
            </div>
            <div className="space-y-5">
              {blogPosts.map((post) => (
                <article key={post.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">{post.category}</p>
                  <h3 className="mt-4 font-display text-3xl text-obs-fog">{post.title}</h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.16em] text-obs-fog/50">{post.date}</p>
                  <p className="mt-4 text-sm leading-7 text-obs-fog/76">{post.summary}</p>
                  <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-obs-sand">
                    Ask about this service
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
