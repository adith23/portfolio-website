import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: `${siteConfig.shortName} | Software Engineer`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: `${siteConfig.shortName} | Software Engineer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: absoluteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | Software Engineer`,
    description: siteConfig.description,
  },
};

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
    },
    twitter: {
      title,
      description,
    },
  };
}
