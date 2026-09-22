import type { Metadata } from "next";
import { MailIcon } from "lucide-react";

import { PageHero, SectionLayout } from "@/components/page";
import { detectives } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commonwealth’s Detectives",
  description:
    "The Commonwealth’s Detectives for Kentucky’s 16th Judicial Circuit, who investigate felony cases alongside the office’s prosecutors.",
};

export default function DetectivesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={
          <>
            Commonwealth&rsquo;s <em>Detectives</em>
          </>
        }
        lead="Our detectives investigate felony cases alongside the office’s prosecutors and work directly with the 17 law enforcement agencies serving Kenton County."
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Commonwealth’s Detectives" },
        ]}
      />
      <SectionLayout section="About" current="/about/detectives">
        <ul className="grid gap-5 sm:grid-cols-2">
          {detectives.map((d) => (
            <li key={d.slug} className="rounded-sm p-6 ring-1 ring-line">
              <p className="font-serif text-2xl text-ink">{d.name}</p>
              <p className="mt-1 text-sm text-subtle">{d.title}</p>
              {d.email && (
                <a
                  href={`mailto:${d.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-medium break-all text-navy-700 hover:underline"
                >
                  <MailIcon className="size-4 shrink-0" aria-hidden="true" />
                  {d.email}
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-10 leading-7 text-body">
          To reach a detective during business hours, call the office at{" "}
          <a
            href={site.phoneHref}
            className="font-medium text-navy-700 hover:underline"
          >
            {site.phone}
          </a>
          .
        </p>
      </SectionLayout>
    </>
  );
}
