import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon, PrinterIcon } from "lucide-react";

import { PageHero } from "@/components/page";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Kenton County Commonwealth’s Attorney’s Office — address, phone, fax, and the office staff directory.",
};

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=1840+Simon+Kenton+Way+Covington+KY+41011";

export default function ContactPage() {
  const html = getPage("contact").html;
  const directory = [
    ...html.matchAll(
      /<tr>\s*<td><strong>\s*([^<]+)<\/strong><\/td>\s*<td>([^<]+)<\/td>\s*<td><a href="mailto:([^"]+)">/g,
    ),
  ].map((m) => {
    const [last, first] = m[1].split(",").map((s) => s.trim());
    return {
      name: `${first} ${last}`,
      title: m[2].replace(/&#8217;/g, "’").trim(),
      email: m[3],
    };
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            We&rsquo;re here to <em>help</em>
          </>
        }
        lead="To contact our office, please use the following general contact information and consult the office directory for specific staff members."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="container-site grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <section aria-labelledby="office" className="lg:col-span-5">
          <div className="rounded-xl bg-ice-100 p-7 md:p-9">
            <h2 id="office" className="text-3xl">
              Commonwealth&rsquo;s Attorney&rsquo;s Office
            </h2>
            <p className="eyebrow mt-2 text-steel-500">
              16th Judicial Circuit — Kenton County
            </p>
            <ul className="mt-8 space-y-5 text-body">
              <li className="flex gap-3">
                <MapPinIcon
                  className="mt-1 size-5 shrink-0 text-steel-500"
                  aria-hidden="true"
                />
                <address className="not-italic">
                  {site.address.building}
                  <br />
                  1840 Simon Kenton Way
                  <br />
                  Suite 2300
                  <br />
                  Covington, KY 41011
                  <br />
                  <a
                    href={mapsUrl}
                    className="mt-1 inline-block text-sm font-semibold text-navy-700 hover:underline"
                  >
                    Get directions &rarr;
                  </a>
                </address>
              </li>
              <li className="flex gap-3">
                <PhoneIcon
                  className="mt-1 size-5 shrink-0 text-steel-500"
                  aria-hidden="true"
                />
                <a
                  href={site.phoneHref}
                  className="font-serif text-2xl text-navy-700 hover:underline"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <PrinterIcon
                  className="mt-1 size-5 shrink-0 text-steel-500"
                  aria-hidden="true"
                />
                <span>{site.fax} (Fax)</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 rounded-xl bg-slate-700 p-7 text-white">
            <p className="eyebrow text-sky-300">Law enforcement after hours</p>
            <p className="mt-3 leading-7 text-white/85">
              Call Kenton County Dispatch at{" "}
              <a
                href="tel:+18593563191"
                className="font-semibold text-white hover:underline"
              >
                (859) 356-3191
              </a>{" "}
              and ask to be connected to the &ldquo;Felony Hotline.&rdquo; The
              Felony Hotline is for law enforcement use only.
            </p>
          </div>

          <p className="mt-5 rounded-xl p-5 text-sm leading-6 text-body ring-1 ring-line">
            Looking for public records? See our{" "}
            <Link
              href="/open-records-policy"
              className="font-semibold text-navy-700 hover:underline"
            >
              Open Records Policy
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="directory" className="lg:col-span-7">
          <h2 id="directory" className="text-3xl md:text-4xl">
            Office directory
          </h2>
          <ul className="mt-8 divide-y divide-line rounded-xl ring-1 ring-line">
            {directory.map((d) => (
              <li
                key={d.email}
                className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-serif text-xl text-ink">{d.name}</p>
                  <p className="text-sm text-subtle">{d.title}</p>
                </div>
                <a
                  href={`mailto:${d.email}`}
                  className="inline-flex items-center gap-2 text-[0.95rem] font-medium break-all text-navy-700 hover:underline"
                >
                  <MailIcon className="size-4 shrink-0" aria-hidden="true" />
                  {d.email}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
