import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseIcon,
  CircleHelpIcon,
  FileTextIcon,
  HandHeartIcon,
  LinkIcon,
  PlayIcon,
  ScaleIcon,
  ShieldIcon,
  TrophyIcon,
} from "lucide-react";

import { PageHero, SectionLayout } from "@/components/page";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Resources from the Kenton County Commonwealth’s Attorney’s Office for victims, law enforcement, students, and the public.",
};

const groups = [
  {
    label: "For victims",
    items: [
      {
        title: "Victim Rights",
        href: "/resources/victim-rights",
        icon: ScaleIcon,
        body: "Your rights under the Constitution of Kentucky, and how to get court-date notifications.",
      },
      {
        title: "Victim Resources",
        href: "/resources/victim-resources",
        icon: HandHeartIcon,
        body: "Victim impact statement, compensation packet, and a guide to the criminal justice process.",
      },
    ],
  },
  {
    label: "For law enforcement",
    items: [
      {
        title: "Law Enforcement Resources",
        href: "/resources/law-enforcement",
        icon: ShieldIcon,
        body: "24/7 on-call prosecutors, the Felony Hotline, and downloadable consent and waiver forms.",
      },
    ],
  },
  {
    label: "For students & job seekers",
    items: [
      {
        title: "Student and Job Opportunities",
        href: "/resources/student-and-job-opportunities",
        icon: BriefcaseIcon,
        body: "Our prosecutorial externship program and all job announcements.",
      },
      {
        title: "Hall of Fame",
        href: "/resources/hall-of-fame",
        icon: TrophyIcon,
        body: "Where former externs have gone on to serve.",
      },
    ],
  },
  {
    label: "For everyone",
    items: [
      {
        title: "FAQs",
        href: "/resources/faqs",
        icon: CircleHelpIcon,
        body: "Answers to the questions our office receives most often.",
      },
      {
        title: "Subpoenas",
        href: "/resources/subpoenas",
        icon: FileTextIcon,
        body: "What to do if you’ve been served with a subpoena.",
      },
      {
        title: "Links",
        href: "/resources/links",
        icon: LinkIcon,
        body: "Partner agencies, VINE, offender lookup, and more.",
      },
      {
        title: "Videos",
        href: "/resources/videos",
        icon: PlayIcon,
        body: "Biographical and legal videos from our office.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Information and help for our <em>community</em>
          </>
        }
        lead="Resources for victims, law enforcement, students, and the general public."
        crumbs={[{ label: "Resources" }]}
      />
      <SectionLayout section="Resources" current="/resources">
        <div className="space-y-12">
          {groups.map((g) => (
            <section key={g.label} aria-label={g.label}>
              <h2 className="eyebrow font-sans text-steel-500">{g.label}</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="group flex h-full gap-4 rounded-xl p-6 ring-1 ring-line transition hover:bg-mist-50 hover:ring-steel-500"
                    >
                      <it.icon
                        className="mt-1 size-6 shrink-0 text-steel-500"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-serif text-xl text-ink group-hover:text-navy-700">
                          {it.title}
                        </span>
                        <span className="mt-1.5 block text-[0.95rem] leading-6 text-body">
                          {it.body}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
