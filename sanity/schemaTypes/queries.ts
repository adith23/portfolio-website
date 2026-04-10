import { groq } from 'next-sanity';

// Get all projects
export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "coverImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    "date": _createdAt,
    "publishedAt": _createdAt,
    description,
    "summary": description,
    technologies,
    "techStack": coalesce(technologies, []),
    projectUrl,
    "liveUrl": projectUrl
  }
`;