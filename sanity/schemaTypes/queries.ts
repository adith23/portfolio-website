import { groq } from 'next-sanity';

// Get all projects
export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    description,
    technologies,
    projectUrl
  }
`;