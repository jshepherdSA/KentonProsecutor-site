import type { MetadataRoute } from "next";

import { hasBio, posts, staff } from "@/lib/content";
import { site } from "@/lib/site";

const staticRoutes = [
  "/",
  "/about",
  "/about/rob-sanders",
  "/about/staff",
  "/about/detectives",
  "/about/victims-advocate",
  "/services",
  "/resources",
  "/resources/law-enforcement",
  "/resources/victim-rights",
  "/resources/victim-resources",
  "/resources/student-and-job-opportunities",
  "/resources/hall-of-fame",
  "/resources/links",
  "/resources/subpoenas",
  "/resources/faqs",
  "/resources/videos",
  "/news",
  "/news/newsletter-issues",
  "/contact",
  "/open-records-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...staff
      .filter((m) => hasBio(m.slug))
      .map((m) => ({
        url: `${site.url}/about/staff/${m.slug}`,
        priority: 0.5,
      })),
    ...posts.map((p) => ({
      url: `${site.url}/news/${p.slug}`,
      lastModified: p.date,
      priority: 0.4,
    })),
  ];
}
