import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MailIcon } from "lucide-react";

import { PageHero, Prose, SectionLayout } from "@/components/page";
import { getPage, hasBio, staff } from "@/lib/content";

export function generateStaticParams() {
  return staff.filter((m) => hasBio(m.slug)).map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/about/staff/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = staff.find((s) => s.slug === slug);
  return {
    title: m?.name,
    description: m ? `${m.name}, ${m.title}, Kenton County.` : undefined,
  };
}

export default async function StaffBioPage({
  params,
}: PageProps<"/about/staff/[slug]">) {
  const { slug } = await params;
  const member = staff.find((s) => s.slug === slug);
  if (!member || !hasBio(slug)) notFound();
  const page = getPage(slug);

  return (
    <>
      <PageHero
        eyebrow={member.title}
        title={member.name}
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Assistant Commonwealth’s Attorneys", href: "/about/staff" },
          { label: member.name },
        ]}
        image={
          member.photo
            ? { src: member.photo, alt: `Portrait of ${member.name}` }
            : undefined
        }
      >
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-white"
          >
            <MailIcon className="size-4" aria-hidden="true" />
            {member.email}
          </a>
        )}
      </PageHero>
      <SectionLayout section="About" current="/about/staff">
        <Prose html={page.html} />
        <p className="mt-12">
          <Link
            href="/about/staff"
            className="font-semibold text-navy-700 hover:underline"
          >
            &larr; All Assistant Commonwealth&rsquo;s Attorneys
          </Link>
        </p>
      </SectionLayout>
    </>
  );
}
