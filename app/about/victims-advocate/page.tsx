import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, PhoneIcon } from "lucide-react";

import { PageHero, SectionLayout } from "@/components/page";
import { buttonVariants } from "@/components/ui/button";
import { victimAdvocate } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Victim’s Advocate",
  description:
    "The Victim’s Advocate for the Kenton County Commonwealth’s Attorney’s Office keeps victims of crime informed and supported throughout the judicial process.",
};

export default function VictimsAdvocatePage() {
  return (
    <>
      <PageHero
        eyebrow="Victim’s Advocate"
        title={victimAdvocate.name}
        lead="Keeping victims of crime updated about their cases, supporting them in court, and helping them feel comfortable throughout the judicial process."
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Victim’s Advocate" },
        ]}
      >
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-sky-300">
          <a
            href={`mailto:${victimAdvocate.email}`}
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <MailIcon className="size-4" aria-hidden="true" />
            {victimAdvocate.email}
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <PhoneIcon className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
      </PageHero>
      <SectionLayout section="About" current="/about/victims-advocate">
        <div className="prose-site">
          <p>
            Our office employs a full-time Victim&rsquo;s Advocate whose job is
            to communicate with victims, help guide them through the criminal
            justice process, and provide assistance to victims and our
            prosecutors during hearings and trials.
          </p>
          <p>
            The Victim&rsquo;s Advocate keeps victims of crime updated about the
            legal proceedings in their cases, supports them during court
            proceedings by sitting with them and answering their questions, and
            works with the assigned prosecutor to make sure victims are heard.
            The advocate also helps victims find the resources they need &mdash;
            from crime victims&rsquo; compensation to court-date notifications
            &mdash; during what is often the most traumatic experience of their
            lives.
          </p>
          <h2>How to reach the Victim&rsquo;s Advocate</h2>
          <p>
            Call <a href={site.phoneHref}>{site.phone}</a> during business hours
            or email{" "}
            <a href={`mailto:${victimAdvocate.email}`}>
              {victimAdvocate.email}
            </a>
            . If you are in danger or being threatened,{" "}
            <strong>call 911 first</strong>, then contact the advocate once you
            are safe.
          </p>
        </div>
        <div className="mt-12 rounded-sm bg-ice-100 p-7">
          <p className="font-serif text-2xl text-ink">
            Know your rights as a victim
          </p>
          <p className="mt-2 leading-7 text-body">
            The Constitution of Kentucky affords victims of crime specific
            rights, and our office provides forms and guidance to help you use
            them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/resources/victim-rights"
              className={buttonVariants({ variant: "brand", size: "pill" })}
            >
              Victim Rights
            </Link>
            <Link
              href="/resources/victim-resources"
              className={buttonVariants({
                variant: "brand-outline",
                size: "pill",
              })}
            >
              Victim Resources
            </Link>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
