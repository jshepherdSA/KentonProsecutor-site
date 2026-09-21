import type { Metadata } from "next";

import { PageHero, Prose, SectionLayout } from "@/components/page";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter Issues",
  description:
    "The archive of This Week in Kenton Circuit Court, the weekly newsletter of the Kenton County Commonwealth’s Attorney’s Office, dating back to January 2012.",
};

export default function NewsletterIssuesPage() {
  return (
    <>
      <PageHero
        eyebrow="Weekly newsletter"
        title={
          <>
            <em>This Week</em> in Kenton Circuit Court
          </>
        }
        lead="The latest issue of our weekly newsletter and an archive dating back to January 2012."
        crumbs={[
          { label: "News", href: "/news" },
          { label: "Newsletter Issues" },
        ]}
      >
        <a
          href={site.newsletterUrl}
          className="mt-7 inline-flex h-12 items-center rounded-sm bg-white px-6 text-[0.8rem] font-semibold tracking-[0.12em] text-navy-900 uppercase hover:bg-ice-100"
        >
          Sign up for the newsletter
        </a>
      </PageHero>
      <SectionLayout section="News" current="/news/newsletter-issues">
        <Prose
          html={getPage("newsletter-issues").html}
          className="prose-base [&_td]:min-w-40 [&_ul]:pl-4"
          strip={[
            /<p><img src="\/images\/wp\/3\.png"[^>]*><\/p>/,
            /<h2><a href="http:\/\/visitor\.r20\.constantcontact\.com[\s\S]*?<\/h2>/,
          ]}
        />
      </SectionLayout>
    </>
  );
}
