import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Eyebrow + serif heading. Wrap the accent word in `<em>` for the italic treatment. */
export function SectionHeading({
  eyebrow,
  children,
  lead,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", dark ? "text-sky-300" : "text-steel-500")}>
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "mt-3 text-[2rem] leading-[1.15] md:text-[2.75rem]",
          "[&_em]:font-normal [&_em]:italic",
          dark
            ? "text-white [&_em]:text-sky-300"
            : "text-ink [&_em]:text-steel-500",
        )}
      >
        {children}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-5 text-lg leading-8",
            dark ? "text-white/80" : "text-body",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Text link with a circular outline arrow (Helton-style pillar link). */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-sm font-semibold",
        dark ? "text-white" : "text-navy-700",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full border transition-colors",
          dark
            ? "border-white/40 group-hover:border-white group-hover:bg-white group-hover:text-navy-900"
            : "border-navy-700/40 group-hover:border-navy-700 group-hover:bg-navy-700 group-hover:text-white",
        )}
        aria-hidden="true"
      >
        <ArrowRightIcon className="size-4" />
      </span>
    </Link>
  );
}
