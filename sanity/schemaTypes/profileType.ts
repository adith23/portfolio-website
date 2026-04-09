import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const profileType = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "fullName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "headline", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "shortBio", type: "text", rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({ name: "longBio", type: "text", rows: 6, validation: (rule) => rule.required() }),
    defineField({ name: "location", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "resumeUrl",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "avatar", type: "mediaAssetRef" }),
    defineField({
      name: "skills",
      type: "array",
      of: [defineArrayMember({ type: "techTag" })],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({ name: "availabilityStatus", type: "string" }),
    defineField({
      name: "stats",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "headline",
      media: "avatar",
    },
  },
});
