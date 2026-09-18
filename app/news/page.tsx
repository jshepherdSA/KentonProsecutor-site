import type { Metadata } from "next";
import Link from "next/link";

import { NewsList } from "@/components/news-list";
import { PageHero, SectionLayout } from "@/components/page";
import { formatDate, posts } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Commentary",
  description:
    "Press releases, case updates, and Commonwealth’s Commentary from the Kenton County Commonwealth’s Attorney’s Office.",
};

const CATEGORIES = [
  "Commonwealth's Commentary",
  "Media/Press Releases",
  "Press Room",
  "Grand Jury Reports",
];

export default function NewsPage() {
  const summaries = posts.map(({ slug, date, title, excerpt, categories }) => ({
    slug,
    date,
    dateLabel: formatDate(date),
    title,
    excerpt,
    categories,
  }));

  return (
    <>
      <PageHero
        eyebrow="News"
        title={
          <>
            Commonwealth&rsquo;s <em>Commentary</em> &amp; news
          </>
        }
        lead="As public servants, our team is committed to working in a transparent manner and keeping the general public informed about our cases and work."
        crumbs={[{ label: "News" }]}
      />
      <SectionLayout
        section="News"
        current="/news"
        aside={
          <div className="rounded-xl bg-navy-700 p-6 text-white">
            <p className="eyebrow text-sky-300">Weekly newsletter</p>
            <p className="mt-3 leading-7 text-white/85">
              Get <em>This Week in Kenton Circuit Court</em> delivered to your
              inbox.
            </p>
            <a
              href={site.newsletterUrl}
              className="mt-5 inline-flex h-11 items-center rounded-full bg-white px-5 text-[0.8rem] font-semibold tracking-[0.12em] text-navy-900 uppercase hover:bg-ice-100"
            >
              Sign up
            </a>
            <p className="mt-4 text-sm">
              <Link
                href="/news/newsletter-issues"
                className="text-sky-300 hover:text-white hover:underline"
              >
                Browse past issues &rarr;
              </Link>
            </p>
          </div>
        }
      >
        <NewsList posts={summaries} categories={CATEGORIES} />
      </SectionLayout>
    </>
  );
}
