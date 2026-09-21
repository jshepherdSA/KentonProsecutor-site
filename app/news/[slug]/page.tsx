import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero, Prose, SectionLayout } from "@/components/page";
import { cn } from "@/lib/utils";
import { bulletizeCharges, formatDate, getPost, posts } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const i = posts.findIndex((p) => p.slug === slug);
  const newer = posts[i - 1];
  const older = posts[i + 1];
  const showFeatured = post.image && !post.html.includes("<img");
  // Two-defendant mugshots are wide; give them more room than a single portrait.
  const wideImage = (post.imageWidth ?? 0) > (post.imageHeight ?? 1);

  return (
    <>
      <PageHero
        eyebrow={formatDate(post.date)}
        title={post.title}
        crumbs={[{ label: "News", href: "/news" }, { label: "Article" }]}
      >
        {post.categories.length > 0 && (
          <p className="mt-5 text-sm text-white/70">
            {post.categories.join(" · ")}
          </p>
        )}
      </PageHero>
      <SectionLayout section="News" current="/news">
        <article>
          {showFeatured && post.image && (
            <Image
              src={post.image}
              alt=""
              width={post.imageWidth ?? 800}
              height={post.imageHeight ?? 600}
              priority
              // Floated so the release text wraps around it, as on the original site.
              className={cn(
                "mr-6 mb-4 h-auto rounded-sm sm:float-left",
                wideImage ? "w-full sm:w-80" : "w-40 sm:w-56",
              )}
            />
          )}
          <Prose html={bulletizeCharges(post.html)} />
          <div className="clear-both" />
        </article>

        <nav
          aria-label="More news"
          className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/news/${older.slug}`}
              className="group rounded-xl p-5 ring-1 ring-line hover:ring-steel-500"
            >
              <span className="eyebrow text-steel-500">&larr; Older</span>
              <span className="mt-2 block font-serif text-lg leading-snug text-ink group-hover:text-navy-700">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/news/${newer.slug}`}
              className="group rounded-xl p-5 text-right ring-1 ring-line hover:ring-steel-500"
            >
              <span className="eyebrow text-steel-500">Newer &rarr;</span>
              <span className="mt-2 block font-serif text-lg leading-snug text-ink group-hover:text-navy-700">
                {newer.title}
              </span>
            </Link>
          )}
        </nav>
      </SectionLayout>
    </>
  );
}
