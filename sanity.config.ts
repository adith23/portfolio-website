import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool, type StructureResolver } from "sanity/desk";

import { schemaTypes } from "./sanity/schemaTypes";

const singletonTypes = new Set(["profile"]);

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Profile")
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile")),
      S.documentTypeListItem("project").title("Projects"),
    ]);

export default defineConfig({
  name: "default",
  title: "Portfolio Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
});
