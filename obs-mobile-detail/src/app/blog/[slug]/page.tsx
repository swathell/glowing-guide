import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { blogPosts, getBlogPost } from "@/data/blog";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found"
    };
  }

  return {
    title: post.title,
    description: post.summary
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(184,98,47,0.18),transparent_58%)]" />
        <Container>
          <Link href="/blog" className="inline-flex text-sm font-semibold text-obs-sand transition hover:text-obs-fog">
            Back to all posts
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow">{post.category}</p>
              <h1 className="display-title mt-4 text-obs-fog">{post.title}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm uppercase tracking-[0.16em] text-obs-fog/56">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <p className="copy-muted mt-6 max-w-2xl">{post.summary}</p>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] lg:min-h-[26rem]">
              <Image src={post.coverImage} alt={post.coverAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="max-w-3xl">
            <div className="space-y-10">
              {post.content.map((section) => (
                <section key={section.heading ?? section.paragraphs?.[0] ?? section.bullets?.[0]}>
                  {section.heading ? (
                    <h2 className="font-display text-3xl text-obs-fog md:text-4xl">{section.heading}</h2>
                  ) : null}

                  {section.paragraphs ? (
                    <div className={`${section.heading ? "mt-5" : ""} space-y-5 text-base leading-8 text-obs-fog/78`}>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className={`${section.paragraphs || section.heading ? "mt-5" : ""} space-y-3 text-base leading-8 text-obs-fog/78`}>
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-[0.78rem] h-1.5 w-1.5 rounded-full bg-obs-copper" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="lg:pt-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Need help choosing a service?</p>
              <p className="mt-4 text-sm leading-7 text-obs-fog/74">
                If you&apos;re not sure what your vehicle needs, the fastest next step is to book
                online or send us a message with a few details.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/book" className="button-primary">
                  Book Mobile Detailing
                </Link>
                <Link href="/contact" className="button-secondary">
                  Request a Quote
                </Link>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
