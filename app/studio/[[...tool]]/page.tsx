import { Studio } from './Studio';

// Ensures the Studio route is statically generated for faster loading
export const dynamic = 'force-static';

// Set the right metadata and viewport for the Sanity Studio
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <Studio />;
}