import pagesJson from "@/content/pages.json";
import postsJson from "@/content/posts.json";

/** Content converted from the original kentonprosecutor.org WordPress site. */
export type WpPage = {
  slug: string;
  parent: number;
  order: number;
  title: string;
  image: string | null;
  html: string;
};

export type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string | null;
  html: string;
};

const pages = pagesJson as Record<string, WpPage>;
export const posts = postsJson as Post[];

export function getPage(slug: string): WpPage {
  const page = pages[slug];
  if (!page) throw new Error(`Missing converted page: ${slug}`);
  return page;
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&[#\w]+;/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Heading anchors, responsive tables, and optional removals for rendered HTML. */
export function prepareHtml(html: string, opts: { strip?: RegExp[] } = {}) {
  let out = html;
  for (const re of opts.strip ?? []) out = out.replace(re, "");
  out = out.replace(
    /<(h2|h3)>([\s\S]*?)<\/\1>/g,
    (_, tag, inner) => `<${tag} id="${slugify(inner)}">${inner}</${tag}>`,
  );
  out = out.replace(/<table>/g, '<div class="table-wrap"><table>');
  out = out.replace(/<\/table>/g, "</table></div>");
  return out;
}

export function headings(html: string) {
  return [...html.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: slugify(m[1]),
    text: m[1]
      .replace(/<[^>]+>/g, "")
      .replace(/&#8217;/g, "’")
      .replace(/&#8220;|&#8221;/g, '"')
      .replace(/&amp;/g, "&")
      .trim(),
  }));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export type StaffMember = {
  slug: string;
  name: string;
  title: string;
  email?: string;
  photo?: string;
};

/** Assistant Commonwealth's Attorneys, in the original site's order. */
export const staff: StaffMember[] = [
  {
    slug: "emily-arnzen",
    name: "Emily J. Arnzen",
    title: "Assistant Commonwealth’s Attorney",
    email: "earnzen@prosecutors.ky.gov",
  },
  {
    slug: "casey-burns",
    name: "Casey P. Burns",
    title: "First Assistant Commonwealth’s Attorney",
    email: "cburns@prosecutors.ky.gov",
    photo: "/images/staff/casey-burns.jpg",
  },
  {
    slug: "laura-callihan",
    name: "Laura Callihan",
    title: "Assistant Commonwealth’s Attorney",
    photo: "/images/staff/laura-callihan.jpg",
  },
  {
    slug: "hunter-eickhoff",
    name: "Hunter Eickhoff",
    title: "Assistant Commonwealth’s Attorney",
    photo: "/images/staff/hunter-eickhoff.jpg",
  },
  {
    slug: "patrick-n-grote",
    name: "Patrick N. Grote",
    title: "Assistant Commonwealth’s Attorney",
    email: "pgrote@prosecutors.ky.gov",
    photo: "/images/staff/patrick-n-grote.jpg",
  },
  {
    slug: "taylor-i-roof",
    name: "Taylor I. Roof",
    title: "Assistant Commonwealth’s Attorney",
    email: "troof@prosecutors.ky.gov",
    photo: "/images/staff/taylor-i-roof.jpg",
  },
  {
    slug: "maria-wentz",
    name: "Maria C. Wentz",
    title: "Assistant Commonwealth’s Attorney",
    email: "mwentz@prosecutors.ky.gov",
    photo: "/images/staff/maria-wentz.jpg",
  },
  {
    slug: "mike-westling",
    name: "Mike Westling",
    title: "Assistant Commonwealth’s Attorney",
    photo: "/images/staff/mike-westling.jpg",
  },
];

/** A staff member has a bio page only if the original site had a real bio. */
export function hasBio(slug: string) {
  const html = pages[slug]?.html ?? "";
  return html.replace(/<[^>]+>/g, "").trim().length > 200;
}
