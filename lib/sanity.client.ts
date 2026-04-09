import { createClient } from "next-sanity";

import { sanityEnv } from "@/lib/sanity.env";

export const sanityClient = createClient({
  projectId: sanityEnv.projectId || "demo",
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
  token: sanityEnv.token,
  perspective: "published",
  stega: false,
});
