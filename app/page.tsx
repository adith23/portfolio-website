import React from "react";
import Link from "next/link";
import {
  MapPin,
  Contact,
  BriefcaseBusiness,
  ExternalLink,
  Eye,
  Calendar,
  GraduationCap,
  User,
  Mail,
} from "lucide-react";
import { getFeaturedProjects, getProfile } from "@/lib/content";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/jsonld";
import { ThemeToggle, ExpandableSection } from "@/components/interactive-ui";

// --- REUSABLE UI COMPONENTS ---

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-800 bg-white ${className}`}
  >
    {children}
  </span>
);

const SocialIcon = ({ label, size = 16 }: { label: string; size?: number }) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("linkedin")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  if (lowerLabel.includes("github")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }
  return <ExternalLink size={size} />;
};

// --- DOMAIN COMPONENTS ---

const ProfileHeader: React.FC<{ profile: any }> = ({ profile }) => {
  return (
    <header className="relative flex flex-col items-center pt-12 pb-8 text-center">
      <ThemeToggle />

      <div className="relative mb-4">
        <img
          src={profile.avatar?.url}
          alt={profile.avatar?.alt}
          className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm filter grayscale"
        />
      </div>

      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {profile.fullName}
        </h1>
      </div>

      <p className="text-lg text-gray-700 mb-2">{profile.headline}</p>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-gray-500 text-sm">
        {profile.socialLinks && profile.socialLinks.length > 0 ? (
          profile.socialLinks.map((link: any) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <SocialIcon label={link.label} size={16} />
              <span className="leading-tight pt-[2px]">{link.label}</span>
            </a>
          ))
        ) : (
          <>
            <a
              href="https://linkedin.com/in/adithyaramanayake"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <SocialIcon label="LinkedIn" size={16} />
              <span className="leading-tight pt-[2px]">LinkedIn</span>
            </a>
            <a
              href="https://github.com/adithyaramanayake"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <SocialIcon label="GitHub" size={16} />
              <span className="leading-tight pt-[2px]">GitHub</span>
            </a>
          </>
        )}
        <a
          href={`mailto:${profile.contactEmail || "adithyaramanayake20@gmail.com"}`}
          className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
        >
          <Mail size={16} />
          <span className="leading-tight pt-[2px]">
            {profile.contactEmail || "adithyaramanayake20@gmail.com"}
          </span>
        </a>
        <div className="flex items-center gap-1.5">
          <MapPin size={16} />
          <span className="leading-tight pt-[2px]">
            {profile.location || "Colombo, Sri Lanka"}
          </span>
        </div>
      </div>
    </header>
  );
};

const ProjectCardComponent: React.FC<{ project: any }> = ({ project }) => {
  const formatMonth = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const dateRange = project.startDate
    ? `${formatMonth(project.startDate)} - ${project.endDate ? formatMonth(project.endDate) : "Present"}`
    : null;

  return (
    <article className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Header: Title & Tech Stack (Left) | Date & Category (Right) */}
      <div className="px-4 sm:px-5 pt-5 sm:pt-7 pb-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        {/* Left Side: Title and Tech Stack */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            {project.title}
          </h3>
          {project.techStack && project.techStack.length > 0 && (
            <p className="text-xs text-gray-500 font-medium">
              {project.techStack.join(" · ")}
            </p>
          )}
        </div>

        {/* Right Side: Date and Category */}
        <div className="flex flex-col items-start sm:items-end space-y-1.5 shrink-0">
          {dateRange && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={13} />
              {dateRange}
            </span>
          )}
          {project.category && (
            <Badge className="gap-1">
              {project.category === "University Project" ? (
                <GraduationCap size={12} />
              ) : (
                <User size={12} />
              )}
              {project.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 sm:px-5 pb-4">
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
          {project.summary || project.description}
        </p>
      </div>

      {/* Cover image */}
      <div className="mx-4 sm:mx-5 mb-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
        {project.coverImage?.url ? (
          <img
            src={project.coverImage.url}
            alt={project.coverImage.alt || project.title}
            className="w-full aspect-[16/9] object-cover"
          />
        ) : (
          <div className="w-full aspect-[16/9] flex items-center justify-center text-xs text-gray-400">
            Project cover image
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-35 pb-6 sm:pb-8 mt-auto flex flex-col gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <Eye size={14} />
          Project View
        </Link>
      </div>
    </article>
  );
};

// --- MAIN PAGE LAYOUT ---

export default async function HomePage() {
  const [profile, featuredProjects] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
  ]);

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans selection:bg-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-8 md:py-12 bg-white min-h-screen shadow-sm relative">
        <ProfileHeader profile={profile} />

        <div className="max-w-6xl mx-auto px-0 sm:px-2 md:px-8">
          <ExpandableSection
            title="About"
            icon={<Contact size={28} strokeWidth={1.5} />}
          >
            <p className="text-gray-700 leading-relaxed text-base">
              {/* Gracefully fallbacks to hardcoded text if CMS is empty */}
              {profile.longBio ||
                profile.shortBio ||
                "Highly skilled and experienced professional..."}
            </p>
          </ExpandableSection>

          <ExpandableSection
            title="Skills"
            icon={<BriefcaseBusiness size={28} strokeWidth={1.5} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  category: "Languages",
                  skills: ["TypeScript", "JavaScript", "Python"],
                },
                {
                  category: "Backend Frameworks & APIs",
                  skills: ["FastAPI", "Express.js", "Node.js"],
                },
                {
                  category: "Frontend Web Development",
                  skills: ["Next.js", "React"],
                },
                {
                  category: "Databases & Version Control",
                  skills: ["PostgreSQL", "MongoDB", "Git"],
                },
              ].map((group) => (
                <div
                  key={group.category}
                  className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-black uppercase tracking-wide mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Projects"
            icon={<BriefcaseBusiness size={28} strokeWidth={1.5} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredProjects && featuredProjects.length > 0 ? (
                featuredProjects.map((project: any) => (
                  <ProjectCardComponent key={project.slug} project={project} />
                ))
              ) : (
                <>
                  <ProjectCardComponent
                    project={{
                      title: "Distributed Learning Platform",
                      slug: "distributed-learning-platform",
                      summary:
                        "A platform for delivering course content, assessments, and analytics across a service-oriented architecture.",
                      publishedAt: "2026-02-15",
                      startDate: "2025-11-01",
                      endDate: "2026-02-15",
                      category: "University Project",
                      techStack: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
                      liveUrl: "https://example.com",
                    }}
                  />
                  <ProjectCardComponent
                    project={{
                      title: "Operations Insight Dashboard",
                      slug: "operations-insight-dashboard",
                      summary:
                        "A reporting workspace that consolidated system health, product usage, and deployment insights for engineering teams.",
                      publishedAt: "2025-11-03",
                      startDate: "2025-06-01",
                      endDate: "2025-11-03",
                      category: "Personal Project",
                      techStack: ["React", "TypeScript", "Node.js", "Redis"],
                    }}
                  />
                </>
              )}
            </div>
          </ExpandableSection>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildPersonJsonLd(profile),
            buildWebsiteJsonLd(),
          ]),
        }}
      />
    </main>
  );
}
