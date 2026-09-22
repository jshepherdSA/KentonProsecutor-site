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
  imageWidth?: number;
  imageHeight?: number;
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
/**
 * The original pages put a standalone <img> straight before a short paragraph
 * that is really its caption. Pair them up as figure/figcaption so captions
 * stop reading as body copy.
 */
function figurizeImages(html: string) {
  return html.replace(
    /(?<!<p>)<img([^>]*)>\s*<p>([\s\S]{0,240}?)<\/p>/g,
    (full, attrs: string, caption: string) =>
      /class="[^"]*float/.test(attrs)
        ? full
        : `<figure><img${attrs}><figcaption>${caption}</figcaption></figure>`,
  );
}

export function prepareHtml(html: string, opts: { strip?: RegExp[] } = {}) {
  let out = html;
  for (const re of opts.strip ?? []) out = out.replace(re, "");
  out = out.replace(
    /<(h2|h3)>([\s\S]*?)<\/\1>/g,
    (_, tag, inner) => `<${tag} id="${slugify(inner)}">${inner}</${tag}>`,
  );
  out = figurizeImages(out);
  out = out.replace(/<table>/g, '<div class="table-wrap"><table>');
  out = out.replace(/<\/table>/g, "</table></div>");
  return out;
}

const NUM =
  "one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty";
const COUNT_ITEM = new RegExp(`^(?:\\d+|${NUM})\\s+counts?\\s+of\\b`, "i");
const AND_SPLIT = new RegExp(
  `\\s+and\\s+(?=(?:\\d+|${NUM})\\s+counts?\\s+of\\b)`,
  "i",
);
const CHARGE_LEAD =
  /\b(?:convicted of|guilty of|guilty to|pleaded guilty to|pled guilty to|plead guilty to|charged with|indicted (?:him |her )?(?:for|on|of)|indicted for|indicted on|tried and convicted of)\s+/i;

const isCharge = (s: string) =>
  COUNT_ITEM.test(s) || /^[A-Z0-9\u201c"(]/.test(s);

/** Split a run of comma-separated charges, keeping any trailing clause aside. */
function chargeItems(listPart: string) {
  const items = listPart
    .split(/,\s*/)
    .flatMap((s) => s.split(AND_SPLIT))
    .map((s) =>
      s
        .replace(/^and\s+/i, "")
        .replace(/[.;]\s*$/, "")
        .trim(),
    )
    .filter(Boolean);
  if (items.length < 3) return null;
  let trailer: string | null = null;
  if (!isCharge(items[items.length - 1])) trailer = items.pop() ?? null;
  if (items.length < 3 || !items.every(isCharge)) return null;
  if (items.filter((s) => COUNT_ITEM.test(s)).length < 2) return null;
  if (items.some((s) => s.length > 200)) return null;
  return { items, trailer };
}

/**
 * Press releases list charges inline ("convicted of A, B, and C"). Turn those
 * runs into a colon plus bullets so they can actually be read. Conservative on
 * purpose: only fires on 3+ items where at least two are "N counts of ...".
 */
export function bulletizeCharges(html: string) {
  return html.replace(/<p>([\s\S]*?)<\/p>/g, (full, inner: string) => {
    if (/<(ul|ol|img|iframe)/.test(inner)) return full;
    const sentences = inner.split(/(?<=[.!?])\s+(?=[A-Z\u201c"(])/);
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      let lead: string | null = null;
      let listPart: string | null = null;
      const colon = sentence.lastIndexOf(":");
      if (colon > 20) {
        lead = sentence.slice(0, colon);
        listPart = sentence.slice(colon + 1);
      } else {
        const m = CHARGE_LEAD.exec(sentence);
        if (m) {
          lead = sentence.slice(0, m.index + m[0].length).trimEnd();
          listPart = sentence.slice(m.index + m[0].length);
        }
      }
      if (!lead || !listPart) continue;
      const parsed = chargeItems(listPart);
      if (!parsed) continue;
      const before = sentences.slice(0, i).join(" ").trim();
      const after = sentences
        .slice(i + 1)
        .join(" ")
        .trim();
      const leadText = `${before ? before + " " : ""}${lead.replace(/[:\s]+$/, "")}:`;
      const tail = [parsed.trailer?.replace(/^\W+/, "") ?? "", after]
        .filter(Boolean)
        .join(" ")
        .trim();
      return (
        `<p>${leadText}</p><ul>${parsed.items.map((x) => `<li>${x}</li>`).join("")}</ul>` +
        (tail ? `<p>${tail.charAt(0).toUpperCase()}${tail.slice(1)}</p>` : "")
      );
    }
    return full;
  });
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
