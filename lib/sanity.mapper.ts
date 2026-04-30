import type { ImageAsset, ProfileViewModel, ProjectCard, ProjectDetail } from "@/types/content";

import { urlFor } from "@/lib/sanity.image";

type ImageInput = {
  alt?: string;
  asset?: unknown;
} | null;

type SocialLink = {
  label: string;
  href: string;
};

type StatItem = {
  label: string;
  value: string;
};

function mapImage(image: ImageInput): ImageAsset | undefined {
  if (!image) {
    return undefined;
  }

  return {
    alt: image.alt || "Content image",
    url: image.asset ? urlFor(image.asset).width(1600).fit("max").url() : undefined,
  };
}

function mapStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
}

function mapLabelArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "object" && item && "label" in item ? String(item.label) : ""))
    .filter(Boolean);
}

function mapSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      typeof item === "object" && item && "label" in item && "href" in item
        ? { label: String(item.label), href: String(item.href) }
        : null,
    )
    .filter((item): item is SocialLink => Boolean(item));
}

function mapStats(value: unknown): StatItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      typeof item === "object" && item && "label" in item && "value" in item
        ? { label: String(item.label), value: String(item.value) }
        : null,
    )
    .filter((item): item is StatItem => Boolean(item));
}

export function mapProfile(raw: Record<string, unknown>): ProfileViewModel {
  return {
    fullName: String(raw.fullName ?? ""),
    headline: String(raw.headline ?? ""),
    shortBio: String(raw.shortBio ?? ""),
    longBio: String(raw.longBio ?? ""),
    location: String(raw.location ?? ""),
    resumeUrl: typeof raw.resumeUrl === "string" ? raw.resumeUrl : undefined,
    avatar: mapImage((raw.avatar as ImageInput | undefined) ?? null),
    skills: mapLabelArray(raw.skills),
    socialLinks: mapSocialLinks(raw.socialLinks),
    contactEmail: String(raw.contactEmail ?? ""),
    availabilityStatus:
      typeof raw.availabilityStatus === "string" ? raw.availabilityStatus : undefined,
    stats: mapStats(raw.stats),
  };
}

function mapProjectBase(raw: Record<string, unknown>): ProjectCard {
  return {
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    summary: String(raw.summary ?? ""),
    featured: Boolean(raw.featured),
    publishedAt: String(raw.publishedAt ?? ""),
    status: String(raw.status ?? ""),
    category: typeof raw.category === "string" ? raw.category : undefined,
    startDate: typeof raw.startDate === "string" ? raw.startDate : undefined,
    endDate: typeof raw.endDate === "string" ? raw.endDate : undefined,
    coverImage: mapImage((raw.coverImage as ImageInput | undefined) ?? null),
    techStack: mapLabelArray(raw.techStack),
    githubUrl: typeof raw.githubUrl === "string" ? raw.githubUrl : undefined,
    liveUrl: typeof raw.liveUrl === "string" ? raw.liveUrl : undefined,
  };
}

export function mapProjectCard(raw: Record<string, unknown>): ProjectCard {
  return mapProjectBase(raw);
}

export function mapProjectDetail(raw: Record<string, unknown>): ProjectDetail {
  const seo =
    typeof raw.seo === "object" && raw.seo
      ? {
          title: "title" in raw.seo && typeof raw.seo.title === "string" ? raw.seo.title : undefined,
          description:
            "description" in raw.seo && typeof raw.seo.description === "string"
              ? raw.seo.description
              : undefined,
        }
      : undefined;

  return {
    ...mapProjectBase(raw),
    roles: mapStringArray(raw.roles),
    problem: typeof raw.problem === "string" ? raw.problem : undefined,
    solution: typeof raw.solution === "string" ? raw.solution : undefined,
    impact: typeof raw.impact === "string" ? raw.impact : undefined,
    gallery: (Array.isArray(raw.gallery) ? raw.gallery : [])
      .map((image) => mapImage((image as ImageInput | undefined) ?? null))
      .filter((image: ImageAsset | undefined): image is ImageAsset => Boolean(image)),
    videos: mapStringArray(raw.videos),
    content: Array.isArray(raw.caseStudyBlocks)
      ? (raw.caseStudyBlocks as ProjectDetail["content"])
      : [],
    seo,
  };
}
