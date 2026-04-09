import { absoluteUrl } from "@/lib/utils";
import type { ProfileViewModel, ProjectDetail } from "@/types/content";

export function buildPersonJsonLd(profile: ProfileViewModel) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    description: profile.shortBio,
    email: profile.contactEmail,
    url: absoluteUrl(),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: profile.socialLinks.map((link) => link.href),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adithya Portfolio",
    url: absoluteUrl(),
  };
}

export function buildProjectJsonLd(project: ProjectDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    codeRepository: project.githubUrl,
    url: absoluteUrl(`/projects/${project.slug}`),
    programmingLanguage: project.techStack,
  };
}
