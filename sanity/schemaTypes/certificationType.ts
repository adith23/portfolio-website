import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const certificationType = defineType({
  name: "certification",
  title: "Certification",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", type: "string", title: "Certification Title", validation: (rule) => rule.required() }),
    defineField({ name: "issuer", type: "string", title: "Issuing Organization", validation: (rule) => rule.required() }),
    defineField({ name: "issueDate", type: "string", title: "Issue Date (e.g. April 2026)" }),
    defineField({ name: "credentialUrl", type: "url", title: "Credential View Link", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
  ],
});
