import { defineField, defineType } from "sanity";

export const mediaAssetType = defineType({
  name: "mediaAssetRef",
  title: "Media asset",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required().min(5),
    }),
  ],
});
