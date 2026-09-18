import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, PhoneIcon } from "lucide-react";

import { PageHero, Prose, SectionLayout } from "@/components/page";
import { buttonVariants } from "@/components/ui/button";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Victim’s Advocate Morgan R. Fritsch",
  description:
    "Morgan R. Fritsch, Victim’s Advocate for the Kenton County Commonwealth’s Attorney’s Office, keeps victims of crime informed and supported throughout the judicial process.",
};

export default function VictimsAdvocatePage() {
  const page = getPage("victims-advocate");
  return (
    <>
      <PageHero
        eyebrow="Victim’s Advocate"
        title="Morgan R. Fritsch"
        lead="Keeping victims of crime updated about their cases, supporting them in court, and helping them feel comfortable throughout the judicial process."
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Victim’s Advocate" },
        ]}
        image={{
          src: "/images/staff/morgan-fritsch.jpg",
          alt: "Portrait of Victim’s Advocate Morgan R. Fritsch",
        }}
      >
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-sky-300">
          <a
            href="mailto:mfritsch@prosecutors.ky.gov"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <MailIcon className="size-4" aria-hidden="true" />
            mfritsch@prosecutors.ky.gov
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <PhoneIcon className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
      </PageHero>
      <SectionLayout section="About" current="/about/victims-advocate">
        <Prose
          html={page.html}
          strip={[
            /<p><img src="\/images\/wp\/morgan-winter\.jpg"[^>]*><\/p>/,
            /<p><a href="mailto:mfritsch@prosecutors\.ky\.gov">[^<]*<\/a><\/p>/,
          ]}
        />
        <div className="mt-12 rounded-xl bg-ice-100 p-7">
          <p className="font-serif text-2xl text-ink">
            In danger or being threatened? Call 911.
          </p>
          <p className="mt-2 leading-7 text-body">
            Once you are safe, contact the Victim&rsquo;s Advocate during
            business hours. Learn more about your rights and the resources
            available to you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/resources/victim-rights"
              className={buttonVariants({ variant: "brand", size: "pill" })}
            >
              Victim Rights
            </Link>
            <Link
              href="/resources/victim-resources"
              className={buttonVariants({
                variant: "brand-outline",
                size: "pill",
              })}
            >
              Victim Resources
            </Link>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
