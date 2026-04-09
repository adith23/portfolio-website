import type { MetadataRoute } from "next";

import { getProjectSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();

  const pages = ["", "/about", "/projects", "/contact"].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
  }));

  const projectPages = slugs.map((slug) => ({
    url: absoluteUrl(`/projects/${slug}`),
    lastModified: new Date(),
  }));

  return [...pages, ...projectPages];
}
