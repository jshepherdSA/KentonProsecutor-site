import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenIcon,
  CheckIcon,
  GavelIcon,
  GraduationCapIcon,
  HandHeartIcon,
  HouseIcon,
  LandmarkIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";

import { ArrowLink, SectionHeading } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate, posts, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: `${site.person} | ${site.name}` },
  description:
    "Rob Sanders, Commonwealth's Attorney for Kentucky's 16th Judicial Circuit, and his team prosecute all felonies in Kenton County — seeking justice through community partnerships.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Stats />
      <WelcomeLetter />
      <HowWeServe />
      <Recognition />
      <LatestNews />
      <HelpNow />
      <Newsletter />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900">
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[58%]">
        <Image
          src="/images/beechwood-classroom.jpg"
          alt="Rob Sanders speaking to a classroom of students at Beechwood Elementary School"
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[55%_center]"
        />
        <div className="absolute inset-0 bg-navy-900/75 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy-900 lg:via-navy-900/20 lg:to-transparent" />
      </div>

      <div className="container-site py-20 md:py-28 lg:pt-32 lg:pb-36">
        <div className="max-w-[38rem]">
          <p className="eyebrow text-sky-300">
            Kenton County &nbsp;|&nbsp; {site.circuit}
          </p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.08] text-white md:text-[3.5rem]">
            Seeking justice through community{" "}
            <em className="font-normal text-sky-300">partnerships</em>
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/85">
            Commonwealth&rsquo;s Attorney Rob Sanders and his team prosecute all
            felonies in Kenton County &mdash; the same community in which they
            also live and work.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/resources/victim-rights"
              className={buttonVariants({ variant: "on-dark", size: "pill" })}
            >
              Victim Rights
            </Link>
            <Link
              href="/resources/law-enforcement"
              className={buttonVariants({
                variant: "outline-on-dark",
                size: "pill",
              })}
            >
              Law Enforcement Resources
            </Link>
          </div>
        </div>
      </div>

      <p className="absolute right-5 bottom-4 hidden text-xs text-white/70 lg:block">
        Rob Sanders speaking to students at Beechwood Elementary School
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const pillars = [
  {
    icon: HouseIcon,
    title: "Member",
    sub: "Rooted in Kenton County",
    body: "Three generations of the Sanders family have served here — Rob's great-grandfather and grandfather with the Covington Police Department, and his father as an Assistant Commonwealth's Attorney in this very office.",
    href: "/about/rob-sanders",
    cta: "Rob's story",
  },
  {
    icon: HandHeartIcon,
    title: "Servant",
    sub: "Available around the clock",
    body: "Rob personally prosecutes a full caseload and is available 24 hours a day, seven days a week, to the 17 law enforcement agencies in Kenton County. He also served 20 years as a volunteer firefighter for Fort Mitchell.",
    href: "/services",
    cta: "What we do",
  },
  {
    icon: LandmarkIcon,
    title: "Leader",
    sub: "Improving justice statewide",
    body: "Past President of the Kentucky Commonwealth's Attorneys Association, appointed to the Kentucky Supreme Court's Criminal Rules Committee, and appointed by two governors to the Prosecutors' Advisory Council.",
    href: "/about/rob-sanders#leadership",
    cta: "Leadership",
  },
];

function Pillars() {
  return (
    <section
      aria-labelledby="pillars-heading"
      className="border-b border-line bg-mist-50"
    >
      <div className="container-site py-20 md:py-24">
        <SectionHeading
          eyebrow="Member · Servant · Leader"
          align="center"
          className="mb-14"
        >
          <span id="pillars-heading">
            A prosecutor who calls Kenton County <em>home</em>
          </span>
        </SectionHeading>
        <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((p) => (
            <li
              key={p.title}
              className="flex flex-col items-center text-center"
            >
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-white text-steel-500 ring-1 ring-line">
                <p.icon
                  className="size-7"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-6 text-3xl text-navy-700">{p.title}</h3>
              <p className="eyebrow mt-2 text-steel-500">{p.sub}</p>
              <p className="mt-4 max-w-sm leading-7 text-body">{p.body}</p>
              <ArrowLink href={p.href} className="mt-6">
                {p.cta}
              </ArrowLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const stats = [
  { value: "165,000+", label: "Kenton County residents served" },
  { value: "~3,000", label: "Cases through the office each year" },
  { value: "17", label: "Law enforcement agency partners" },
  { value: "24/7", label: "On-call prosecutors for police" },
  { value: "2007", label: "Serving as Commonwealth's Attorney since" },
];

function Stats() {
  return (
    <section aria-label="The office at a glance" className="bg-navy-900">
      <div className="container-site py-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col border-l border-white/15 pl-5 first:border-l-0 first:pl-0 max-md:odd:border-l-0 max-md:odd:pl-0"
            >
              <dt className="order-2 mt-2 text-sm leading-5 text-white/70">
                {s.label}
              </dt>
              <dd className="order-1 font-serif text-4xl text-sky-300 md:text-[2.75rem]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function WelcomeLetter() {
  return (
    <section aria-labelledby="welcome-heading" className="bg-white">
      <div className="container-site grid items-start gap-14 py-20 md:py-28 lg:grid-cols-12">
        <figure className="lg:sticky lg:top-8 lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-ice-100 to-sky-300/60">
            <Image
              src="/images/kenton-seal.png"
              alt=""
              width={600}
              height={600}
              className="absolute -top-16 -right-16 size-72 opacity-[0.07]"
            />
            <Image
              src="/images/rob-sanders.png"
              alt="Portrait of Commonwealth's Attorney Rob Sanders"
              width={309}
              height={374}
              className="relative mx-auto mt-10 h-auto w-[72%]"
            />
          </div>
          <figcaption className="mt-4 flex flex-col gap-1 border-b sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 border-line pb-4">
            <span className="font-serif text-xl text-ink">Rob Sanders</span>
            <span className="text-sm text-subtle">
              Commonwealth&rsquo;s Attorney, {site.circuit}
            </span>
          </figcaption>
        </figure>

        <div className="lg:col-span-7 lg:pl-6">
          <SectionHeading eyebrow="A message from Rob">
            <span id="welcome-heading">
              Welcome to the online office of the Kenton County
              Commonwealth&rsquo;s <em>Attorney</em>
            </span>
          </SectionHeading>
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-8 text-body">
            <p>
              As the Commonwealth&rsquo;s Attorney for the 16th Judicial
              Circuit, my office prosecutes all felonies in Kenton County, the
              state&rsquo;s third most populated county with more than 165,000
              residents.
            </p>
            <p>
              My office includes a talented team of assistant prosecutors,
              detectives, paralegals, and a victim&rsquo;s advocate who
              investigate and prosecute a wide range of felonies &ndash; from
              drug trafficking prosecutions to sex crimes to death penalty
              cases. You can learn more about our team by visiting{" "}
              <Link
                href="/about/staff"
                className="font-medium text-navy-700 underline underline-offset-4"
              >
                this page
              </Link>
              , where you can read their bios and the important roles they play
              in this office.
            </p>
            <p>
              It is important for Kenton County residents to be aware of the
              activities of this office. That&rsquo;s one reason my office
              distributes a weekly electronic newsletter that reports on the
              activities of this office and the convictions we achieve each week
              in Kenton Circuit Court. If you are not already receiving this
              newsletter, you can{" "}
              <a
                href={site.newsletterUrl}
                className="font-medium text-navy-700 underline underline-offset-4"
              >
                sign up for it here
              </a>
              .
            </p>
            <p>
              Keeping Kenton County citizens informed is also the reason we
              created this website. Please enjoy it and let us know if there is
              additional information you would like to see on this website.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Image
                src="/images/rob-signature.png"
                alt="Rob Sanders' signature"
                width={300}
                height={69}
                className="h-auto w-48"
              />
              <p className="mt-2 text-sm text-subtle">
                Rob Sanders, Commonwealth&rsquo;s Attorney
              </p>
            </div>
            <ArrowLink href="/about">Read Rob&rsquo;s full letter</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const services = [
  {
    icon: UsersIcon,
    title: "Services for victims",
    body: "Our in-house victim’s advocate keeps victims up to date on their cases and helps them find resources during some of the most traumatic circumstances they will ever face.",
    href: "/resources/victim-resources",
  },
  {
    icon: ShieldIcon,
    title: "Support for law enforcement",
    body: "From responding to a crime scene to final sentencing, we serve our 17 police agency partners at every step — and keep every agency up to date on the law.",
    href: "/resources/law-enforcement",
  },
  {
    icon: GraduationCapIcon,
    title: "Externship program",
    body: "One of the state’s most successful prosecutorial externships. Many externs have gone on to serve as prosecutors in our office and across Kentucky.",
    href: "/resources/student-and-job-opportunities",
  },
  {
    icon: BookOpenIcon,
    title: "Education & outreach",
    body: "Schools, churches, neighborhood associations, scout groups, and clubs can request a free presentation on our work and the criminal justice system.",
    href: "/services#outreach",
  },
];

function HowWeServe() {
  return (
    <section aria-labelledby="serve-heading" className="bg-ice-100">
      <div className="container-site py-20 md:py-28">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            lead="As Kentucky’s third largest Commonwealth’s Attorney Office, our team of attorneys, staff, paralegals, detectives, and externs prosecute all felony crimes in the 16th Judicial Circuit."
          >
            <span id="serve-heading">
              How we <em>serve</em> Kenton County
            </span>
          </SectionHeading>
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "brand-outline", size: "pill" }),
              "self-start lg:self-auto",
            )}
          >
            All services
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Card className="justify-between gap-10 bg-navy-700 p-8 text-white ring-0 lg:row-span-2 lg:p-10">
            <div>
              <GavelIcon
                className="size-8 text-sky-300"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="eyebrow mt-8 text-sky-300">
                Statutory duty · KRS 15.725
              </p>
              <h3 className="mt-3 text-3xl leading-tight text-white md:text-4xl">
                Prosecuting every felony in Kenton County
              </h3>
              <p className="mt-5 leading-7 text-white/80">
                Homicide, assault, rape, sexual abuse, drug trafficking,
                robbery, arson, and more. Each year about 3,000 cases flow
                through our office, and about 1,000 are indicted as felonies.
                Our goal is always to secure convictions and serve justice to
                make our county a safer, more prosperous community.
              </p>
            </div>
            <ArrowLink href="/services" tone="dark">
              How prosecution works
            </ArrowLink>
          </Card>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {services.map((s) => (
              <Card
                key={s.title}
                className="gap-0 p-7 ring-line transition-shadow hover:ring-steel-500"
              >
                <s.icon
                  className="size-7 text-steel-500"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-body">
                  {s.body}
                </p>
                <ArrowLink href={s.href} className="mt-6">
                  Learn more
                  <span className="sr-only">
                    {" "}
                    about {s.title.toLowerCase()}
                  </span>
                </ArrowLink>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const community = [
  "Kenton County Multi-Disciplinary Team Against Child Abuse",
  "Kenton County Child Fatality Review Task Force",
  "NKY Regional Mental Health Court",
  "Kenton County Community Corrections Board",
  "NKY Human Trafficking Task Force",
  "Adjunct faculty, Chase College of Law at NKU",
];

function Recognition() {
  return (
    <section aria-labelledby="recognition-heading" className="bg-white">
      <div className="container-site grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-steel-500">
            Carroll M. Redford Award &nbsp;|&nbsp; 2023
          </p>
          <h2 id="recognition-heading" className="sr-only">
            Recognized as Outstanding Kentucky Prosecutor
          </h2>
          <blockquote className="mt-6">
            <p className="font-serif text-[1.75rem] leading-[1.35] text-ink md:text-[2.1rem]">
              <span className="text-steel-500">&ldquo;</span>For best
              exemplifying the attributes of the ideal prosecutor in fulfilling
              the duties of his office and in recognition of his diligence and
              leadership as a{" "}
              <em className="text-steel-500">
                public servant and private citizen.
              </em>
              <span className="text-steel-500">&rdquo;</span>
            </p>
            <footer className="mt-6 border-l-[3px] border-heritage-700 pl-4 text-sm leading-6 text-subtle">
              <span className="font-semibold text-ink">
                Outstanding Kentucky Prosecutor
              </span>
              <br />
              Kentucky Commonwealth&rsquo;s Attorneys&rsquo; Association
            </footer>
          </blockquote>

          <div className="mt-12 rounded-xl bg-mist-50 p-7 ring-1 ring-line">
            <h3 className="text-xl text-ink">Serving beyond the courtroom</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {community.map((c) => (
                <li key={c} className="flex gap-2.5 text-[0.95rem] leading-6">
                  <CheckIcon
                    className="mt-1 size-4 shrink-0 text-steel-500"
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 self-start lg:col-span-6">
          <figure className="col-span-5">
            <Image
              src="/images/rob-testifying.png"
              alt="Rob Sanders testifying before the Kentucky General Assembly Interim Joint Committee on Local Government"
              width={849}
              height={494}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full rounded-xl"
            />
            <figcaption className="mt-2 text-xs text-subtle">
              Testifying before the Kentucky General Assembly in Frankfort
            </figcaption>
          </figure>
          <figure className="col-span-5 sm:col-span-2">
            <Image
              src="/images/outstanding-prosecutor-award.jpg"
              alt="Carroll M. Redford Award plaque presented to Hon. Rob Sanders, Outstanding Kentucky Prosecutor, 2023"
              width={1200}
              height={1394}
              sizes="(min-width: 1024px) 16vw, 40vw"
              className="aspect-[3/4] h-auto w-full rounded-xl object-cover"
            />
          </figure>
          <figure className="col-span-5 sm:col-span-3">
            <Image
              src="/images/rob-kindergarten.jpg"
              alt="Rob Sanders as a kindergartener with Covington canine police officer Tom Schonecker"
              width={744}
              height={1036}
              sizes="(min-width: 1024px) 24vw, 60vw"
              className="aspect-[3/4] h-auto w-full rounded-xl object-cover object-top grayscale sm:aspect-[36/32]"
            />
            <figcaption className="mt-2 text-xs text-subtle">
              Rob as a kindergartener with Covington canine officer Tom
              Schonecker, later the city&rsquo;s Chief of Police
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function LatestNews() {
  return (
    <section
      aria-labelledby="news-heading"
      className="border-t border-line bg-mist-50"
    >
      <div className="container-site py-20 md:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Latest from the office"
            lead="As public servants, our team is committed to working in a transparent manner and keeping the public informed about our cases and work."
          >
            <span id="news-heading">
              Commonwealth&rsquo;s <em>Commentary</em>
            </span>
          </SectionHeading>
          <Link
            href="/news"
            className={cn(
              buttonVariants({ variant: "brand", size: "pill" }),
              "self-start md:self-auto",
            )}
          >
            All news
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Card className="relative h-full gap-0 border-t-[3px] border-navy-700 p-7 ring-line">
                <p className="text-xs font-semibold tracking-[0.14em] text-steel-500 uppercase">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h3 className="mt-4 text-xl leading-snug text-ink">
                  <Link
                    href={`/news/${post.slug}`}
                    className="after:absolute after:inset-0 hover:text-navy-700"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-body">
                  {post.excerpt}
                </p>
                <p className="mt-6 text-xs text-subtle">
                  {post.categories.join(" · ")}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function HelpNow() {
  return (
    <section aria-labelledby="help-heading" className="bg-white">
      <div className="container-site py-20 md:py-28">
        <SectionHeading eyebrow="Get help" align="center">
          <span id="help-heading">
            We&rsquo;re here when you <em>need us</em>
          </span>
        </SectionHeading>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl bg-ice-100 p-8 md:p-10">
            <p className="eyebrow text-steel-500">For victims of crime</p>
            <h3 className="mt-3 text-3xl text-ink">
              You don&rsquo;t have to face this alone
            </h3>
            <p className="mt-4 leading-7 text-body">
              Our Victim&rsquo;s Advocate, Morgan R. Fritsch, keeps victims
              updated on their cases, sits with them in court, answers their
              questions, and helps them feel comfortable throughout the judicial
              process.
            </p>
            <p className="mt-5 rounded-lg bg-white px-4 py-3 text-sm leading-6 text-ink ring-1 ring-line">
              <strong>In danger or being threatened?</strong> Call 911
              immediately, then contact the Victim&rsquo;s Advocate.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-navy-700">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <PhoneIcon className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
              <a
                href="mailto:mfritsch@prosecutors.ky.gov"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <MailIcon className="size-4" aria-hidden="true" />
                mfritsch@prosecutors.ky.gov
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/resources/victim-rights"
                className={buttonVariants({ variant: "brand", size: "pill" })}
              >
                Know your rights
              </Link>
              <Link
                href="/resources/victim-resources"
                className={buttonVariants({
                  variant: "brand-outline",
                  size: "pill",
                })}
              >
                Victim resources
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-slate-700 p-8 text-white md:p-10">
            <p className="eyebrow text-sky-300">For law enforcement</p>
            <h3 className="mt-3 text-3xl text-white">
              A prosecutor is always on call
            </h3>
            <p className="mt-4 leading-7 text-white/80">
              Our attorneys are available 24 hours a day, seven days a week,
              whenever our law enforcement partners need assistance.
            </p>
            <dl className="mt-7 divide-y divide-white/15 border-y border-white/15">
              <div className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="text-white/75">Business hours</dt>
                <dd>
                  <a
                    href={site.phoneHref}
                    className="font-semibold hover:underline"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="text-white/75">
                  After hours &mdash; Kenton County Dispatch
                </dt>
                <dd>
                  <a
                    href="tel:+18593563191"
                    className="font-semibold hover:underline"
                  >
                    (859) 356-3191
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-white/70">
              Ask dispatch to connect you to the &ldquo;Felony Hotline.&rdquo;
              The Felony Hotline is for law enforcement use only.
            </p>
            <div className="mt-8">
              <Link
                href="/resources/law-enforcement"
                className={buttonVariants({ variant: "on-dark", size: "pill" })}
              >
                Law enforcement resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden bg-navy-700"
    >
      <Image
        src="/images/kenton-seal.png"
        alt=""
        width={600}
        height={600}
        className="absolute top-1/2 -right-24 -z-10 size-[28rem] -translate-y-1/2 opacity-[0.08]"
      />
      <div className="container-site flex flex-col items-start justify-between gap-8 py-16 md:py-20 lg:flex-row lg:items-center">
        <SectionHeading
          eyebrow="Stay informed"
          tone="dark"
          lead="Each week, the office reports on its activities and the convictions achieved in Kenton Circuit Court — delivered straight to your inbox."
        >
          <span id="newsletter-heading">
            Get the weekly <em>newsletter</em>
          </span>
        </SectionHeading>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.newsletterUrl}
            className={buttonVariants({ variant: "on-dark", size: "pill" })}
          >
            Sign up
          </a>
          <Link
            href="/news"
            className={buttonVariants({
              variant: "outline-on-dark",
              size: "pill",
            })}
          >
            Past issues
          </Link>
        </div>
      </div>
    </section>
  );
}
