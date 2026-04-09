import Link from "next/link";

import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextBlock } from "@/types/content";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight">{children}</h3>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");

      return (
        <Link href={href} {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}>
          {children}
        </Link>
      );
    },
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-rich">
      <PortableText value={value} components={components} />
    </div>
  );
}
