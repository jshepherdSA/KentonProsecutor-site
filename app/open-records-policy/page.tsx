import type { Metadata } from "next";

import { ContactCard, PageHero, Prose } from "@/components/page";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Open Records Policy",
  description:
    "How to request public records from the Commonwealth’s Attorney for the 16th Judicial Circuit of Kentucky (Kenton County) under KRS 61.870 to 61.884.",
};

export default function OpenRecordsPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Open Records Policy"
        lead="Pursuant to KRS 61.870 to 61.884, the public records of this office, other than those exempted by law, are open for inspection."
        crumbs={[{ label: "Open Records Policy" }]}
      />
      <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-8">
          <Prose html={getPage("open-records-policy").html} />
        </div>
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <ContactCard />
          </div>
        </aside>
      </div>
    </>
  );
}
