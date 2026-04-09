import type { ProfileViewModel, ProjectCard, ProjectDetail } from "@/types/content";

export const fallbackProfile: ProfileViewModel = {
  fullName: "Adithya",
  headline: "Software Engineer building reliable products with strong system design.",
  shortBio:
    "I design and ship full-stack systems with a focus on performance, maintainability, and product clarity.",
  longBio:
    "I work across architecture, backend services, and frontend delivery. My approach favors clear interfaces, stable deployment pipelines, and systems that remain easy to evolve as requirements grow.",
  location: "Sri Lanka",
  resumeUrl: "#",
  avatar: {
    alt: "Portrait placeholder for Adithya",
  },
  skills: [
    "System design",
    "Next.js",
    "TypeScript",
    "Python",
    "Java",
    "Microservices",
    "Cloud deployment",
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:hello@example.com" },
  ],
  contactEmail: "hello@example.com",
  availabilityStatus: "Open to backend, platform, and product engineering roles.",
  stats: [
    { label: "Years building software", value: "5+" },
    { label: "Projects delivered", value: "20+" },
    { label: "Preferred mindset", value: "Performance first" },
  ],
};

export const fallbackProjects: ProjectDetail[] = [
  {
    title: "Distributed Learning Platform",
    slug: "distributed-learning-platform",
    summary:
      "A platform for delivering course content, assessments, and analytics across a service-oriented architecture.",
    featured: true,
    publishedAt: "2026-02-15",
    status: "Completed",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com",
    roles: ["Software architect", "Backend engineer", "Frontend engineer"],
    problem:
      "Legacy learning tools were fragmented, slow, and difficult to evolve across multiple academic departments.",
    solution:
      "Designed a modular platform with clear service boundaries, typed APIs, and an editorial workflow for materials and engagement data.",
    impact:
      "Reduced publishing friction, improved page responsiveness, and gave stakeholders a clearer operational model.",
    gallery: [
      { alt: "Dashboard overview placeholder" },
      { alt: "Project architecture placeholder" },
    ],
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The platform combined a content delivery experience for students with maintainable administrative workflows for staff.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Architecture highlights" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The system emphasized typed contracts, queue-backed background processing, and consistent operational visibility across services.",
          },
        ],
      },
    ],
    seo: {
      title: "Distributed Learning Platform",
      description: "Case study for a modular learning platform built with modern web and backend tooling.",
    },
  },
  {
    title: "Operations Insight Dashboard",
    slug: "operations-insight-dashboard",
    summary:
      "A reporting workspace that consolidated system health, product usage, and deployment insights for engineering teams.",
    featured: true,
    publishedAt: "2025-11-03",
    status: "Completed",
    techStack: ["React", "TypeScript", "Node.js", "Redis"],
    githubUrl: "https://github.com/",
    roles: ["Lead engineer"],
    problem:
      "Teams were relying on disconnected tools and manual reporting to understand delivery and runtime behavior.",
    solution:
      "Created a unified dashboard with reusable query layers, cached aggregation, and accessible reporting views.",
    impact: "Improved delivery visibility and reduced manual reporting overhead.",
    gallery: [{ alt: "Operations dashboard placeholder" }],
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The dashboard provided a single place to reason about uptime, rollout quality, and product usage trends.",
          },
        ],
      },
    ],
    seo: {
      title: "Operations Insight Dashboard",
      description: "Case study for an internal dashboard focused on observability and engineering operations.",
    },
  },
];

export const fallbackProjectCards: ProjectCard[] = fallbackProjects.map((project) => ({
  title: project.title,
  slug: project.slug,
  summary: project.summary,
  featured: project.featured,
  publishedAt: project.publishedAt,
  status: project.status,
  coverImage: project.coverImage,
  techStack: project.techStack,
  githubUrl: project.githubUrl,
  liveUrl: project.liveUrl,
}));
