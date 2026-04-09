import { defineField, defineType } from "sanity";

export const linkItemType = defineType({
  name: "linkItem",
  title: "Link item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "href",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https", "mailto"] }),
    }),
  ],
});
