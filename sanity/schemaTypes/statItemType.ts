import { defineField, defineType } from "sanity";

export const statItemType = defineType({
  name: "statItem",
  title: "Stat item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "value",
      type: "string",
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
