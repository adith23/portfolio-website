import imageUrlBuilder from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity.client";

const builder = imageUrlBuilder(sanityClient);

type BuilderSource = Parameters<typeof builder.image>[0];

export function urlFor(source: BuilderSource) {
  return builder.image(source);
}
