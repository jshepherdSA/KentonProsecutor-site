import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero, Prose, SectionLayout } from "@/components/page";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Kenton County Commonwealth’s Attorney’s Office — Rob Sanders, his Assistant Commonwealth’s Attorneys, and the office’s Victim’s Advocate.",
};

const cards = [
  {
    title: "What We Do",
    href: "/services",
    img: "/images/wp/RS_Badge.png",
    alt: "Kenton County Commonwealth’s Attorney badge",
    fit: "object-contain p-8 bg-ice-100",
  },
  {
    title: "Rob Sanders",
    href: "/about/rob-sanders",
    img: "/images/wp/0324-0988e-2.jpg",
    alt: "Commonwealth’s Attorney Rob Sanders",
    fit: "object-cover object-top",
  },
  {
    title: "Assistant Commonwealth’s Attorneys",
    href: "/about/staff",
    img: "/images/staff-group.jpg",
    alt: "Rob Sanders with the Assistant Commonwealth’s Attorneys",
    fit: "object-cover",
  },
  {
    title: "Victim’s Advocate",
    href: "/about/victims-advocate",
    img: "/images/staff/morgan-fritsch.jpg",
    alt: "Victim’s Advocate Morgan R. Fritsch",
    fit: "object-cover object-top",
  },
];

export default function AboutPage() {
  const letter = getPage(
    "welcome-to-the-online-office-of-the-kenton-county-commonwealths-attorney",
  );
  return (
    <>
      <PageHero
        eyebrow="About the office"
        title={
          <>
            Serving the people of <em>Kenton County</em>
          </>
        }
        lead="The Office of the Commonwealth’s Attorney for Kentucky’s 16th Judicial Circuit prosecutes all felonies in Kenton County."
        crumbs={[{ label: "About" }]}
      />
      <SectionLayout section="About" current="/about">
        <ul className="grid gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group block overflow-hidden rounded-xl ring-1 ring-line transition hover:ring-steel-500"
              >
                <div className="relative aspect-[16/10] bg-mist-50">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className={c.fit}
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <span className="font-serif text-xl text-ink group-hover:text-navy-700">
                    {c.title}
                  </span>
                  <span aria-hidden="true" className="text-navy-700">
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section
          aria-labelledby="letter"
          className="mt-16 border-t border-line pt-14"
        >
          <p className="eyebrow text-steel-500">A message from Rob</p>
          <h2 id="letter" className="mt-3 text-3xl md:text-4xl">
            Welcome to the online office of the Kenton County
            Commonwealth&rsquo;s Attorney
          </h2>
          <Prose
            className="mt-8"
            html={`<p>As the Commonwealth’s Attorney for the 16th Judicial Circuit, my office prosecutes all felonies in Kenton County, the state’s third most populated county with more than 165,000 residents.</p>${letter.html}`}
            strip={[
              /<p>&#8230; <em>Continued from[\s\S]*?<\/p>/,
              /<p><img src="\/images\/wp\/Rob_Sanders_Signature\.jpg"[^>]*><\/p>\s*<p>Rob Sanders<\/p>/,
            ]}
          />
          <Image
            src="/images/rob-signature.png"
            alt="Rob Sanders’ signature"
            width={300}
            height={69}
            className="mt-2 h-auto w-48"
          />
          <p className="mt-2 text-sm text-subtle">
            Rob Sanders, Commonwealth&rsquo;s Attorney
          </p>
        </section>
      </SectionLayout>
    </>
  );
}
