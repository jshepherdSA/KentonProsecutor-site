import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero, SectionLayout } from "@/components/page";
import { hasBio, staff, type StaffMember } from "@/lib/content";

export const metadata: Metadata = {
  title: "Assistant Commonwealth’s Attorneys",
  description:
    "Meet the Assistant Commonwealth’s Attorneys who prosecute felony cases in Kenton County alongside Commonwealth’s Attorney Rob Sanders.",
};

export default function StaffPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={
          <>
            Assistant Commonwealth&rsquo;s <em>Attorneys</em>
          </>
        }
        lead="A talented team of assistant prosecutors who investigate and prosecute a wide range of felonies — from drug trafficking prosecutions to sex crimes to death penalty cases."
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Assistant Commonwealth’s Attorneys" },
        ]}
      />
      <SectionLayout section="About" current="/about/staff">
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {staff.map((m) => (
            <li key={m.slug}>
              <StaffCard member={m} />
            </li>
          ))}
        </ul>
      </SectionLayout>
    </>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  const linked = hasBio(member.slug);
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-ice-100 to-sky-300/50">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-serif text-6xl text-navy-700/60"
          >
            {member.name
              .split(" ")
              .filter((w) => !w.endsWith("."))
              .map((w) => w[0])
              .join("")}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="font-serif text-xl text-ink group-hover:text-navy-700">
          {member.name}
        </p>
        <p className="mt-1 text-sm text-subtle">{member.title}</p>
        {linked && (
          <p className="mt-3 text-sm font-semibold text-navy-700">
            Read bio &rarr;
          </p>
        )}
      </div>
    </>
  );
  return linked ? (
    <Link
      href={`/about/staff/${member.slug}`}
      className="group block h-full overflow-hidden rounded-xl ring-1 ring-line transition hover:ring-steel-500"
    >
      {body}
    </Link>
  ) : (
    <div className="h-full overflow-hidden rounded-xl ring-1 ring-line">
      {body}
    </div>
  );
}
