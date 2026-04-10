import { draftMode } from "next/headers";

import { fallbackProfile, fallbackProjectCards, fallbackProjects } from "@/lib/fallback-content";
import { hasSanityConfig } from "@/lib/sanity.env";
import { mapProfile, mapProjectCard, mapProjectDetail } from "@/lib/sanity.mapper";
import {
  featuredProjectsQuery,
  profileQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsIndexQuery,
} from "@/lib/sanity.queries";
import { sanityClient } from "@/lib/sanity.client";
import type { ProfileViewModel, ProjectCard, ProjectDetail } from "@/types/content";

const profileTag = "profile";
const projectsTag = "projects";

async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
  tags: string[] = [],
) {
  let isDraft = false;
  
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch (error) {
  }

  return sanityClient.fetch<T>(query, params, {
    perspective: isDraft ? "previewDrafts" : "published",
    next: { revalidate: isDraft || process.env.NODE_ENV === "development" ? 0 : 3600, tags },
    useCdn: process.env.NODE_ENV === "development" ? false : !isDraft,
  });
}

export async function getProfile(): Promise<ProfileViewModel> {
  if (!hasSanityConfig()) {
    return fallbackProfile;
  }

  const raw = await sanityFetch<Record<string, unknown> | null>(profileQuery, {}, [profileTag]);

  return raw ? mapProfile(raw) : fallbackProfile;
}

export async function getFeaturedProjects(): Promise<ProjectCard[]> {
  if (!hasSanityConfig()) {
    return fallbackProjectCards.filter((project) => project.featured);
  }

  const raw = await sanityFetch<Record<string, unknown>[]>(featuredProjectsQuery, {}, [projectsTag]);
  return raw.map(mapProjectCard);
}

export async function getProjectsIndex(): Promise<ProjectCard[]> {
  if (!hasSanityConfig()) {
    return fallbackProjectCards;
  }

  const raw = await sanityFetch<Record<string, unknown>[]>(projectsIndexQuery, {}, [projectsTag]);
  return raw.map(mapProjectCard);
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  if (!hasSanityConfig()) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const raw = await sanityFetch<Record<string, unknown> | null>(
    projectBySlugQuery,
    { slug },
    [projectsTag, `project:${slug}`],
  );

  return raw ? mapProjectDetail(raw) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  if (!hasSanityConfig()) {
    return fallbackProjects.map((project) => project.slug);
  }

  return sanityFetch<string[]>(projectSlugsQuery, {}, [projectsTag]);
}
