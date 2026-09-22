import Image from "next/image";
import Link from "next/link";
import { MailIcon, PhoneIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prepareHtml } from "@/lib/content";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

/** Navy title band used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  image,
  imageOverlay,
  backdrop,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  image?: { src: string; alt: string; aspect?: string };
  imageOverlay?: React.ReactNode;
  backdrop?: { src: string; alt: string; caption?: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {backdrop ? (
        <>
          <Image
            src={backdrop.src}
            alt={backdrop.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/60" />
        </>
      ) : (
        <Image
          src="/images/kenton-seal.png"
          alt=""
          width={600}
          height={600}
          className="absolute -top-24 -right-24 -z-10 size-[26rem] opacity-[0.06]"
        />
      )}
      <div
        className={cn(
          "container-site py-12 md:py-16",
          image && "grid items-end gap-10 lg:grid-cols-12",
        )}
      >
        <div className={cn(image && "lg:col-span-8")}>
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              width={240}
              height={240}
              className="mb-6 h-28 w-24 rounded-sm object-cover object-top ring-4 ring-white/15 lg:hidden"
            />
          )}
          <Breadcrumb>
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href="/" />}
                  className="hover:text-white"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {crumbs.map((c) => (
                <span key={c.label} className="contents">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {c.href ? (
                      <BreadcrumbLink
                        render={<Link href={c.href} />}
                        className="hover:text-white"
                      >
                        {c.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-white/90">
                        {c.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          {eyebrow && <p className="eyebrow mt-8 text-sky-300">{eyebrow}</p>}
          <h1
            className={cn(
              "text-[2.4rem] leading-[1.1] text-white md:text-[3.4rem] [&_em]:font-normal [&_em]:text-sky-300 [&_em]:italic",
              eyebrow ? "mt-3" : "mt-8",
            )}
          >
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              {lead}
            </p>
          )}
          {children}
          {backdrop?.caption && (
            <p className="mt-8 max-w-xl text-xs text-white/60">
              {backdrop.caption}
            </p>
          )}
        </div>
        {image && (
          <div className="relative hidden lg:col-span-4 lg:block">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={800}
              priority
              className={cn(
                "ml-auto w-full max-w-xs rounded-sm object-cover object-top ring-4 ring-white/10",
                image.aspect ?? "aspect-[4/5]",
              )}
            />
            {imageOverlay}
          </div>
        )}
      </div>
    </section>
  );
}

/** Renders converted HTML with the site's long-form styles. */
export function Prose({
  html,
  strip,
  className,
}: {
  html: string;
  strip?: RegExp[];
  className?: string;
}) {
  return (
    <div
      className={cn("prose-site", className)}
      dangerouslySetInnerHTML={{ __html: prepareHtml(html, { strip }) }}
    />
  );
}

/** Content column + sticky sidebar with the section's sibling pages. */
export function SectionLayout({
  section,
  current,
  children,
  aside,
}: {
  section: "About" | "Resources" | "News";
  current: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const item = nav.find((n) => n.label === section);
  const links =
    section === "News"
      ? [
          { label: "News & Commentary", href: "/news" },
          { label: "Newsletter Issues", href: "/news/newsletter-issues" },
        ]
      : [
          { label: `${section} overview`, href: item?.href ?? "/" },
          ...(item?.children ?? []),
        ];

  return (
    <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
      <div className="min-w-0 lg:col-span-8">{children}</div>
      <aside className="space-y-6 lg:col-span-4">
        <div className="lg:sticky lg:top-8 lg:space-y-6">
          <nav
            aria-label={`${section} pages`}
            className="rounded-xl bg-mist-50 p-6 ring-1 ring-line"
          >
            <p className="eyebrow text-steel-500">{section}</p>
            <ul className="mt-4 space-y-1">
              {links.map((l) => {
                const active = l.href === current;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-[0.95rem] transition-colors",
                        active
                          ? "bg-navy-700 font-semibold text-white"
                          : "text-body hover:bg-white hover:text-navy-700",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {aside}
          <ContactCard />
        </div>
      </aside>
    </div>
  );
}

export function ContactCard() {
  return (
    <div className="mt-6 rounded-xl bg-slate-700 p-6 text-white lg:mt-0">
      <p className="eyebrow text-sky-300">Contact the office</p>
      <p className="mt-3 text-sm leading-6 text-white/80">
        {site.address.building}
        <br />
        {site.address.street}
        <br />
        {site.address.city}
      </p>
      <div className="mt-4 space-y-2 text-sm font-semibold">
        <a
          href={site.phoneHref}
          className="flex items-center gap-2 hover:underline"
        >
          <PhoneIcon className="size-4 text-sky-300" aria-hidden="true" />
          {site.phone}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-2 break-all hover:underline"
        >
          <MailIcon
            className="size-4 shrink-0 text-sky-300"
            aria-hidden="true"
          />
          {site.email}
        </a>
      </div>
    </div>
  );
}

/** Turns "h2 question → answer blocks" HTML into an accordion (FAQs, Subpoenas). */
export function QuestionList({ html }: { html: string }) {
  const parts = html.split(/<h2>/);
  const intro = parts.shift() ?? "";
  const items = parts.map((p) => {
    const [q, ...rest] = p.split("</h2>");
    return { q: q.replace(/<[^>]+>/g, ""), a: rest.join("</h2>") };
  });
  return (
    <>
      {intro.trim() && <Prose html={intro} className="mb-10" />}
      <Accordion className="rounded-xl ring-1 ring-line">
        {items.map((item, i) => (
          <AccordionItem key={i} className="border-line px-6">
            <AccordionTrigger className="py-5 font-serif text-xl leading-snug font-normal text-ink hover:no-underline">
              <span dangerouslySetInnerHTML={{ __html: item.q }} />
            </AccordionTrigger>
            <AccordionContent>
              <Prose html={item.a} className="prose-base pb-4" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
