import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
  ],
});
