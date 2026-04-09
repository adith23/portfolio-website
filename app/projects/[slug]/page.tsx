import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { Eyebrow, Heading } from "@/components/heading";
import { RichText } from "@/components/rich-text";
import { Tag } from "@/components/tag";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { buildProjectJsonLd } from "@/lib/jsonld";
import { absoluteUrl, formatDate } from "@/lib/utils";

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

  return (
    <>
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Eyebrow>Project case study</Eyebrow>
              <Heading>{project.title}</Heading>
              <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{project.summary}</p>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
            <aside className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-6">
              <dl className="grid gap-5">
                <div>
                  <dt className="text-sm font-semibold">Status</dt>
                  <dd className="mt-1 text-[var(--muted)]">{project.status}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold">Published</dt>
                  <dd className="mt-1 text-[var(--muted)]">{formatDate(project.publishedAt)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold">Roles</dt>
                  <dd className="mt-1 text-[var(--muted)]">{project.roles.join(", ")}</dd>
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-semibold">
                  {project.liveUrl ? (
                    <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="focus-ring text-[var(--accent-strong)]">
                      Live demo
                    </Link>
                  ) : null}
                  {project.githubUrl ? (
                    <Link href={project.githubUrl} target="_blank" rel="noreferrer" className="focus-ring text-[var(--foreground)]">
                      Source code
                    </Link>
                  ) : null}
                </div>
              </dl>
            </aside>
          </div>
          <div className="mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--accent-soft)]">
            {project.coverImage?.url ? (
              <div className="relative aspect-[16/8]">
                <Image
                  src={project.coverImage.url}
                  alt={project.coverImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/8] items-center justify-center text-sm font-medium text-[var(--muted)]">
                Project cover image
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="space-y-6">
              {project.problem ? (
                <div className="surface rounded-[var(--radius-md)] border border-[var(--line)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">Problem</p>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{project.problem}</p>
                </div>
              ) : null}
              {project.solution ? (
                <div className="surface rounded-[var(--radius-md)] border border-[var(--line)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">Solution</p>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{project.solution}</p>
                </div>
              ) : null}
              {project.impact ? (
                <div className="surface rounded-[var(--radius-md)] border border-[var(--line)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">Impact</p>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{project.impact}</p>
                </div>
              ) : null}
            </aside>
            <div className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-8">
              <RichText value={project.content} />
            </div>
          </div>

          {project.gallery.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div key={`${image.alt}-${index}`} className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-white/70">
                  {image.url ? (
                    <div className="relative aspect-[4/3]">
                      <Image src={image.url} alt={image.alt} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center text-sm text-[var(--muted)]">
                      Gallery image
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProjectJsonLd(project)) }}
      />
    </>
  );
}
