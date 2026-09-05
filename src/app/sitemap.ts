import type { MetadataRoute } from "next";
import { nav } from "@/content/nav";
import { siteUrl } from "@/lib/site-url";

/** Every public route, derived from the navigation so the two can't drift. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/"]);
  for (const item of nav) {
    paths.add(item.href);
    item.children?.forEach((child) => paths.add(child.href));
  }

  return [...paths].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
