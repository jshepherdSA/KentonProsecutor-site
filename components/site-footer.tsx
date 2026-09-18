import Image from "next/image";
import Link from "next/link";

import { nav, site } from "@/lib/site";

const about = nav.find((n) => n.label === "About")?.children ?? [];
const resources = nav.find((n) => n.label === "Resources")?.children ?? [];

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-heritage-700 bg-navy-950 text-white/75">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Image
            src="/images/kenton-seal.png"
            alt="Seal of the Kenton County Commonwealth's Attorney Office"
            width={112}
            height={112}
            className="size-24"
          />
          <p className="mt-5 font-serif text-2xl text-white">{site.office}</p>
          <p className="mt-1 text-sm">
            {site.circuit} &mdash; Kenton County, Kentucky
          </p>
          <address className="mt-6 space-y-1 text-[0.95rem] not-italic">
            <p>{site.address.building}</p>
            <p>{site.address.street}</p>
            <p>{site.address.city}</p>
            <p className="pt-3">
              Phone:{" "}
              <a href={site.phoneHref} className="text-white hover:underline">
                {site.phone}
              </a>
            </p>
            <p>Fax: {site.fax}</p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-white hover:underline"
              >
                {site.email}
              </a>
            </p>
          </address>
        </div>

        <FooterColumn title="About" links={about} className="lg:col-span-3" />
        <FooterColumn
          title="Resources"
          links={resources}
          className="lg:col-span-2"
        />
        <FooterColumn
          title="Stay informed"
          className="lg:col-span-3"
          links={[
            { label: "News & Commentary", href: "/news" },
            { label: "Weekly newsletter sign-up", href: site.newsletterUrl },
            { label: "Contact the office", href: "/contact" },
            { label: "Open Records Policy", href: "/open-records-policy" },
            { label: "Facebook", href: site.social.facebook },
            { label: "X (Twitter)", href: site.social.x },
          ]}
        />
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.office}, {site.circuit}. All
            rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/open-records-policy" className="hover:text-white">
                Open Records
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="eyebrow font-sans text-sky-300">{title}</h2>
      <ul className="mt-5 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href}>
            {l.href.startsWith("http") ? (
              <a href={l.href} className="hover:text-white hover:underline">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="hover:text-white hover:underline">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
