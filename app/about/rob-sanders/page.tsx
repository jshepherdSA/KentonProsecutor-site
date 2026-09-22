import type { Metadata } from "next";
import Link from "next/link";

import { PageHero, Prose, SectionLayout } from "@/components/page";
import { buttonVariants } from "@/components/ui/button";
import { getPage, headings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rob Sanders",
  description:
    "Rob Sanders, Commonwealth’s Attorney for Kentucky’s 16th Judicial Circuit — three generations of public service to Kenton County.",
};

const facts = [
  ["Took office", "January 1, 2007"],
  ["Education", "BA, Tulane University · JD, Salmon P. Chase College of Law"],
  ["Previously", "Vice Mayor, Covington City Commission"],
  ["Statewide", "Past President, KY Commonwealth’s Attorneys Association"],
  ["Honored", "2023 Outstanding Kentucky Prosecutor"],
  ["Community", "20 years as a Fort Mitchell volunteer firefighter"],
];

export default function RobSandersPage() {
  // The original bio used h6 section titles; promote them to h2 and drop the
  // page-title heading and the trailing "visit the staff directory" line.
  const html = getPage("rob-sanders")
    .html.replace(/^<h2>[\s\S]*?<\/h2>/, "")
    .replace(/<h4><strong>([\s\S]*?)<\/strong><\/h4>/g, "<h2>$1</h2>")
    .replace(/<h3>Visit the[\s\S]*?<\/h3>/, "")
    .replace(/<img src="\/images\/wp\/0324-0988e-2\.jpg"[^>]*>/, "")
    // the 2016 courtroom photo carries the text better a little larger
    .replace(
      /(<img src="\/images\/wp\/B9323387126Z[^"]*"[^>]*class=")([^"]*)(")/,
      "$1$2 wide$3",
    )
    // lead the statewide-leadership section with Rob in the courtroom
    .replace(
      "<h2>Improving the Criminal Justice System in Kentucky and U.S.</h2>",
      '<figure><img src="/images/rob-in-court.jpg" alt="Rob Sanders holding a handgun as he addresses the courtroom during a trial" width="742" height="475" class="full"><figcaption>Rob Sanders presenting evidence to the jury in Kenton Circuit Court.</figcaption></figure>' +
        "<h2>Improving the Criminal Justice System in Kentucky and U.S.</h2>",
    );
  const toc = headings(html);

  return (
    <>
      <PageHero
        eyebrow="Commonwealth’s Attorney · 16th Judicial Circuit"
        title="Rob Sanders"
        lead="Commonwealth’s Attorney for Kentucky’s 16th Judicial Circuit, Kenton County."
        crumbs={[{ label: "About", href: "/about" }, { label: "Rob Sanders" }]}
        image={{
          src: "/images/wp/0324-0988e-2.jpg",
          alt: "Portrait of Commonwealth’s Attorney Rob Sanders",
        }}
      />
      <SectionLayout
        section="About"
        current="/about/rob-sanders"
        aside={
          <div className="rounded-xl p-6 ring-1 ring-line">
            <p className="eyebrow text-steel-500">On this page</p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {toc.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="text-navy-700 hover:underline"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <dl className="mb-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2">
          {facts.map(([k, v]) => (
            <div key={k} className="bg-white p-5">
              <dt className="eyebrow text-steel-500">{k}</dt>
              <dd className="mt-1.5 font-serif text-lg leading-snug text-ink">
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <Prose html={html} />
        <div className="mt-12 flex flex-wrap items-center gap-4 rounded-xl bg-ice-100 p-6">
          <p className="flex-1 font-serif text-xl text-ink">
            Want to reach Rob or his team?
          </p>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "brand", size: "pill" })}
          >
            Staff directory
          </Link>
        </div>
      </SectionLayout>
    </>
  );
}
