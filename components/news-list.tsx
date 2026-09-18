"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type PostSummary = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  categories: string[];
};

const PAGE_SIZE = 12;

export function NewsList({
  posts,
  categories,
}: {
  posts: PostSummary[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      active === "All"
        ? posts
        : posts.filter((p) => p.categories.includes(active)),
    [posts, active],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
      >
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => {
              setActive(c);
              setShown(PAGE_SIZE);
            }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors",
              active === c
                ? "bg-navy-700 text-white ring-navy-700"
                : "text-navy-700 ring-line hover:bg-ice-100",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-subtle" aria-live="polite">
        Showing {Math.min(shown, filtered.length)} of {filtered.length}{" "}
        {filtered.length === 1 ? "post" : "posts"}
      </p>

      <ul className="mt-4 divide-y divide-line border-y border-line">
        {filtered.slice(0, shown).map((p) => (
          <li key={p.slug} className="group relative py-7">
            <p className="text-xs font-semibold tracking-[0.14em] text-steel-500 uppercase">
              <time dateTime={p.date}>{p.dateLabel}</time>
              {p.categories.length > 0 && (
                <span className="font-normal tracking-normal text-subtle normal-case">
                  {" "}
                  · {p.categories.join(" · ")}
                </span>
              )}
            </p>
            <h2 className="mt-2 text-2xl leading-snug">
              <Link
                href={`/news/${p.slug}`}
                className="after:absolute after:inset-0 group-hover:text-navy-700"
              >
                {p.title}
              </Link>
            </h2>
            {p.excerpt && (
              <p className="mt-2 line-clamp-3 leading-7 text-body">
                {p.excerpt}
              </p>
            )}
          </li>
        ))}
      </ul>

      {shown < filtered.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="inline-flex h-12 items-center rounded-full px-6 text-[0.8rem] font-semibold tracking-[0.12em] text-navy-700 uppercase ring-[1.5px] ring-navy-700 hover:bg-ice-100"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
