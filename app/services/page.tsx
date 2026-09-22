import type { Metadata } from "next";

import { PageHero, Prose, SectionLayout } from "@/components/page";
import { getPage, headings } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "The services and statutory duties of the Kenton County Commonwealth’s Attorney’s Office — prosecution, victim services, law enforcement support, externships, and community outreach.",
};

export default function ServicesPage() {
  const { html } = getPage("services");
  const toc = headings(html);
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            How we <em>serve</em> Kenton County
          </>
        }
        lead="The services we provide and the duties we are legally required to carry out under state law."
        crumbs={[{ label: "Services" }]}
        split={{
          src: "/images/rob-sanders-podium.jpg",
          alt: "Commonwealth’s Attorney Rob Sanders speaking at a press conference",
        }}
      />
      <SectionLayout
        section="About"
        current="/services"
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
        <Prose html={html} />
      </SectionLayout>
    </>
  );
}
