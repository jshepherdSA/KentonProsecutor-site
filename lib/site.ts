export const site = {
  name: "Kenton County Commonwealth's Attorney",
  person: "Rob Sanders",
  office: "Office of the Commonwealth's Attorney",
  circuit: "16th Judicial Circuit",
  url: "https://kentonprosecutor.org",
  phone: "(859) 292-6580",
  phoneHref: "tel:+18592926580",
  fax: "(859) 292-6587",
  email: "rsanders@prosecutors.ky.gov",
  address: {
    building: "Kenton County Administration Building",
    street: "1840 Simon Kenton Way, Suite 2300",
    city: "Covington, Kentucky 41011",
  },
  newsletterUrl:
    "https://visitor.r20.constantcontact.com/manage/optin/ea?v=001ZfiuR_73g8rc5EbdWiIzZOdIpZllWoU0hIOYfHy-RA6vU3yPJotcYyKcjwskBrdv1p-Cc98l3OQJfeflyNz_Cfi9aCdrLrsEX6gU0kKRhMf6iWRTdstBYQ%3D%3D",
  social: {
    facebook: "https://www.facebook.com/KentonCAO",
    x: "https://x.com/KentonCAO",
  },
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavLink[] };

/** Mirrors the original site's five-item nav and dropdowns. */
export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "What We Do",
        href: "/services",
        description: "The duties and services of the office",
      },
      {
        label: "Commonwealth's Attorney Rob Sanders",
        href: "/about/rob-sanders",
        description: "Three generations of service to Kenton County",
      },
      {
        label: "Assistant Commonwealth's Attorneys",
        href: "/about/staff",
        description: "The prosecutors who serve with Rob",
      },
      {
        label: "Commonwealth's Detective",
        href: "/about/detective",
      },
      {
        label: "Victim's Advocate",
        href: "/about/victims-advocate",
        description: "Support for victims through every step",
      },
    ],
  },
  { label: "Services", href: "/services" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Law Enforcement Resources",
        href: "/resources/law-enforcement",
      },
      { label: "Victim Rights", href: "/resources/victim-rights" },
      { label: "Victim Resources", href: "/resources/victim-resources" },
      {
        label: "Student and Job Opportunities",
        href: "/resources/student-and-job-opportunities",
      },
      { label: "Hall of Fame", href: "/resources/hall-of-fame" },
      { label: "Links", href: "/resources/links" },
      { label: "Subpoenas", href: "/resources/subpoenas" },
      { label: "FAQs", href: "/resources/faqs" },
      { label: "Videos", href: "/resources/videos" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  categories: string[];
};

/** Most recent Commonwealth's Commentary / Press Room posts. */
export const posts: Post[] = [
  {
    slug: "joshua-harmon-pleads-guilty-to-attempted-murder-attempted-arson-wanton-endangerment-assault",
    date: "2024-08-20",
    title:
      "Joshua Harmon Pleads Guilty to Attempted Murder, Attempted Arson, Wanton Endangerment, & Assault",
    excerpt:
      "On January 7, 2024, Independence Police responded to a residence in the 10000 block of Canberra Drive after a frantic 911 call from a woman who reported being assaulted by Joshua Harmon.",
    categories: ["Commonwealth's Commentary", "Press Room"],
  },
  {
    slug: "accused-killer-of-scott-county-sheriffs-deputy-pleads-guilty-in-kenton-county-case",
    date: "2024-04-15",
    title:
      "Accused Killer of Scott County Sheriff's Deputy Pleads Guilty in Kenton County Case",
    excerpt:
      "Steven Sheanshang pleaded guilty in Kenton Circuit Court to charges of 2nd Degree Burglary and 1st Degree Persistent Felony Offender. Commonwealth's Attorney Rob Sanders refused to make any plea offers.",
    categories: ["Commonwealth's Commentary", "Press Room"],
  },
  {
    slug: "jessie-ooten-sentenced-to-20-years-for-stealing-gun-escape-tampering-with-prison-monitor-criminal-mischief-persistent-felony-offender",
    date: "2024-04-11",
    title:
      "Jessie Ooten Sentenced to 20 Years for Stealing Gun, Escape, Tampering With Prison Monitor, Criminal Mischief, & Persistent Felony Offender",
    excerpt:
      "On November 4, 2021, Mr. Ed Yung contacted police after he saw that Jesse Lee Ooten had broken into his home and stolen a firearm.",
    categories: ["Press Room"],
  },
];

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
