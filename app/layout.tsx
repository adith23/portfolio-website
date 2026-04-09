import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
