export type ImageAsset = {
  alt: string;
  url?: string;
  blurDataUrl?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type: string;
  children?: Array<{
    _key?: string;
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<Record<string, unknown>>;
  style?: string;
  level?: number;
  listItem?: string;
  [key: string]: unknown;
};

export type Certification = {
  title: string;
  issuer: string;
  issueDate?: string;
  credentialUrl?: string;
};

export type ProfileViewModel = {
  fullName: string;
  headline: string;
  shortBio: string;
  longBio: string;
  location: string;
  resumeUrl?: string;
  avatar?: ImageAsset;
  skills: string[];
  socialLinks: SocialLink[];
  contactEmail: string;
  availabilityStatus?: string;
  stats: StatItem[];
  certifications?: Certification[];
};

export type ProjectCard = {
  title: string;
  slug: string;
  summary: string;
  featured: boolean;
  publishedAt: string;
  status: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  coverImage?: ImageAsset;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export type ProjectDetail = ProjectCard & {
  roles: string[];
  problem?: string;
  solution?: string;
  impact?: string;
  gallery: ImageAsset[];
  videos?: string[];
  content: PortableTextBlock[];
  seo?: {
    title?: string;
    description?: string;
  };
};
