import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Code,
  Calendar,
  GraduationCap,
  User,
} from "lucide-react";

import { RichText } from "@/components/rich-text";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { buildProjectJsonLd } from "@/lib/jsonld";
import { absoluteUrl, formatDate } from "@/lib/utils";

// --- Reusable Badge (matches main page) ---

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center rounded-full border border-gray-300 dark:border-gray-600 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 ${className}`}
  >
    {children}
  </span>
);

// --- Static params & metadata (unchanged) ---

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const title = project.seo?.title ?? project.title;
  const description = project.seo?.description ?? project.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/projects/${project.slug}`),
    },
  };
}

// --- Page ---

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formatMonth = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const dateRange = (project as any).startDate
    ? `${formatMonth((project as any).startDate)} - ${(project as any).endDate ? formatMonth((project as any).endDate) : "Present"}`
    : null;

  return (
    <main className="min-h-screen bg-white dark:bg-black font-sans selection:bg-gray-200 dark:selection:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 min-h-screen">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </Link>

        {/* Header: Title & Tech Stack (Left) | Date & Category (Right) */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {project.title}
            </h1>
            {project.techStack.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {project.techStack.join(" · ")}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start sm:items-end space-y-1.5 shrink-0">
            {dateRange && (
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Calendar size={13} />
                {dateRange}
              </span>
            )}
            {(project as any).category && (
              <Badge className="gap-1">
                {(project as any).category === "University Project" ? (
                  <GraduationCap size={12} />
                ) : (
                  <User size={12} />
                )}
                {(project as any).category}
              </Badge>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-6">
          {project.summary}
        </p>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {project.videos &&
            project.videos.map((url, index) => {
              const isYouTube =
                url.includes("youtube.com") || url.includes("youtu.be");
              const videoId = isYouTube
                ? url.includes("v=")
                  ? new URL(url).searchParams.get("v")
                  : url.split("/").pop()
                : null;
              return (
                <div
                  key={`video-${index}`}
                  className="relative aspect-[16/9] sm:col-span-2 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-black"
                >
                  {isYouTube ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                    >
                      <source src={url} />
                    </video>
                  )}
                </div>
              );
            })}
          {project.gallery &&
            project.gallery.length > 0 &&
            project.gallery.map(
              (image, index) =>
                image.url && (
                  <div
                    key={`gallery-${index}`}
                    className="relative rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      className="w-full h-auto object-contain block"
                      loading="lazy"
                    />
                  </div>
                ),
            )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 sm:mb-10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-white bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:!text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto text-center"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-white bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-800 dark:!text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto text-center"
            >
              <Code size={14} />
              Source Code
            </a>
          )}
        </div>

        {/* Info cards: Status, Published, Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 sm:mb-10">
          <div className="border border-gray-200 dark:border-white rounded-xl p-5 bg-white dark:bg-gray-900 shadow-sm">
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wide mb-2">
              Status
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {project.status}
            </p>
          </div>
          <div className="border border-gray-200 dark:border-white rounded-xl p-5 bg-white dark:bg-gray-900 shadow-sm">
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wide mb-2">
              Published
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {formatDate(project.publishedAt)}
            </p>
          </div>
          {project.roles.length > 0 && (
            <div className="border border-gray-200 dark:border-white rounded-xl p-5 bg-white dark:bg-gray-900 shadow-sm">
              <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wide mb-2">
                Roles
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {project.roles.join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Problem / Solution / Impact */}
        {(project.problem || project.solution || project.impact) && (
          <div className="space-y-4 mb-10">
            {project.problem && (
              <div className="border border-gray-200 dark:border-white rounded-xl p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-sm">
                <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wide mb-3">
                  Problem
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div className="border border-gray-200 dark:border-white rounded-xl p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-sm">
                <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wide mb-3">
                  Solution
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
            {project.impact && (
              <div className="border border-gray-200 dark:border-white rounded-xl p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-sm">
                <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wide mb-3">
                  Impact
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Case study content */}
        {project.content && project.content.length > 0 && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 shadow-sm mb-10 prose prose-gray dark:prose-invert prose-sm max-w-none">
            <RichText value={project.content} />
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProjectJsonLd(project)),
        }}
      />
    </main>
  );
}
