import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/tag";
import { formatDate } from "@/lib/utils";
import type { ProjectCard as ProjectCardType } from "@/types/content";

export function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <article className="surface group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--accent-soft)]">
        {project.coverImage?.url ? (
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,rgba(187,77,0,0.16),rgba(15,118,110,0.12))] text-sm font-medium text-[var(--muted)]">
            Portfolio project preview
          </div>
        )}
      </div>
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
          <span>{project.status}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time>
        </div>
        <div className="space-y-3">
          <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight">
            <Link href={`/projects/${project.slug}`} className="focus-ring hover:text-[var(--accent-strong)]">
              {project.title}
            </Link>
          </h3>
          <p className="text-base leading-7 text-[var(--muted)]">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link href={`/projects/${project.slug}`} className="focus-ring text-[var(--accent-strong)]">
            Read case study
          </Link>
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring text-[var(--foreground)]"
            >
              Live demo
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
