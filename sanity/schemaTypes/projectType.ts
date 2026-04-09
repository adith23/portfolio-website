import { DocumentsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", type: "text", rows: 4, validation: (rule) => rule.required().max(240) }),
    defineField({ name: "coverImage", type: "mediaAssetRef" }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "mediaAssetRef" })],
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: ["Completed", "In progress", "Archived"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "sortOrder", type: "number", initialValue: 10 }),
    defineField({
      name: "techStack",
      type: "array",
      of: [defineArrayMember({ type: "techTag" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "roles",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "problem", type: "text", rows: 4 }),
    defineField({ name: "solution", type: "text", rows: 4 }),
    defineField({ name: "impact", type: "text", rows: 4 }),
    defineField({
      name: "githubUrl",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "liveUrl",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "caseStudyBlocks",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }, { title: "Emphasis", value: "em" }],
            annotations: [
              {
                name: "link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "coverImage",
    },
  },
});
