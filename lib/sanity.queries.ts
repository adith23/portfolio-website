import { defineQuery } from "next-sanity";

export const profileQuery = defineQuery(`
  *[_type == "profile"][0]{
    fullName,
    headline,
    shortBio,
    longBio,
    location,
    resumeUrl,
    contactEmail,
    availabilityStatus,
    "avatar": avatar{
      alt,
      asset
    },
    "skills": skills[]{
      label
    },
    "socialLinks": socialLinks[]{
      label,
      href
    },
    "stats": stats[]{
      label,
      value
    }
  }
`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(sortOrder asc, publishedAt desc){
    title,
    "slug": slug.current,
    summary,
    featured,
    publishedAt,
    status,
    githubUrl,
    liveUrl,
    "techStack": techStack[]{
      label
    },
    "coverImage": coverImage{
      alt,
      asset
    }
  }
`);

export const projectsIndexQuery = defineQuery(`
  *[_type == "project"] | order(featured desc, sortOrder asc, publishedAt desc){
    title,
    "slug": slug.current,
    summary,
    featured,
    publishedAt,
    status,
    githubUrl,
    liveUrl,
    "techStack": techStack[]{
      label
    },
    "coverImage": coverImage{
      alt,
      asset
    }
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    summary,
    featured,
    publishedAt,
    status,
    githubUrl,
    liveUrl,
    problem,
    solution,
    impact,
    roles,
    caseStudyBlocks,
    seo,
    "techStack": techStack[]{
      label
    },
    "coverImage": coverImage{
      alt,
      asset
    },
    "gallery": gallery[]{
      alt,
      asset
    }
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`);
