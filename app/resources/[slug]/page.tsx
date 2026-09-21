import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileTextIcon } from "lucide-react";

import {
  PageHero,
  Prose,
  QuestionList,
  SectionLayout,
} from "@/components/page";
import { getPage } from "@/lib/content";

type ResourcePage = {
  wp: string;
  title: string;
  eyebrow: string;
  lead: string;
};

/** New route slug → original WordPress page, plus hero copy. */
const RESOURCES: Record<string, ResourcePage> = {
  "law-enforcement": {
    wp: "law-enforcement-resources",
    title: "Law Enforcement Resources",
    eyebrow: "For our law enforcement partners",
    lead: "A partner to each of the 17 law enforcement agencies in Kenton County — available 24 hours a day, seven days a week.",
  },
  "victim-rights": {
    wp: "victimrights",
    title: "Victim Rights",
    eyebrow: "For victims of crime",
    lead: "The Constitution of Kentucky affords victims of crime specific rights. Here is what they are and how to request them.",
  },
  "victim-resources": {
    wp: "victim-resources",
    title: "Victim Resources",
    eyebrow: "For victims of crime",
    lead: "If you or someone in your care has suffered through a felony crime, we are here to listen to you and help you.",
  },
  "student-and-job-opportunities": {
    wp: "student-and-job-opportunities",
    title: "Student and Job Opportunities",
    eyebrow: "Externships & careers",
    lead: "One of the best prosecutorial externship programs in Kentucky — and the training ground for many of the state’s prosecutors.",
  },
  "hall-of-fame": {
    wp: "extern-hall-of-fame",
    title: "Hall of Fame",
    eyebrow: "Kenton Commonwealth’s Attorney’s Office",
    lead: "Where some of our former externs have landed after leaving our office.",
  },
  links: {
    wp: "links",
    title: "Links",
    eyebrow: "Partners & resources",
    lead: "Police agencies, community partners, and criminal, victim, and legal resources.",
  },
  subpoenas: {
    wp: "subpoenas",
    title: "Subpoenas",
    eyebrow: "Questions & answers",
    lead: "What a subpoena is, what happens when you’re served with one, and answers to other common questions.",
  },
  faqs: {
    wp: "faqs",
    title: "Frequently Asked Questions",
    eyebrow: "Questions & answers",
    lead: "Answers to the questions our office receives most often.",
  },
  videos: {
    wp: "videos",
    title: "Videos",
    eyebrow: "Watch & learn",
    lead: "Biographical and legal videos from the Kenton County Commonwealth’s Attorney’s Office.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(RESOURCES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = RESOURCES[slug];
  return { title: r?.title, description: r?.lead };
}

export default async function ResourceDetailPage({
  params,
}: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const r = RESOURCES[slug];
  if (!r) notFound();
  const html = getPage(r.wp).html;

  return (
    <>
      <PageHero
        eyebrow={r.eyebrow}
        title={r.title}
        lead={r.lead}
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: r.title },
        ]}
      />
      <SectionLayout section="Resources" current={`/resources/${slug}`}>
        <Body slug={slug} html={html} />
      </SectionLayout>
    </>
  );
}

function Body({ slug, html }: { slug: string; html: string }) {
  switch (slug) {
    case "faqs":
    case "subpoenas":
      return <QuestionList html={html} />;

    case "law-enforcement":
      return (
        <>
          <Prose
            html={html}
            strip={[
              /<table>[\s\S]*<\/table>/,
              /<p><img src="\/images\/wp\/rob-trial\.jpg"[^>]*><\/p>/,
            ]}
          />
          <DownloadsTable html={html} />
        </>
      );

    case "victim-rights":
      return (
        <>
          <Prose
            html={html}
            strip={[
              /<h2><strong>Victim case-update request form<\/strong><\/h2>/,
            ]}
          />
          <section
            aria-labelledby="case-update"
            className="mt-14 rounded-xl bg-mist-50 p-6 ring-1 ring-line md:p-8"
          >
            <h2 id="case-update" className="text-3xl">
              Victim case-update request form
            </h2>
            <p className="mt-2 text-body">
              Submit this form to request updates about your case.
            </p>
            <iframe
              src="https://form.jotform.com/210197067392054"
              title="Victim case-update request form"
              className="mt-6 h-[900px] w-full rounded-lg border-0 bg-white"
              loading="lazy"
            />
          </section>
        </>
      );

    case "hall-of-fame":
      return (
        <Prose
          html={html}
          strip={[
            /<h2>Kenton County Commonwealth&#8217;s Attorneys<\/h2>\s*<p>Coming Soon&#8230;<\/p>/,
          ]}
        />
      );

    default:
      return <Prose html={html} />;
  }
}

/** The original table used headings inside cells; rebuild it as a clean table. */
function DownloadsTable({ html }: { html: string }) {
  const rows = [
    ...html.matchAll(
      /<tr>\s*<td>([^<]+)<\/td>\s*<td>(?:<a href="([^"]+)">)?[\s\S]*?<\/td>\s*<td>(?:<a href="([^"]+)">)?[\s\S]*?<\/td>\s*<\/tr>/g,
    ),
  ].map((m) => ({ name: m[1].trim(), en: m[2], es: m[3] }));

  return (
    <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-line">
      <table className="w-full text-left text-[0.95rem]">
        <thead className="bg-mist-50 text-ink">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">
              Resource
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              In English
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              En Español
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="px-5 py-3.5 text-ink">{r.name}</td>
              {[r.en, r.es].map((href, i) => (
                <td key={i} className="px-5 py-3.5">
                  {href ? (
                    <a
                      href={href}
                      className="inline-flex items-center gap-1.5 font-medium text-navy-700 hover:underline"
                    >
                      <FileTextIcon className="size-4" aria-hidden="true" />
                      {i === 0 ? "English" : "Español"}
                      <span className="sr-only"> PDF: {r.name}</span>
                    </a>
                  ) : (
                    <span className="text-subtle">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
