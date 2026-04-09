import { defineField, defineType } from "sanity";

export const techTagType = defineType({
  name: "techTag",
  title: "Tech tag",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
  },
});
