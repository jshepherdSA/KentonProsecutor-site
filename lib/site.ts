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
